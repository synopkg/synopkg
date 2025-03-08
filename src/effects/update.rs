use {
  crate::{context::Context, effects::ui::Ui, specifier::basic_semver::BasicSemver},
  colored::Colorize,
  indicatif::{MultiProgress, ProgressBar, ProgressStyle},
  log::{debug, error},
  reqwest::{header::ACCEPT, Client, StatusCode},
  serde::{Deserialize, Serialize},
  std::{collections::BTreeMap, sync::Arc, time::Duration},
  tokio::{
    sync::Semaphore,
    task::{spawn, JoinHandle},
  },
};

#[derive(Serialize, Deserialize, Debug)]
struct PackageMeta {
  name: Arc<str>,
  #[serde(rename = "dist-tags")]
  dist_tags: BTreeMap<Arc<str>, Arc<str>>,
  time: BTreeMap<Arc<str>, Arc<str>>,
}

/// Run the update command side effects
pub async fn run(ctx: Context) -> Context {
  ctx
}

/// Fetch latest versions of all packages
pub async fn fetch_updates(mut ctx: Context) -> Context {
  let ui = Ui { ctx: &ctx };
  let client = Arc::new(Client::new());
  let semaphore = Arc::new(Semaphore::new(ctx.config.rcfile.max_concurrent_requests));
  let progress_bars = Arc::new(MultiProgress::new());
  let mut handles_by_instance_name: BTreeMap<String, JoinHandle<Option<PackageMeta>>> = BTreeMap::new();

  for instance in ctx.instances.iter() {
    if !instance.descriptor.matches_cli_filter {
      continue;
    }
    let name = instance.descriptor.name.clone();
    if !handles_by_instance_name.contains_key(&name) {
      let permit = Arc::clone(&semaphore).acquire_owned().await;
      let client = Arc::clone(&client);
      let progress_bars = Arc::clone(&progress_bars);

      handles_by_instance_name.insert(
        name.clone(),
        spawn(async move {
          let _permit = permit;
          let progress_bar = progress_bars.add(ProgressBar::new_spinner());
          progress_bar.enable_steady_tick(Duration::from_millis(100));
          progress_bar.set_style(ProgressStyle::default_spinner());
          progress_bar.set_message(name.clone());
          let package_meta = actual_get_package_meta(&client, &name).await;
          progress_bar.finish_and_clear();
          progress_bars.remove(&progress_bar);
          package_meta
        }),
      );
    }
  }

  for (name, handle) in handles_by_instance_name {
    let update_versions = ctx.update_versions.entry(name.clone()).or_default();
    if let Some(package_meta) = handle.await.unwrap() {
      for (version, _timestamp) in package_meta.time.iter() {
        if !version.contains("created") && !version.contains("modified") {
          if let Some(basic_semver) = BasicSemver::new(version) {
            update_versions.push(basic_semver);
          }
        }
      }
    }
  }

  progress_bars.clear().unwrap();

  for (name, basic_semvers) in ctx.update_versions.iter() {
    if let Some(latest) = basic_semvers.last() {
      println!("{name} {}", latest.raw.green());
    } else {
      println!("{name} No updates found");
    }
  }
  ctx
}

/// A fake version of the real function to save hammering the npm registry
/// during early development
async fn get_package_meta(client: &Client, name: &str) -> Option<PackageMeta> {
  let url = format!("https://registry.npmjs.org/{}", name);
  debug!("GET {url}");

  // assign a fake delay based on the first letter of the package name
  let delay = match name.chars().next().unwrap_or('a') {
    'a' => 1,
    'b' => 2,
    'c' => 3,
    'd' => 4,
    'e' => 5,
    'f' => 6,
    'g' => 7,
    'h' => 8,
    'i' => 9,
    'j' => 10,
    'k' => 1,
    'l' => 2,
    'm' => 3,
    'n' => 4,
    'o' => 5,
    'p' => 6,
    'q' => 7,
    'r' => 8,
    's' => 9,
    't' => 10,
    'u' => 1,
    'v' => 2,
    'w' => 3,
    'x' => 4,
    'y' => 5,
    'z' => 6,
    _ => 1,
  };

  let delay = 1;

  tokio::time::sleep(tokio::time::Duration::from_secs(delay)).await;

  // return a mock PackageMeta from json!() macro of fake data
  serde_json::from_str::<PackageMeta>(&format!(
    r#"{{
      "name": "{}",
      "dist-tags": {{
        "latest": "98.7.65",
        "alpha": "14.0.0-alpha.10"
      }},
      "time": {{
        "modified": "2021-07-07T17:00:00.000Z",
        "created": "2021-07-07T17:00:00.000Z",
        "4.17.18": "2020-07-08T16:07:27.110Z",
        "4.17.19": "2020-07-08T17:14:40.866Z",
        "4.17.20": "2020-08-13T16:53:54.152Z",
        "4.17.21": "2021-02-20T15:42:16.891Z"
      }}
    }}"#,
    name
  ))
  .ok()
}

async fn actual_get_package_meta(client: &Client, name: &str) -> Option<PackageMeta> {
  let url = format!("https://registry.npmjs.org/{}", name);
  let req = client.get(&url).header(ACCEPT, "application/json");
  debug!("GET {url}");
  match req.send().await {
    Ok(res) => match res.status() {
      StatusCode::OK => match res.json::<PackageMeta>().await {
        Ok(package_meta) => Some(package_meta),
        Err(err) => {
          error!("{err}: {url}");
          None
        }
      },
      status => {
        error!("{status}: {url}");
        None
      }
    },
    Err(err) => {
      error!("{err}: {url}");
      None
    }
  }
}

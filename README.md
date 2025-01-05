# synopkg

<p align="center">
  <img src="https://synopkg.github.io/synopkg/logo.svg" width="200" height="179" alt="">
  <br>Consistent dependency versions in large JavaScript Monorepos.
  <br><a href="https://synopkg.github.io/synopkg">https://synopkg.github.io/synopkg</a>
</p>

> [!TIP]
> 🦀 A Rust rewrite is available to try at [`npm install -g synopkg@14.0.0-alpha.1`](https://github.com/SynoPkg/synopkg/releases/tag/14.0.0-alpha.1)

## Installation

```bash
npm install --save-dev synopkg
```

## Commands

### [fix-mismatches](https://synopkg.github.io/synopkg/command/fix-mismatches)

Ensure that multiple packages requiring the same dependency define the same version, so that every package requires eg. `react@16.4.2`, instead of a combination of `react@16.4.2`, `react@0.15.9`, and `react@16.0.0`.

### [format](https://synopkg.github.io/synopkg/command/format)

Organise package.json files according to a conventional format, where fields appear in a predictable order and nested fields are ordered alphabetically. Shorthand properties are used where available, such as the `"repository"` and `"bugs"` fields.

### [lint](https://synopkg.github.io/synopkg/command/lint)

Lint all versions and ranges and exit with 0 or 1 based on whether all files match your Synopkg configuration file.

### [lint-semver-ranges](https://synopkg.github.io/synopkg/command/lint-semver-ranges)

Check whether dependency versions used within "dependencies", "devDependencies", etc follow a consistent format.

### [list](https://synopkg.github.io/synopkg/command/list)

List all dependencies required by your packages.

### [list-mismatches](https://synopkg.github.io/synopkg/command/list-mismatches)

List dependencies which are required by multiple packages, where the version is not the same across every package.

### [prompt](https://synopkg.github.io/synopkg/command/prompt)

Displays a series of prompts to fix mismatches which synopkg cannot fix automatically.

### [set-semver-ranges](https://synopkg.github.io/synopkg/command/set-semver-ranges)

Ensure dependency versions used within `"dependencies"`, `"devDependencies"` etc follow a consistent format.

### [update](https://synopkg.github.io/synopkg/command/update)

Interactively update packages to the latest versions from the npm registry, wherever they are in your monorepo. You can update every dependency, just dev/peer/prod dependencies, just packages which match a name filter, and more.

## Badges

- [![support on ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C4PY4P)
- [![NPM version](http://img.shields.io/npm/v/synopkg.svg?style=flat-square)](https://www.npmjs.com/package/synopkg)
- [![NPM downloads](http://img.shields.io/npm/dm/synopkg.svg?style=flat-square)](https://www.npmjs.com/package/synopkg)
- [![Build Status](https://img.shields.io/github/actions/workflow/status/SynoPkg/synopkg/ci.yaml?branch=main)](https://github.com/SynoPkg/synopkg/actions)

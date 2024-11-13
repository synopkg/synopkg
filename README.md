# Synopkg JavaScript Monorepos.

<a aria-label="synopkg logo" href="https://synopkg.github.io/synopkg">
  <img alt="" src="https://img.shields.io/badge/Made%20by%20synopkg-000000.svg?style=flat-square&logo=synopkg&labelColor=000">
</a>
<a aria-label="NPM version" href="https://www.npmjs.com/package/synopkg">
  <img alt="" src="https://img.shields.io/npm/v/synopkg.svg?style=flat-square&labelColor=000000">
</a>
<a aria-label="License" href="https://github.com/synopkg/synopkg/blob/main/LICENSE.md">
  <img alt="" src="https://img.shields.io/npm/l/synopkg.svg?style=flat-square&labelColor=000000">
</a>
<a aria-label="CI status" href="https://github.com/synopkg/synopkg/actions/workflows/quality.yml?query=event%3Apush+branch%3Amain">
  <img alt="" src="https://img.shields.io/github/actions/workflow/status/synopkg/synopkg/quality.yml?event=push&branch=main&style=flat-square&labelColor=000000">
</a>

## Rust

A work in progress implementation of Synopkg in Rust. It is not ready for public use.

## Develop

```shell
git clone https://github.com/synopkg/synopkg.git -b rust/main synopkg-rust
cd synopkg-rust
```

## Run (Development)

There are 2 commands, `lint` and `fix`.

```shell
cargo run -- lint
cargo run -- fix
```

Both will check formatting and version/range mismatches by default, but can be filtered with `--format` and `--versions`.

## Build and Run (Production)

```shell
cargo build --release
target/release/synopkg lint
target/release/synopkg fix
```

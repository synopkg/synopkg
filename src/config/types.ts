import type { CUSTOM_TYPES } from '../constants.js';
import type { Specifier } from '../specifier/index.js';

/**
 * Aliases for semver range formats supported by synopkg
 *
 * Defaults to `""` to ensure that exact dependency versions are used instead of
 * loose ranges, but this can be overridden in your config file.
 *
 * | Supported Range |   Example |
 * | --------------- | --------: |
 * | `"<"`           |  `<1.4.2` |
 * | `"<="`          | `<=1.4.2` |
 * | `""`            |   `1.4.2` |
 * | `"~"`           |  `~1.4.2` |
 * | `"^"`           |  `^1.4.2` |
 * | `">="`          | `>=1.4.2` |
 * | `">"`           |  `>1.4.2` |
 * | `"*"`           |       `*` |
 *
 * @default ""
 */
export type SemverRange =
  | ''
  | '*'
  | '>'
  | '>='
  | '.x'
  | '<'
  | '<='
  | '^'
  | '~'
  | 'workspace:';

type DefaultDependencyType = keyof typeof CUSTOM_TYPES;

export type DependencyType =
  | DefaultDependencyType
  | `!${DefaultDependencyType}`
  // This is done to allow any other `string` while also offering intellisense
  // for the internal dependency types above. `(string & {})` is needed to
  // prevent typescript from ignoring these specific strings and merging them
  // all into `string`, where we'd lose any editor autocomplete for the other
  // more specific fields, using (string & {}) stops that from happening.
  //
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export type SpecifierType =
  | Specifier.Any['name']
  | `!${Specifier.Any['name']}`
  // This is done to allow any other `string` while also offering intellisense
  // for the internal dependency types above. `(string & {})` is needed to
  // prevent typescript from ignoring these specific strings and merging them
  // all into `string`, where we'd lose any editor autocomplete for the other
  // more specific fields, using (string & {}) stops that from happening.
  //
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export interface GroupConfig {
  dependencies?: string[];
  dependencyTypes?: DependencyType[];
  label?: string;
  packages?: string[];
  specifierTypes?: SpecifierType[];
}

export namespace SemverGroupConfig {
  export interface Disabled extends GroupConfig {
    isDisabled: true;
  }

  export interface Ignored extends GroupConfig {
    isIgnored: true;
  }

  export interface WithRange extends GroupConfig {
    range: SemverRange;
  }

  export type Any = Disabled | Ignored | WithRange;
}

export namespace VersionGroupConfig {
  export interface Banned extends GroupConfig {
    isBanned: true;
  }

  export interface Ignored extends GroupConfig {
    isIgnored: true;
  }

  export interface Pinned extends GroupConfig {
    pinVersion: string;
  }

  export interface SnappedTo extends GroupConfig {
    snapTo: string[];
  }

  export interface SameRange extends GroupConfig {
    policy: 'sameRange';
  }

  export interface Standard extends GroupConfig {
    preferVersion?: 'highestSemver' | 'lowestSemver';
  }

  export type Any =
    | Banned
    | Ignored
    | Pinned
    | SameRange
    | SnappedTo
    | Standard;
}

namespace CustomTypeConfig {
  export interface NameAndVersionProps {
    namePath: string;
    path: string;
    strategy: 'name~version';
  }

  export interface NamedVersionString {
    path: string;
    strategy: 'name@version';
  }

  export interface UnnamedVersionString {
    path: string;
    strategy: 'version';
  }

  export interface VersionsByName {
    path: string;
    strategy: 'versionsByName';
  }

  export type Any =
    | NameAndVersionProps
    | NamedVersionString
    | UnnamedVersionString
    | VersionsByName;
}

export interface CliConfig {
  readonly configPath?: string;
  readonly filter: string;
  readonly indent: string;
  readonly source: string[];
  readonly specs: string;
  readonly types: string;
}

export interface RcConfig {
  /** @see https://synopkg.github.io/synopkg/integrations/json-schema */
  $schema?: string;
  /** @see https://synopkg.github.io/synopkg/config/custom-types */
  customTypes: Record<string, CustomTypeConfig.Any>;
  /** @see https://synopkg.github.io/synopkg/config/dependency-types */
  dependencyTypes: DependencyType[];
  /** @see https://synopkg.github.io/synopkg/config/filter */
  filter: string;
  /** @see https://synopkg.github.io/synopkg/config/format-bugs */
  formatBugs: boolean;
  /** @see https://synopkg.github.io/synopkg/config/format-repository */
  formatRepository: boolean;
  /** @see https://synopkg.github.io/synopkg/config/indent */
  indent: string;
  /** @see https://synopkg.github.io/synopkg/config/lint-formatting */
  lintFormatting: boolean;
  /** @see https://synopkg.github.io/synopkg/config/lint-semver-ranges */
  lintSemverRanges: boolean;
  /** @see https://synopkg.github.io/synopkg/config/lint-versions */
  lintVersions: boolean;
  /** @see https://synopkg.github.io/synopkg/config/semver-groups */
  semverGroups: SemverGroupConfig.Any[];
  /** @see https://synopkg.github.io/synopkg/config/sort-az */
  sortAz: string[];
  /** @see https://synopkg.github.io/synopkg/config/sort-exports */
  sortExports: string[];
  /** @see https://synopkg.github.io/synopkg/config/sort-first */
  sortFirst: string[];
  /** @see https://synopkg.github.io/synopkg/config/sort-packages */
  sortPackages: boolean;
  /** @see https://synopkg.github.io/synopkg/config/source */
  source: string[];
  /** @see https://synopkg.github.io/synopkg/config/specifier-types */
  specifierTypes: SpecifierType[];
  /** @see https://synopkg.github.io/synopkg/config/version-groups */
  versionGroups: VersionGroupConfig.Any[];
}

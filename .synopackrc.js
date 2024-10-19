// @ts-check

/** @type {import("./src").RcFile} */
const config = {
  semverGroups: [
    {
      range: '*', // Or provide a valid semver range
    },
  ],
  versionGroups: [{ dependencies: ['minimatch'], pinVersion: '9.0.5' }],
};

export { config };

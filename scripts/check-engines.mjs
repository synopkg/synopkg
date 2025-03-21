import { readFileSync } from 'node:fs';
import { globbySync } from 'globby';
import intersects from 'semver/ranges/intersects.js';
import root from '../package.json' assert { type: 'json' };

const synopkgEngine = root.engines.node;

const unsatisfiedDependencies = globbySync('node_modules/**/package.json')
  .map(filePath => readFileSync(filePath, 'utf8'))
  .filter(json => json.includes('"engines"'))
  .map(json => JSON.parse(json))
  .filter(file => file.engines?.node)
  .map(file => {
    const name = file.name;
    const dependencyEngine = file.engines.node;
    const isSatisfied = intersects(synopkgEngine, dependencyEngine);
    return {
      name,
      expected: synopkgEngine,
      actual: dependencyEngine,
      isSatisfied,
    };
  })
  .filter(result => !result.isSatisfied);

if (unsatisfiedDependencies.length > 0) {
  console.error(
    'The following dependencies do not satisfy the required engine version:',
  );
  unsatisfiedDependencies.forEach(dep => {
    console.error(
      `- ${dep.name}: expected ${dep.expected}, but found ${dep.actual}`,
    );
  });
  process.exit(1);
} else {
}

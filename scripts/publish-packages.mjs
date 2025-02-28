import { exec } from 'child_process';
import fs from 'fs';
import { glob } from 'glob';
import { resolve } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);
const globAsync = promisify(glob);

function updateDependencyVersions(packageJson, version) {
  const sections = ['dependencies', 'devDependencies', 'peerDependencies'];
  let modified = false;

  for (const section of sections) {
    if (packageJson[section]) {
      for (const [dep, depVersion] of Object.entries(packageJson[section])) {
        if (dep.startsWith('dill-pixel') && depVersion === 'workspace:*') {
          packageJson[section][dep] = version;
          modified = true;
        }
      }
    }
  }

  return modified;
}

async function publishPackages(patterns) {
  const cwd = process.cwd();
  try {
    const patternArray = patterns.split(',').map((pat) => pat.trim());
    const allDirectories = new Set();
    console.log(patternArray);
    for (const pattern of patternArray) {
      const directories = glob.sync(`${pattern}/package.json`, { ignore: 'node_modules/**' });
      directories.forEach((dir) => allDirectories.add(dir.replace('/package.json', '')));
    }
    console.log(allDirectories);
    for (const packageDir of allDirectories) {
      process.chdir(resolve(cwd, packageDir));
      console.log(`Publishing package in ${packageDir}...`);

      const packageJsonPath = 'package.json';
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const originalContent = fs.readFileSync(packageJsonPath, 'utf8');

      // Update workspace dependencies to current version
      const wasModified = updateDependencyVersions(packageJson, packageJson.version);

      if (wasModified) {
        // Write temporary package.json with updated versions
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }

      try {
        const { stdout, stderr } = await execAsync('npm publish --access public');
        console.log(stdout);
        console.error(stderr);
      } catch (err) {
        console.error(`Failed to publish package in ${packageDir}:`, err);
      } finally {
        // Restore original package.json
        if (wasModified) {
          fs.writeFileSync(packageJsonPath, originalContent);
        }
      }
    }
  } catch (err) {
    console.error('Error finding directories:', err);
  }
}

async function run() {
  console.log('Publishing packages...');
  const patterns = process.argv[2];
  if (!patterns) {
    console.error('Please provide a glob pattern as an argument.');
    process.exit(1);
  }

  await publishPackages(patterns);
}

void run();

import { exec } from 'child_process';
import { glob } from 'glob';
import { resolve } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);
const globAsync = promisify(glob);

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
      try {
        const { stdout, stderr } = await execAsync('npm publish');
        console.log(stdout);
        console.error(stderr);
      } catch (err) {
        console.error(`Failed to publish package in ${packageDir}:`, err);
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

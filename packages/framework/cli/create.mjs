#!/usr/bin/env node
import * as p from '@clack/prompts';
import { bold, cyan } from 'kleur/colors';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';
import shell from 'shelljs';
import { copy, dist, mkdirp, package_manager } from './utils.mjs';

let packageManager = package_manager;

async function write(cwd, options) {
  await mkdirp(cwd);
  await write_template_files(
    options.template,
    options.applicationNameForPkg,
    options.name,
    options.applicationName,
    cwd,
  );
}

function getFiles(dirPath) {
  let files = [];

  const dirFiles = fs.readdirSync(dirPath, { withFileTypes: true });
  dirFiles.forEach((file) => {
    const name = file.name;
    if (fs.statSync(path.join(dirPath, name)).isDirectory()) {
      files = files.concat(getFiles(path.join(dirPath, name)));
    } else {
      files.push({ name: path.join(dirPath, name) });
    }
  });

  return files;
}

/**
 * @param {string} template
 * @param {'typescript' | 'checkjs' | null} types
 * @param {string} name
 * @param {string} cwd
 */
function write_template_files(template, applicationNameForPkg, name, applicationName, cwd) {
  const dir = dist(`templates/${template}`);
  copy(`${dir}/package.template.json`, `${cwd}/package.json`);

  const dirPath = `${dir}`;
  const files = getFiles(dirPath);
  files.forEach((file) => {
    const dest = path.join(cwd, file.name.replace(dirPath, ''));
    copy(file.name, dest);
  });

  let pkg = fs.readFileSync(`${cwd}/package.json`, 'utf-8');
  let mgr = packageManager;
  if (mgr.indexOf('npm') === 0) {
    mgr = 'npm run';
  }
  pkg = pkg.replace(/~NAME~/g, applicationNameForPkg);
  pkg = pkg.replace(/~PACKAGE_MANAGER~/g, mgr);
  fs.writeFileSync(`${cwd}/package.json`, pkg);

  // find index.html and replace ~NAME~ with the application's origin al name
  const index_file = `${cwd}/index.html`;
  const index_contents = fs.readFileSync(index_file, 'utf-8');
  fs.writeFileSync(index_file, index_contents.replace(/~NAME~/g, name), 'utf-8');

  // find __APPLICATION_NAME__.ts and replace it with the application name, then delete ~Application.ts
  const app_file = `${cwd}/src/__APPLICATION_NAME__.ts`;
  const app_contents = fs.readFileSync(app_file, 'utf-8');
  fs.writeFileSync(`${cwd}/src/${applicationName}.ts`, app_contents, 'utf-8');
  fs.rmSync(app_file);

  // recursively loop through all the .ts files in the src directory and replace __APPLICATION_NAME__ with the application name
  const tsFiles = getFiles(`${cwd}/src`);
  tsFiles.forEach((file) => {
    const contents = fs.readFileSync(file.name, 'utf-8');
    fs.writeFileSync(file.name, contents.replace(/__APPLICATION_NAME__/g, applicationName));
  });

  try {
    fs.rmSync(`${cwd}/.meta.json`);
    fs.rmSync(`${cwd}/package.template.json`);
    // create an .npmrc file with the following content:
    // shamefully-hoist=true
    fs.writeFileSync(`${cwd}/.npmrc`, 'shamefully-hoist=true');
  } catch (e) {
    console.log('Failed to remove .meta.json and package.template.json due to:', e);
  }
}

export async function create(cwd = '.', packageManagerOverride) {
  if (packageManagerOverride) {
    packageManager = packageManagerOverride;
  }
  const dir = dist(``);
  const pkg = JSON.parse(fs.readFileSync(`${dir}/package.json`, 'utf-8'));
  p.intro(
    `Dill Pixel Create (v${pkg.version}) - This utility will walk you through creating a new Dill Pixel project.`,
  );

  if (cwd === '.') {
    const dir = await p.text({
      message: 'Where should we create your project?',
      placeholder: '(Enter to use current directory)',
    });

    if (p.isCancel(dir)) {
      process.exit(1);
    }

    if (dir) {
      cwd = /** @type {string} */ (dir);
    }
  }

  if (fs.existsSync(cwd)) {
    if (fs.readdirSync(cwd).length > 0) {
      const force = await p.confirm({
        message: 'Directory not empty. Continue?',
        initialValue: false,
      });

      // bail if `force` is `false` or the user cancelled with Ctrl-C
      if (force !== true) {
        process.exit(1);
      }
    }
  }

  const options = await p.group({
    template: () =>
      p.select({
        message: 'Which template?',
        // @ts-expect-error i have no idea what is going on here
        options: fs
          .readdirSync(dist('templates/app'))
          .map((dir) => {
            const meta_file = dist(`templates/app/${dir}/.meta.json`);
            const { title, description } = JSON.parse(fs.readFileSync(meta_file, 'utf8'));

            return {
              label: title,
              hint: description,
              value: `app/${dir}`,
            };
          })
          .filter(Boolean),
      }),
  });

  // get a name from the cwd provided
  const name = path.basename(path.resolve(cwd));

  const defaultName = name
    .replace(/\s+/g, '-')
    .replace('_', '-')
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // ask for a name if the user used "." or didn't provide one
  let appName = await p.text({
    message: 'What should we call your project?',
    placeholder: `(Enter to use '${defaultName}')`,
  });

  if (!appName) {
    appName = name;
  }

  // derive an application name from the project name by camel casing it
  const applicationNameForPkg = appName.replace(/\s+/g, '-').replace('_', '-').toLowerCase();

  const applicationName =
    applicationNameForPkg.indexOf('-') === -1
      ? appName
      : applicationNameForPkg
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');

  await write(cwd, {
    name,
    applicationNameForPkg,
    applicationName,
    template: /** @type {'default' | 'react'} */ (options.template),
  });

  const s = p.spinner();
  s.start('Installing dependencies...');
  const exec = promisify(shell.exec);
  await exec(`${packageManager} install`, { silent: true, cwd }).catch(() => ({ code: 1 }));
  // const message = command.code === 0 ? 'Installtion successful' : 'Installation failed';
  s.stop('Installation complete!');

  let msg = `Next steps:`;
  let i = 1;

  const relative = path.relative(process.cwd(), cwd);
  if (relative !== '') {
    msg = `${msg}\n  ${i++}: ${bold(cyan(`cd ${relative}`))}`;
  }

  // prettier-ignore
  msg = `${msg}\n  ${i++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`;
  msg = `${msg}\n  ${i++}: ${bold(cyan(`${package_manager} run dev`))}`;
  msg = `${msg}\n  To close the dev server, hit ${bold(cyan('Ctrl-C'))}`;

  p.outro(msg);
}

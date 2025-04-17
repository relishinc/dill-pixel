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

/**
 * Ensures a version string has the ^ prefix unless it's a URL or specific commit
 * @param {string} version
 * @returns {string}
 */
function ensureCaretPrefix(version) {
  // Skip if version is a URL, git repo, or specific commit
  if (version.includes('://') || version.includes('github:') || version.includes('#')) {
    return version;
  }
  // Skip if version already has a prefix
  if (version.startsWith('^') || version.startsWith('~') || version.startsWith('>') || version.startsWith('<')) {
    return version;
  }
  return `^${version}`;
}

async function write(cwd, options) {
  await mkdirp(cwd);
  await write_template_files(
    cwd,
    options.template,
    options.applicationNameForPkg,
    options.applicationName,
    options.defaultName,
    options.plugins,
    options.storageAdapters,
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
 * @param {string} applicationNameForPkg
 * @param {string} name
 * @param {string} applicationName
 * @param {string} cwd
 * @param {string[]} plugins
 * @param {string[]} storageAdapters
 */
function write_template_files(
  cwd,
  template,
  applicationNameForPkg,
  applicationName,
  defaultName,
  plugins,
  storageAdapters,
) {
  const dir = dist(`templates/${template}`);
  copy(`${dir}/package.template.json`, `${cwd}/package.json`);

  const dirPath = `${dir}`;
  const files = getFiles(dirPath);
  files.forEach((file) => {
    const dest = path.join(cwd, file.name.replace(dirPath, ''));
    copy(file.name, dest);
  });

  let pkgJson = JSON.parse(fs.readFileSync(`${cwd}/package.json`, 'utf-8'));
  let mgr = packageManager;
  if (mgr.indexOf('npm') === 0) {
    mgr = 'npm run';
  }
  pkgJson.name = applicationNameForPkg;
  pkgJson.scripts = Object.fromEntries(
    Object.entries(pkgJson.scripts || {}).map(([key, value]) => [key, value.replace(/~PACKAGE_MANAGER~/g, mgr)]),
  );

  // Get the framework version from package.json
  const frameworkPkg = JSON.parse(fs.readFileSync(dist('package.json'), 'utf-8'));

  // Set the dill-pixel dependency version
  if (pkgJson.dependencies && pkgJson.dependencies['dill-pixel']) {
    pkgJson.dependencies['dill-pixel'] = ensureCaretPrefix(frameworkPkg.version);
  }

  // Add framework peer dependencies to the template's peerDependencies
  if (frameworkPkg.peerDependencies) {
    if (!pkgJson.peerDependencies) {
      pkgJson.peerDependencies = {};
    }

    // Add each peer dependency with its version
    Object.entries(frameworkPkg.peerDependencies).forEach(([name, version]) => {
      if (!pkgJson.peerDependencies[name]) {
        pkgJson.peerDependencies[name] = ensureCaretPrefix(version);
      }
    });
  }

  // Write the initial package.json with template replacements
  fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(pkgJson, null, 2));

  // find index.html and replace ~NAME~ with the application's origin al name
  const index_file = `${cwd}/index.html`;
  let index_contents = fs.readFileSync(index_file, 'utf-8');
  index_contents = index_contents.replace(/~NAME~/g, defaultName);
  fs.writeFileSync(index_file, index_contents, 'utf-8');

  // find readme.md and replace ~NAME~ with the application's origin al name
  const readme_file = `${cwd}/README.md`;
  let readme_contents = fs.readFileSync(readme_file, 'utf-8');
  readme_contents = readme_contents.replace(/~NAME~/g, defaultName);
  readme_contents = readme_contents.replace(/~PACKAGE_MANAGER~/g, mgr);
  fs.writeFileSync(readme_file, readme_contents, 'utf-8');

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

  // Update dill-pixel.config.ts with selected plugins and storage adapters
  const configPath = `${cwd}/src/dill-pixel.config.ts`;
  let configContents = fs.readFileSync(configPath, 'utf-8');

  if (plugins && plugins.length > 0) {
    // Convert plugin names to config format
    const pluginConfigs = plugins.map((pluginName) => {
      // Remove @dill-pixel/plugin- prefix
      const shortName = pluginName.replace('@dill-pixel/plugin-', '');
      return `['${shortName}', { autoLoad: false }]`;
    });

    // Replace empty plugins array with configured plugins
    configContents = configContents.replace(
      /plugins:\s*\[\s*\]/,
      `plugins: [\n    ${pluginConfigs.join(',\n    ')}\n  ]`,
    );
  }

  if (storageAdapters && storageAdapters.length > 0) {
    // Convert storage adapter names to config format
    const adapterIds = storageAdapters.map((adapterName) => {
      // Remove @dill-pixel/plugin- prefix and -storage suffix if present
      return `'${adapterName.replace('@dill-pixel/storage-adapter-', '').replace('-storage-adapter', '')}'`;
    });

    // Replace empty storage adapters array with configured adapters
    configContents = configContents.replace(
      /storageAdapters:\s*\[\s*\]/,
      `storageAdapters: [\n    ${adapterIds.join(',\n    ')}\n  ]`,
    );
  }

  fs.writeFileSync(configPath, configContents, 'utf-8');

  // Add selected plugins to dependencies
  if (plugins && plugins.length > 0) {
    if (!pkgJson.dependencies) {
      pkgJson.dependencies = {};
    }

    plugins.forEach((pluginName) => {
      try {
        const pluginDir = fs.readdirSync(dist('../plugins')).find((dir) => {
          const plugin = JSON.parse(fs.readFileSync(path.join(dist('../plugins'), dir, 'package.json'), 'utf8'));
          return plugin.name === pluginName;
        });

        if (pluginDir) {
          const pluginPkg = JSON.parse(
            fs.readFileSync(path.join(dist('../plugins'), pluginDir, 'package.json'), 'utf8'),
          );
          pkgJson.dependencies[pluginName] = ensureCaretPrefix(pluginPkg.version);
        }
      } catch (e) {
        console.warn(`Failed to add plugin ${pluginName} to dependencies:`, e);
      }
    });
  }

  // Add selected storage adapters to dependencies
  if (storageAdapters && storageAdapters.length > 0) {
    if (!pkgJson.dependencies) {
      pkgJson.dependencies = {};
    }

    storageAdapters.forEach((storageAdapterName) => {
      try {
        const saDir = fs.readdirSync(dist('../storage-adapters')).find((dir) => {
          const sa = JSON.parse(fs.readFileSync(path.join(dist('../storage-adapters'), dir, 'package.json'), 'utf8'));
          return sa.name === storageAdapterName;
        });

        if (saDir) {
          const saPkg = JSON.parse(
            fs.readFileSync(path.join(dist('../storage-adapters'), saDir, 'package.json'), 'utf8'),
          );
          pkgJson.dependencies[storageAdapterName] = ensureCaretPrefix(saPkg.version);
        }
      } catch (e) {
        console.warn(`Failed to add storage adapter ${storageAdapterName} to dependencies:`, e);
      }
    });
  }

  // Write the final package.json with all dependencies
  fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(pkgJson, null, 2));

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
    plugins: () =>
      p.multiselect({
        required: false,
        message: 'Which plugins would you like to add (Enter to skip)?',
        options: (() => {
          const pluginsDir = dist('../plugins');
          if (!fs.existsSync(pluginsDir)) {
            return [];
          }
          return fs
            .readdirSync(pluginsDir)
            .map((dir) => {
              try {
                const pkg = JSON.parse(fs.readFileSync(path.join(pluginsDir, dir, 'package.json'), 'utf8'));
                return {
                  label: pkg.description || pkg.name,
                  value: pkg.name, // This will be @dill-pixel/plugin-*
                };
              } catch (e) {
                return null;
              }
            })
            .filter(Boolean);
        })(),
      }),
    storageAdapters: () =>
      p.multiselect({
        required: false,
        message: 'Which storage adapters would you like to add (Enter to skip)?',
        options: (() => {
          const adaptersDir = dist('../storage-adapters');
          if (!fs.existsSync(adaptersDir)) {
            return [];
          }
          return fs
            .readdirSync(adaptersDir)
            .map((dir) => {
              try {
                const pkg = JSON.parse(fs.readFileSync(path.join(adaptersDir, dir, 'package.json'), 'utf8'));
                return {
                  label: pkg.description || pkg.name,
                  value: pkg.name, // This will be @dill-pixel/storage-adapter-*
                };
              } catch (e) {
                return null;
              }
            })
            .filter(Boolean);
        })(),
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
    defaultName,
    template: /** @type {'default' | 'react'} */ (options.template),
    plugins: options.plugins,
    storageAdapters: options.storageAdapters,
  });

  const s = p.spinner();
  s.start(`Installing dependencies...`);
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

import { exec } from 'node:child_process';
import fs from 'node:fs';

// List of folder roots to traverse
const folderRoots = [
  './packages/plugins/physics/snap',
  './packages/plugins/physics/matter',
  './packages/plugins/physics/arcade',
  './packages/plugins/rive',
  './packages/storage-adapters/firebase',
];

// Package to install
const packageName = 'dill-pixel@next --save-peer';

// Function to install package in a specific folder
const installPackage = (folder) => {
  return new Promise((resolve, reject) => {
    exec(`npm install ${packageName}`, { cwd: folder }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing package in folder ${folder}:`, error);
        return reject(error);
      }
      console.log(`Successfully installed ${packageName} in folder ${folder}`);
      console.log(stdout);
      resolve();
    });
  });
};

// Function to traverse folder roots and install package
const traverseAndInstall = async () => {
  for (const folder of folderRoots) {
    if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
      try {
        await installPackage(folder);
      } catch (error) {
        console.error(`Failed to install package in folder ${folder}:`, error);
      }
    } else {
      console.error(`Folder not found or is not a directory: ${folder}`);
    }
  }
};

// Start the process
traverseAndInstall()
  .then(() => console.log('Package installation process completed.'))
  .catch((error) => console.error('Error during package installation process:', error));

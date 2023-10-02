const fs = require('fs');
const path = require('path');

function deleteFilesWithExtensions(dirPath, extensions) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist.`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dirPath, files[i]);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      deleteFilesWithExtensions(filePath, extensions);
    } else if (extensions.some((ext) => filePath.endsWith(ext))) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file ${filePath}`);
    }
  }
}

const dirPath = './src'; // replace this with the directory you want to clean
const extensions = ['.d.ts', '.map', '.js']; // the file extensions you want to delete

deleteFilesWithExtensions(dirPath, extensions);

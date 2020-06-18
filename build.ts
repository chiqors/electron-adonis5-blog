import shell from 'shelljs';

const buildFolder = './build/';

const files = new Set(['index.html']);
const folders = new Set(['./windows']);

// Create build directory
// shell.mkdir('-p', buildFolder);

// Copy Files
files.forEach((file) => {
  shell.cp('-R', file, buildFolder);
});

// Copy Folders
folders.forEach((folder) => {
  shell.cp('-R', folder, buildFolder);
});

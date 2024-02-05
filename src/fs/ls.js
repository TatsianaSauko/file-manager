import fs from 'fs/promises';

async function displayDirectoryContents(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  entries.sort((a, b) => {
    if (a.isDirectory() && b.isDirectory()) {
      return a.name.localeCompare(b.name);
    }
    if (a.isDirectory() && b.isFile()) {
      return -1;
    }
    if (a.isFile() && b.isDirectory()) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  const tableData = entries.map((entry) => ({
    'Name': `${entry.name}`,
    'Type': entry.isDirectory() ? 'Directory' : 'File',
  }));

  console.table(tableData);
}

export default displayDirectoryContents;

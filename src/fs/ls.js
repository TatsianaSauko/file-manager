import fs from 'fs';
import path from 'path';

async function displayDirectoryContents(currentDir) {
  const contents = await fs.promises.readdir(currentDir);
  const sortedContents = contents.sort();
  const directories = [];
  const files = [];

  await Promise.all(sortedContents.map(async (item) => {
    const pathToFile = path.resolve(currentDir, item);
    try {
      const stat = await fs.promises.lstat(pathToFile);
      if (stat.isFile()) {
        files.push({ name: item, type: 'File' });
      } else {
        directories.push({ name: item, type: 'Directory' });
      }
    } catch {
      return;
    }
  }));

  const longestNameLength = Math.max(...[...directories, ...files].map(item => item.name.length));
  console.log('|'.padEnd(longestNameLength + 27, '-') + '|');
  console.log('| (index) | Name'.padEnd(longestNameLength + 15) + '|   Type    |');
  console.log('|---------|'.padEnd(longestNameLength + 15, '-') + '|-----------|');
  [...directories, ...files].forEach((item, index) => {
    let paddedIndex = `${index}`;
    if (index < 10) {
      paddedIndex = ` ${index}`;
    }

    let typeWithPadding = item.type;
    if (item.type === 'File') {
      typeWithPadding = `   ${item.type}  `;
    }

    const padding = longestNameLength - item.name.length;
    const paddingLeft = Math.floor(padding / 2);
    const paddingRight = paddingLeft + padding % 2;
    const paddedName = ' '.repeat(paddingLeft) + `'${item.name}'` + ' '.repeat(paddingRight);

    console.log(`|   ${paddedIndex}    | ${paddedName} | ${typeWithPadding} |`);
  });
  console.log('|'.padEnd(longestNameLength + 27, '-') + '|');
}

export default displayDirectoryContents;

import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import readline from 'readline';
import zlib from 'zlib';
import crypto from 'crypto';
import { readFileWithStream, displayDirectoryContents, renameFile } from './fs/index.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentDir = os.homedir();

console.log(`Welcome to the File Manager, ${process.argv[2].split("=")[1]}!`);
console.log(`You are currently in ${currentDir}`);

rl.on('line', async (input) => {
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case 'up':
        if (path.resolve(currentDir, '..') !== path.parse(currentDir).root) {
          currentDir = path.resolve(currentDir, '..');
        }
        break;
      case 'cd':
        const newDir = path.resolve(currentDir, args[0]);
        await fs.access(newDir);
        currentDir = newDir;
        break;
      case 'ls':
        await displayDirectoryContents(currentDir);
        break;
      case 'cat':
        await readFileWithStream(currentDir, args[0])
        break;
      case 'add':
        await fs.writeFile(path.resolve(currentDir, args[0]), '');
        break;
      case 'rn':
        await renameFile(path.resolve(currentDir, args[0]), path.resolve(currentDir, args[1]));
        break;
      case 'cp':
        await fs.copyFile(path.resolve(currentDir, args[0]), path.resolve(currentDir, args[1]));
        break;
      case 'mv':
        await fs.rename(path.resolve(currentDir, args[0]), path.resolve(currentDir, args[1]));
        break;
      case 'rm':
        await fs.unlink(path.resolve(currentDir, args[0]));
        break;
      case 'os':
        await getOSInfo(args[0]);
        break;
      case '.exit':
        rl.close();
        return;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed', error);
  }

  console.log(`You are currently in ${currentDir}`);
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${process.argv[2].split("=")[1]}, goodbye!`);
});

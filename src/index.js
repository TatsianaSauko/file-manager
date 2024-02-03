import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import readline from 'readline';
import getInfoOS from './os/index.js';
import calculateHash from './hash/index.js';
import { compressFile, decompressFile} from  './zip/index.js';
import { readFileWithStream, displayDirectoryContents, renameFile, copyFile, moveFile, deleteFile } from './fs/index.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentDir = os.homedir();

console.log(`Welcome to the File Manager, ${process.argv[2].split("=")[1]}!`);
console.log(`You are currently in ${currentDir}`);

rl.on('line', async (input) => {
  const [command, ...args] = input.split(' ');
  // const args = [res.reduce((acc, curr, index, array) => {
  //   if (curr.endsWith('/')) {
  //     acc += curr.slice(0, -1) + ' ';
  //   } else {
  //     acc += curr;
  //     if (index < array.length - 1) {
  //       acc += ', ';
  //     }
  //   }
  //   return acc;
  // }, '')];

  try {
    const fullPath = path.resolve(currentDir, args[0]);
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
        try {
          await readFileWithStream(currentDir, args[0])
          break;
        }
        catch {
          console.log('Operation failed');
        }
      case 'add':
        try {
          await fs.writeFile(fullPath, '');
          break;
        }catch {
          console.log('Operation failed');
        }
      case 'rn':
        await renameFile(fullPath, path.resolve(currentDir, path.dirname(args[0]), args[1]));
        break;
      case 'cp':
        await copyFile(fullPath, path.resolve(currentDir, args[1], path.basename(fullPath)));
        break;
      case 'mv':
        await moveFile(fullPath, path.resolve(currentDir, args[1], path.basename(fullPath)));
        break;
      case 'rm':
        await deleteFile(fullPath);
        break;
      case 'os':
        await getInfoOS(args[0]);
        break;
      case 'hash':
        await calculateHash(fullPath);
        break;
      case 'compress':
        await compressFile(fullPath, path.resolve(currentDir, args[1]));
        break;
      case 'decompress':
        await decompressFile(fullPath, args[1]);
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

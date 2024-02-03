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

  try {
    const fullPath = args[0] ? path.resolve(currentDir, args[0]) : null;
    switch (command) {
      case 'up':
        if (path.resolve(currentDir, '..') !== path.parse(currentDir).root) {
          currentDir = path.resolve(currentDir, '..');
        }
        break;
      case 'cd':
        try {
          const newDir = path.resolve(currentDir, args[0]);
          await fs.access(newDir);
          currentDir = newDir;
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'ls':
        await displayDirectoryContents(currentDir);
        break;
      case 'cat':
        try {
          await readFileWithStream(currentDir, args[0]) 
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'add':
        try {
          await fs.writeFile(fullPath, '');
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'rn':
        try {
          await renameFile(fullPath, path.resolve(currentDir, path.dirname(args[0]), args[1]));
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'cp':
        try {
         await copyFile(fullPath, path.resolve(currentDir, args[1], path.basename(fullPath)));
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'mv':
        try {
          await moveFile(fullPath, path.resolve(currentDir, args[1], path.basename(fullPath)));
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'rm':
        try {
          await deleteFile(fullPath);
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'os':
        await getInfoOS(args[0]);
        break;
      case 'hash':
        try {
          await calculateHash(fullPath);
        }
        catch {
          console.log('Operation failed');
        }
        break;
      case 'compress':
        try {
        await compressFile(fullPath, path.resolve(currentDir, args[1]));
        }
        catch {
        console.log('Operation failed');
        }
        break;
      case 'decompress':
        try {
          await decompressFile(fullPath, args[1]);
        }
        catch {
          console.log('Operation failed');
        }
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

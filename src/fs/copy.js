import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const copyFile = async (sourcePath, destinationPath) => {
	const readStream = fs.createReadStream(sourcePath);
	const writeStream = fs.createWriteStream(destinationPath);
	const pipelineAsync = promisify(pipeline);
  
	try {
	  await pipelineAsync(readStream, writeStream);
	} catch {
	  console.log('Operation failed');
	}
  };
  

export default copyFile;
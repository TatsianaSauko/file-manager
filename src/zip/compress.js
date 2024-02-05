import fs from 'fs';
import { createBrotliCompress } from 'zlib';


const compressFile = async (sourcePath, destinationPath) => {
	const sourceStream = fs.createReadStream(sourcePath);
	const destinationStream = fs.createWriteStream(destinationPath);
	const compressStream = createBrotliCompress();
  
	sourceStream.on('error', (error) => console.log('Operation failed'));
	destinationStream.on('error', (error) => console.log('Operation failed'));
  
	sourceStream.pipe(compressStream).pipe(destinationStream);
  };

export default compressFile;

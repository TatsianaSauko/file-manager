import fs from 'fs';
import { createBrotliDecompress  } from 'zlib';

const decompressFile = async (sourcePath, destinationPath) => {
	const sourceStream = fs.createReadStream(sourcePath);
	const destinationStream = fs.createWriteStream(destinationPath);
	const decompressStream = createBrotliDecompress();
  
	sourceStream.on('error', (error) => console.log('Operation failed'));
	destinationStream.on('error', (error) => console.log('Operation failed'));
  
	sourceStream.pipe(decompressStream).pipe(destinationStream);
  };

export default decompressFile;

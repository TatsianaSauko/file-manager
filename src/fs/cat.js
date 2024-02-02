import fs from 'fs';

const readFileWithStream = async (currentDir, fileName) => {
	try {
		const filePath  = path.resolve(currentDir, fileName);
		const readStream = fs.createReadStream(filePath);
	
		readStream.on('data', function(chunk) {
			process.stdout.write(chunk);
		});
	
		readStream.on('error', function(err) {
			console.error('An error has occurred.', err);
		});
	}catch(err) {
		console.error(`File "${fileName}" does not exist\n`);
	}
	

};

export default readFileWithStream;
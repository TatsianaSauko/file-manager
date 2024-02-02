import crypto from 'crypto';
import fs from 'fs';

const calculateHash = async (filePath) => {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

	input.on('error', (error) => {
		console.error('Error reading file.');
	  });
	

    input.on('readable', () => {
        const data = input.read();
        if (data)
            hash.update(data);
        else {
            console.log(`SHA256 Hash: ${hash.digest('hex')}`);
        }
    });
};

export default calculateHash;

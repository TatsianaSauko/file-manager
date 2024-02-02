import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const moveFile = async (sourcePath, destinationPath) => {
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);
  const pipelineAsync = promisify(pipeline);

  try {
    await pipelineAsync(readStream, writeStream);
    console.log('File copied successfully');
  } catch (error) {
    console.error('Error copying file:', error);
    return;
  }

  try {
    await fs.promises.unlink(sourcePath);
    console.log('The original file was successfully deleted');
  } catch (error) {
    console.error('Error when deleting source file:', error);
  }
};

export default moveFile;

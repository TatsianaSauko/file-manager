import fs from "fs/promises";

const deleteFile = async (filePath) => {
	try {
	  await fs.unlink(filePath);
	  console.log('File deleted successfully');
	} catch (error) {
	  console.error('Error deleting file');
	}
  };

export default deleteFile;
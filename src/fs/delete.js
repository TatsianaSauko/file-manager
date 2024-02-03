import fs from "fs/promises";

const deleteFile = async (filePath) => {
	try {
	  await fs.unlink(filePath);
	} catch {
		console.log('Operation failed');
	}
  };

export default deleteFile;
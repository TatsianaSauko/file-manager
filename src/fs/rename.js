import fs from 'fs/promises';

const renameFile = async (oldName, newName) => {
    try {
        await fs.access(newName);
        console.error(`FS operation failed: ${newName} already exists`);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error(error);
        }
    }
    try {
        await fs.access(oldName);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`FS operation failed: ${oldName} does not exist`);
        } else {
            console.error(error);
        }
    }
    try {
        await fs.rename(oldName, newName);
		console.log(`File "${oldName}" renamed to "${newName}"\n`);
    } catch (error) {
       console.error(error)
    }

};

export default renameFile;
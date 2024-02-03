import fs from 'fs/promises';

const renameFile = async (oldName, newName) => {
    try {
        await fs.rename(oldName, newName);
		console.log(`File "${oldName}" renamed to "${newName}"\n`);
    } catch {
        console.log('Operation failed');
    }
};

export default renameFile;

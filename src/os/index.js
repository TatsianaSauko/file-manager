import os from "node:os";

async function getInfoOS(flag) {
  switch (flag) {
    case "--EOL":
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`Total number of processors: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}:`);
        console.log(`Model: ${cpu.model}`);
        console.log(`Clock frequency: ${cpu.speed/1000} GHz`);
      });
      break;
    case "--homedir":
      console.log(`Home Directory: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`Username: ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`Architecture: ${os.arch}`);
      break;
    default:
      console.log("Invalid input\n");
      break;
  }
}

export default getInfoOS;

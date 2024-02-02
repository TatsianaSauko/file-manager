import os from "node:os";

async function getOSInfo(flag) {
  switch (flag) {
    case "--EOL":
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case "--cpus":
      const cpus = os.cpus().map((e) => {
        return { model: e.model, speed: `${MHzToGHz(e.speed)}GHz` };
      });
      console.log(`Total CPUS: ${cpus.length}`);
      console.table(cpus);
      break;
    case "--homedir":
      console.log(`Homedir: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`OS User: ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`Architecture: ${os.arch}`);
      break;
    default:
      console.log("Invalid flag\n");
      break;
  }
}

export default getOSInfo;

const MHzToGHz = (value) => {
  return value / 1000;
};
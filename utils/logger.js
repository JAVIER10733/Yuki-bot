const { version } = require("../../package.json");

exports.sayLog = (message) => {
  console.log("\x1b[36m[YUKI-BOT | TALK]\x1b[0m", message);
};

exports.inputLog = (message) => {
  console.log("\x1b[30m[YUKI-BOT | INPUT]\x1b[0m", message);
};

exports.infoLog = (message) => {
  console.log("\x1b[34m[YUKI-BOT | INFO]\x1b[0m", message);
};

exports.successLog = (message) => {
  console.log("\x1b[32m[YUKI-BOT | ÉXITO]\x1b[0m", message);
};

exports.errorLog = (message) => {
  console.log("\x1b[31m[YUKI-BOT | ERROR]\x1b[0m", message);
};

exports.warningLog = (message) => {
  console.log("\x1b[33m[YUKI-BOT | ADVERTENCIA]\x1b[0m", message);
};

exports.bannerLog = () => {
  console.log("\x1b[35m██╗   ██╗██╗   ██╗██╗  ██╗██╗      ██████╗  ██████╗ ████████╗\x1b[0m");
  console.log("\x1b[35m╚██╗ ██╔╝██║   ██║██║ ██╔╝██║      ██╔══██╗██╔═══██╗╚══██╔══╝\x1b[0m");
  console.log("\x1b[35m ╚████╔╝ ██║   ██║█████╔╝ ██║█████╗██████╔╝██║   ██║   ██║   \x1b[0m");
  console.log("\x1b[35m  ╚██╔╝  ██║   ██║██╔═██╗ ██║╚════╝██╔══██╗██║   ██║   ██║   \x1b[0m");
  console.log("\x1b[35m   ██║   ╚██████╔╝██║  ██╗██║      ██████╔╝╚██████╔╝   ██║   \x1b[0m");
  console.log("\x1b[35m   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝      ╚═════╝  ╚═════╝    ╚═╝   \x1b[0m");
  console.log("\x1b[35m🤖 Bienvenido a YUKI-BOT | Versión: \x1b[0m" + version + "\n");
};
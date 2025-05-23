const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const {
  activateExitGroup,
  deactivateExitGroup,
} = require(`${BASE_DIR}/utils/database`);

module.exports = {
  name: "exit",
  description:
    "Activo/desactivo el recurso de envío de mensaje cuando alguien sale del grupo.",
  commands: ["exit", "salida"],
  usage: `${PREFIX}exit (1/0)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendReply, sendSuccessReact, remoteJid }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "¡Necesitas ingresar 1 o 0 (activar o desactivar)!"
      );
    }

    const exit = args[0] === "1";
    const notExit = args[0] === "0";

    if (!exit && !notExit) {
      throw new InvalidParameterError(
        "¡Necesitas ingresar 1 o 0 (activar o desactivar)!"
      );
    }

    if (exit) {
      activateExitGroup(remoteJid);
    } else {
      deactivateExitGroup(remoteJid);
    }

    await sendSuccessReact();

    const context = exit ? "activado" : "desactivado";

    await sendReply(
      `¡Recurso de envío de mensaje de salida ${context} con éxito!`
    );
  },
};
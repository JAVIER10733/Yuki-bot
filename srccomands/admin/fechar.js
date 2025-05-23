const { PREFIX } = require(`${BASE_DIR}/config`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);

module.exports = {
  name: "cerrar",
  description: "Cierra el grupo.",
  commands: [
    "cerrar",
    "cierra",
    "cerrar-grupo",
    "cierra-grupo",
    "close",
    "close-group",
  ],
  usage: `${PREFIX}cerrar`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ socket, remoteJid, sendSuccessReply, sendErrorReply }) => {
    try {
      await socket.groupSettingUpdate(remoteJid, "announcement");
      await sendSuccessReply("¡Grupo cerrado con éxito!");
    } catch (error) {
      await sendErrorReply(
        "¡Para cerrar el grupo, necesito ser administrador de él!"
      );
      errorLog(
        `¡Ocurrió un error al cerrar el grupo! Causa: ${JSON.stringify(
          error,
          null,
          2
        )}`
      );
    }
  },
};
const { isGroup } = require(`${BASE_DIR}/utils`);
const { DEFAULT_PREFIX } = require(`${BASE_DIR}/config`);
const { isBotAdmin } = require(`${BASE_DIR}/middlewares`);

module.exports = {
  name: "rebaixar",
  description: "Rebaixa um administrador para membro comum",
  commands: ["rebaixar", "rebaixa", "demote"],
  usage: `${DEFAULT_PREFIX}rebaixar @usuario`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    remoteJid,
    socket,
    sendWarningReply,
    sendSuccessReply,
    sendErrorReply,
  }) => {
    if (!isGroup(remoteJid)) {
      return sendWarningReply("Este comando sólo se puede utilizar en un grupo !");
    }

    if (!args.length || !args[0]) {
      return sendWarningReply(
        "Por favor, etiquete a un administrador para degradarlo."
      );
    }

    if (!(await isBotAdmin({ remoteJid, socket }))) {
      return sendWarningReply(
        "¡Necesito ser administrador de grupo para degradar a otros administradores!"
      );
    }

    const userId = args[0].replace("@", "") + "@s.whatsapp.net";

    try {
      await socket.groupParticipantsUpdate(remoteJid, [userId], "demote");
      sendSuccessReply("¡Usuario degradado exitosamente!");
    } catch (error) {
      console.error(error);
      sendErrorReply("Se produjo un error al intentar degradar al usuario..");
    }
  },
};

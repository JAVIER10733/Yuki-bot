const { isGroup } = require(`${BASE_DIR}/utils`);
const { errorLog } = require(`${BASE_DIR}/utils/logger`);
const { PREFIX, ASSETS_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getProfileImageData } = require(`${BASE_DIR}/services/baileys`);

module.exports = {
  name: "perfil",
  description: "Muestra información de un usuario.",
  commands: ["perfil", "profile"],
  usage: `${PREFIX}perfil o ${PREFIX}perfil @usuario`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    socket,
    remoteJid,
    userJid,
    sendErrorReply,
    sendWaitReply,
    sendSuccessReact,
  }) => {
    if (!isGroup(remoteJid)) {
      throw new InvalidParameterError("Este comando solo puede usarse en grupos.");
    }

    const targetJid = args[0]
      ? args[0].replace(/[@ ]/g, "") + "@s.whatsapp.net"
      : userJid;

    await sendWaitReply("Cargando perfil...");

    try {
      let profilePicUrl;
      let userName;
      let userRole = "Miembro";

      try {
        const { profileImage } = await getProfileImageData(socket, targetJid);
        profilePicUrl = profileImage || `${ASSETS_DIR}/images/default-user.png`;

        const contactInfo = await socket.onWhatsApp(targetJid);
        userName = contactInfo[0]?.name || "Usuario desconocido";
      } catch (error) {
        errorLog(
          `Error al obtener datos del usuario ${targetJid}: ${JSON.stringify(error, null, 2)}`
        );
        profilePicUrl = `${ASSETS_DIR}/images/default-user.png`;
      }

      const groupMetadata = await socket.groupMetadata(remoteJid);
      const participant = groupMetadata.participants.find(
        (p) => p.id === targetJid
      );

      if (participant?.admin) {
        userRole = "Administrador";
      }

      const randomPercent = Math.floor(Math.random() * 100);
      const programPrice = (Math.random() * 5000 + 1000).toFixed(2);
      const beautyLevel = Math.floor(Math.random() * 100) + 1;

      const mensaje = `
👤 *Nombre:* @${targetJid.split("@")[0]}
🎖️ *Rol:* ${userRole}

🌚 *Precio del programa:* $${programPrice}
🐮 *Nivel de gado:* ${randomPercent + 7}%
🎱 *Pasividad:* ${randomPercent + 5}%
✨ *Belleza:* ${beautyLevel}%`;

      const mentions = [targetJid];

      await sendSuccessReact();

      await socket.sendMessage(remoteJid, {
        image: { url: profilePicUrl },
        caption: mensaje,
        mentions,
      });
    } catch (error) {
      console.error(error);
      await sendErrorReply("Ocurrió un error al intentar verificar el perfil.");
    }
  },
};
/**
 * Evento chamado quando um usuário
 * entra ou sai de um grupo de WhatsApp.
 *
 * @author Dev Gui
 */
const { getProfileImageData } = require("../services/baileys");
const fs = require("fs");
const { onlyNumbers, randomDelay } = require("../utils");
const {
  isActiveWelcomeGroup,
  isActiveExitGroup,
} = require("../utils/database");

const { catBoxUpload } = require("../services/catbox");
const {
  spiderAPITokenConfigured,
  exit,
  welcome,
} = require("../services/spider-x-api");

exports.onGroupParticipantsUpdate = async ({
  userJid,
  remoteJid,
  socket,
  groupCache,
  action,
}) => {
  try {
    if (!isActiveWelcomeGroup(remoteJid) || !isActiveExitGroup(remoteJid)) {
      return;
    }

    await randomDelay();

    if (!remoteJid.endsWith("@g.us")) {
      return;
    }

    if (action === "add") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured()) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Link inválido");
          }

          const url = welcome(
            "Membro",
            "Eres el miembro más nuevo del grupo.!",
            link
          );

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: ` bienvenida como bienvenido que la pases bien y disfruta la comunidad 😊❤️@${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Erro ao fazer upload da imagem:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `bienvenida como bienvenido que la pases bien y disfruta la comunidad 😊❤️, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `bienvenido que la pases bien y disfruta la comunidad 😊❤️ @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
        });
      }

      const metadata = await socket.groupMetadata(remoteJid);
      groupCache.set(remoteJid, metadata);

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    } else if (action === "remove") {
      const { buffer, profileImage } = await getProfileImageData(
        socket,
        userJid
      );

      if (spiderAPITokenConfigured()) {
        try {
          const link = await catBoxUpload(buffer);

          if (!link) {
            throw new Error("Link inválido");
          }

          const url = exit("Adiós!", "Fuiste un buen miembro", link);

          await socket.sendMessage(remoteJid, {
            image: { url },
            caption: `Bye que pena que te nos fuiste 🥺❤️, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
          await socket.sendMessage(remoteJid, {
            image: buffer,
            caption: `Bye que pena que te nos fuiste 🥺❤️, @${onlyNumbers(userJid)}!`,
            mentions: [userJid],
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          image: buffer,
          caption: `Bye que pena que te nos fuiste 🥺❤️, @${onlyNumbers(userJid)}!`,
          mentions: [userJid],
        });
      }

      if (!profileImage.includes("default-user")) {
        fs.unlinkSync(profileImage);
      }
    }
  } catch (error) {
    console.error("Error al procesar el evento onGroupParticipantsUpdate:", error);
    process.exit(1);
  }
};

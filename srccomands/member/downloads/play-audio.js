const { PREFIX } = require(`${BASE_DIR}/config`);
const { play } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "play-audio",
  description: "Descarga canciones",
  commands: ["play-audio", "play", "pa"],
  usage: `${PREFIX}play-audio MC Hariel`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendAudioFromURL,
    sendImageFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    // Validar que se haya pasado algún argumento
    if (!fullArgs.length) {
      throw new InvalidParameterError(
        "¡Necesitas decirme qué canción buscar!"
      );
    }

    // Validar que no se envíen links en el comando (solo texto)
    if (fullArgs.some(arg => arg.startsWith("http://") || arg.startsWith("https://"))) {
      throw new InvalidParameterError(
        `No puedes usar enlaces para descargar canciones. Usa ${PREFIX}yt-mp3 link`
      );
    }

    await sendWaitReact();

    try {
      // Llamar al servicio para obtener la información de la canción
      const data = await play("audio", fullArgs.join(" "));

      if (!data) {
        await sendErrorReply("¡No se encontró ningún resultado!");
        return;
      }

      await sendSuccessReact();

      const mensaje = `*Título:* ${data.title}
*Descripción:* ${data.description}
*Duración:* ${data.total_duration_in_seconds} segundos
*Canal:* ${data.channel.name}`;

      // Enviar imagen con info y después el audio
      await sendImageFromURL(data.thumbnail, mensaje);
      await sendAudioFromURL(data.url);
    } catch (error) {
      console.error(error);
      await sendErrorReply(error.message);
    }
  },
};
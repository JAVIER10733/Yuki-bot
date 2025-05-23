const { PREFIX } = require(`${BASE_DIR}/config`);
const { download } = require(`${BASE_DIR}/services/spider-x-api`);
const { WarningError } = require(`${BASE_DIR}/errors`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "yt-mp4",
  description: "Descargo videos de YouTube en formato MP4 usando el enlace.",
  commands: ["yt-mp4", "youtube-mp4", "yt-video", "youtube-video", "mp4"],
  usage: `${PREFIX}yt-mp4 https://www.youtube.com/watch?v=mW8o_WDL91o`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendVideoFromURL,
    sendImageFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError(
        "¡Necesitas enviar una URL de YouTube!"
      );
    }

    await sendWaitReact();

    const url = fullArgs[0];
    // Validar que la URL contenga "youtube.com" o "youtu.be"
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      throw new WarningError("¡El enlace no es de YouTube!");
    }

    try {
      const data = await download("yt-mp4", url);

      if (!data) {
        await sendErrorReply("¡No se encontraron resultados!");
        return;
      }

      await sendSuccessReact();

      await sendImageFromURL(
        data.thumbnail,
        `*Título*: ${data.title}
        
*Descripción*: ${data.description}
*Duración en segundos*: ${data.total_duration_in_seconds}
*Canal*: ${data.channel.name}`
      );

      await sendVideoFromURL(data.url);
    } catch (error) {
      console.error(error);
      await sendErrorReply(error.message);
    }
  },
};
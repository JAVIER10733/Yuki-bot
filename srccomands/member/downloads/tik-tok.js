const { PREFIX } = require(`${BASE_DIR}/config`);
const { download } = require(`${BASE_DIR}/services/spider-x-api`);
const { WarningError, InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "tik-tok",
  description: "Descargo videos de TikTok",
  commands: ["tik-tok", "ttk"],
  usage: `${PREFIX}tik-tok https://www.tiktok.com/@usuario/video/1234567890`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendVideoFromURL,
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    if (!fullArgs.length) {
      throw new InvalidParameterError("¡Necesitas enviar una URL de TikTok!");
    }

    await sendWaitReact();

    const url = fullArgs[0];

    if (!url.includes("tiktok.com")) {
      throw new WarningError("¡El enlace no es de TikTok!");
    }

    try {
      const data = await download("tik-tok", url);

      if (!data) {
        await sendErrorReply("¡No se encontraron resultados!");
        return;
      }

      await sendSuccessReact();

      await sendVideoFromURL(data.download_link);
    } catch (error) {
      console.error(error);
      await sendErrorReply(error.message);
    }
  },
};
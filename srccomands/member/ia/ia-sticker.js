const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ia-sticker",
  description: "Crea una figurita basada en una descripción",
  commands: ["ia-sticker", "ia-fig"],
  usage: `${PREFIX}ia-sticker <descripción>`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendStickerFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args.length) {
      return sendWarningReply(
        "Debes proporcionar una descripción para la imagen."
      );
    }

    await sendWaitReply("Generando figurita...");

    const data = await imageAI("stable-diffusion-turbo", fullArgs);

    if (data?.image) {
      await sendStickerFromURL(data.image);
      await sendSuccessReact();
    } else {
      await sendWarningReply(
        "No se pudo generar la figurita. Intenta nuevamente más tarde."
      );
    }
  },
};
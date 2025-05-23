const { PREFIX } = require(`${BASE_DIR}/config`);
const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "pixart",
  description: "Crea una imagen usando la IA Pixart",
  commands: ["pixart"],
  usage: `${PREFIX}pixart <descripción>`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    args,
    sendWaitReply,
    sendWarningReply,
    sendImageFromURL,
    sendSuccessReact,
    fullArgs,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Debes proporcionar una descripción para la imagen."
      );
    }

    await sendWaitReply("Generando imagen...");

    try {
      const data = await imageAI("pixart", fullArgs);

      if (!data?.image) {
        throw new WarningError(
          "No se pudo generar la imagen. Intenta nuevamente más tarde."
        );
      }

      await sendSuccessReact();
      await sendImageFromURL(data.image);
    } catch (error) {
      console.error("Error al generar la imagen:", error);
      throw new Error("Ocurrió un error inesperado al generar la imagen.");
    }
  },
};
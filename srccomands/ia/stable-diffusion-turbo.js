const { imageAI } = require(`${BASE_DIR}/services/spider-x-api`);
const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "stable-diffusion-turbo",
  description: "Genera una imagen usando la IA Stable Diffusion Turbo.",
  commands: [
    "stable-diffusion-turbo",
    "stable-dif-turbo",
    "stable-dif",
    "stable-diff-turbo",
    "stable-diff",
    "stable-diffusion",
    "stable-difusion-turbo",
    "stable-difusion",
  ],
  usage: `${PREFIX}stable-diffusion-turbo <descripción de la imagen>`,
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
        "Debes proporcionar una descripción para generar la imagen."
      );
    }

    const prompt = fullArgs.trim();

    if (prompt.length < 5) {
      throw new InvalidParameterError(
        "La descripción es demasiado corta. Intenta algo más detallado para obtener mejores resultados."
      );
    }

    await sendWaitReply("Por favor espera, estoy generando tu imagen con IA...");

    try {
      const data = await imageAI("stable-diffusion-turbo", prompt);

      if (!data?.image) {
        throw new WarningError(
          "No se pudo generar la imagen en este momento. Intenta nuevamente más tarde."
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
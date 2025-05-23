const { PREFIX } = require(`${BASE_DIR}/config`);
const { gpt4 } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "gpt-4",
  description: "Comandos de inteligencia artificial",
  commands: ["gpt-4", "gpt"],
  usage: `${PREFIX}gpt ¿con cuántos palos se hace una canoa?`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args.join(" ").trim();

    if (!text) {
      throw new InvalidParameterError(
        "¡Necesitas decirme qué debo responder!"
      );
    }

    await sendWaitReply("Procesando tu pregunta...");

    const responseText = await gpt4(text);

    await sendSuccessReply(responseText);
  },
};
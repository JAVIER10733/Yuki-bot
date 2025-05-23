const { PREFIX } = require(`${BASE_DIR}/config`);
const { ttp } = require(`${BASE_DIR}/services/spider-x-api`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "ttp",
  description: "Crea stickers a partir de texto.",
  commands: ["ttp"],
  usage: `${PREFIX}ttp tu_texto`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    sendWaitReact,
    args,
    sendStickerFromURL,
    sendSuccessReact,
  }) => {
    if (!args.length) {
      throw new InvalidParameterError(
        "Debes proporcionar el texto que deseas convertir en sticker."
      );
    }

    await sendWaitReact();

    const url = await ttp(args[0].trim());

    await sendSuccessReact();

    await sendStickerFromURL(url);
  },
};
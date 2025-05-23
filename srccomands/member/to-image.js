const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "toimage",
  description: "Convierto stickers estáticos en imágenes.",
  commands: ["toimage", "toimg"],
  usage: `${PREFIX}toimage (marca el sticker) o responde al sticker con ${PREFIX}toimage`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isSticker,
    downloadSticker,
    webMessage,
    sendWaitReact,
    sendSuccessReact,
    sendImageFromFile,
  }) => {
    if (!isSticker) {
      throw new InvalidParameterError("¡Debes enviar o responder a un sticker!");
    }

    await sendWaitReact();

    const inputPath = await downloadSticker(webMessage, "input");
    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomNumber(10_000, 99_999)}.png`
    );

    exec(`ffmpeg -i ${inputPath} ${outputPath}`, async (error) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }

      await sendSuccessReact();

      await sendImageFromFile(outputPath);
    });
  },
};
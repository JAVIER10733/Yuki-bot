const { PREFIX, TEMP_DIR } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { getRandomNumber } = require(`${BASE_DIR}/utils`);

module.exports = {
  name: "sticker",
  description: "Creo stickers a partir de imágenes, gifs o videos.",
  commands: ["s", "sticker", "fig", "f"],
  usage: `${PREFIX}sticker (marca o responde a una imagen/gif/video)`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({
    isImage,
    isVideo,
    downloadImage,
    downloadVideo,
    webMessage,
    sendErrorReply,
    sendSuccessReact,
    sendWaitReact,
    sendStickerFromFile,
  }) => {
    if (!isImage && !isVideo) {
      throw new InvalidParameterError(
        "¡Debes marcar o responder a una imagen, gif o video!"
      );
    }

    await sendWaitReact();

    const outputPath = path.resolve(
      TEMP_DIR,
      `${getRandomNumber(10_000, 99_999)}.webp`
    );

    if (isImage) {
      const inputPath = await downloadImage(webMessage, "input");

      exec(
        `ffmpeg -i ${inputPath} -vf scale=512:512 ${outputPath}`,
        async (error) => {
          if (error) {
            console.log(error);
            fs.unlinkSync(inputPath);
            throw new Error(error);
          }

          await sendSuccessReact();
          await sendStickerFromFile(outputPath);
        }
      );
    } else {
      const inputPath = await downloadVideo(webMessage, "input");

      const maxDuration = 10;

      const duration =
        webMessage.message?.videoMessage?.seconds ||
        webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage
          ?.videoMessage?.seconds;

      const isValidDuration = duration <= maxDuration;

      if (!isValidDuration) {
        fs.unlinkSync(inputPath);

        await sendErrorReply(`¡El video que enviaste supera los ${maxDuration} segundos! Por favor, envía un video más corto.`);

        return;
      }

      exec(
        `ffmpeg -i ${inputPath} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${outputPath}`,
        async (error) => {
          if (error) {
            console.log(error);
            fs.unlinkSync(inputPath);
            throw new Error(error);
          }

          await sendSuccessReact();
          await sendStickerFromFile(outputPath);
        }
      );
    }
  },
};
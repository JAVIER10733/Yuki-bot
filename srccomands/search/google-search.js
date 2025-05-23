const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError, WarningError } = require(`${BASE_DIR}/errors`);
const { search } = require(`${BASE_DIR}/services/spider-x-api`);

module.exports = {
  name: "google-search",
  description: "Realiza una búsqueda en Google.",
  commands: ["google-search", "g-search"],
  usage: `${PREFIX}google-search Segunda Guerra Mundial`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ fullArgs, sendSuccessReply }) => {
    if (fullArgs.length <= 1) {
      throw new InvalidParameterError(
        "Debes proporcionar un término de búsqueda para Google."
      );
    }

    const maxLength = 100;

    if (fullArgs.length > maxLength) {
      throw new InvalidParameterError(
        `El límite máximo para la búsqueda es de ${maxLength} caracteres.`
      );
    }

    const data = await search("google", fullArgs);

    if (!data || data.length === 0) {
      throw new WarningError(
        "No se encontraron resultados para tu búsqueda."
      );
    }

    let text = "";

    for (const item of data) {
      text += `🔎 *Título:* ${item.title}\n`;
      text += `📝 *Descripción:* ${item.description}\n`;
      text += `🔗 *Enlace:* ${item.url}\n`;
      text += `────────────────────\n`;
    }

    await sendSuccessReply(`*Resultados de búsqueda en Google*

🔍 *Término buscado:* ${fullArgs}

${text}`);
  },
};
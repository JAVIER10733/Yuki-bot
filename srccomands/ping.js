const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ping",
  description: "Comprueba si el bot está en línea",
  commands: ["ping"],
  usage: `${PREFIX}ping`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendReply, sendReact }) => {
    await sendReact("🏓");
    await sendReply(`🏓 Pong!`);
  },
};

const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);
const { consultarCep } = require("correios-brasil");

module.exports = {
  name: "cep",
  description: "Consulta información de un CEP brasileño.",
  commands: ["cep"],
  usage: `${PREFIX}cep 01001-001`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ args, sendWarningReply, sendSuccessReply }) => {
    const cep = args[0];

    if (!cep || !/^\d{5}-?\d{3}$/.test(cep)) {
      throw new InvalidParameterError(
        "Por favor, proporciona un CEP válido en el formato 00000-000 o 00000000."
      );
    }

    try {
      const data = await consultarCep(cep);

      if (!data || !data.cep) {
        await sendWarningReply("¡CEP no encontrado!");
        return;
      }

      const mensaje = `*Resultado de la búsqueda de CEP*

*CEP:* ${data.cep}
*Dirección:* ${data.logradouro || "-"}
*Complemento:* ${data.complemento || "-"}
*Barrio:* ${data.bairro || "-"}
*Ciudad:* ${data.localidade}
*Estado (UF):* ${data.uf}
*Código IBGE:* ${data.ibge}`;

      await sendSuccessReply(mensaje);
    } catch (error) {
      console.error("Error al consultar el CEP:", error);
      throw new Error("Ocurrió un error al consultar el CEP. Inténtalo de nuevo más tarde.");
    }
  },
};
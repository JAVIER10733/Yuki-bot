/**
 * Menú Celestial Aesthetic del Bot
 * Creado con amor por Dev Gui
 */

const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "⋆｡°✩ Espera un momento... invocando las estrellas ✩°｡⋆";

exports.menuMessage = () => {
  const date = new Date();

  return `
╭─────── ⋆⋅☆⋅⋆ ───────╮
         𓆩 ${BOT_NAME} 𓆪
╰─────── ⋆⋅☆⋅⋆ ───────╯

✦ Fecha: ${date.toLocaleDateString("pt-br")}
✦ Hora: ${date.toLocaleTimeString("pt-br")}
✦ Prefijo: ${PREFIX}

╭─〔 ☼ Panel del Creador ☼ 〕─╮
• ${PREFIX}get-id
• ${PREFIX}on / off
╰────────────────────────╯

╭─〔 ☼ Comandos de Admin ☼ 〕─╮
• ${PREFIX}abrir / fechar
• ${PREFIX}anti-link (1/0)
• ${PREFIX}auto-responder (1/0)
• ${PREFIX}ban / exit (1/0)
• ${PREFIX}hidetag / limpar
• ${PREFIX}promover / rebaixar / revelar
• ${PREFIX}welcome (1/0)
╰────────────────────────────╯

╭─〔 ☼ Funciones Útiles ☼ 〕─╮
• ${PREFIX}ping / perfil
• ${PREFIX}attp / ttp
• ${PREFIX}sticker / to-image
• ${PREFIX}cep / google-search
• ${PREFIX}yt-search
╰──────────────────────────╯

╭─〔 ☼ Descargas ☼ 〕─╮
• ${PREFIX}play-audio / play-video
• ${PREFIX}yt-mp3 / yt-mp4
• ${PREFIX}tik-tok
╰────────────────────╯

╭─〔 ☼ Diversión Mágica ☼ 〕─╮
• ${PREFIX}abracar / beijar
• ${PREFIX}jantar / lutar
• ${PREFIX}matar / socar
╰────────────────────────╯

╭─〔 ☼ Inteligencia Celestial ☼ 〕─╮
• ${PREFIX}gpt-4 / ia-sticker
• ${PREFIX}pixart
• ${PREFIX}stable-diffusion-turbo
╰────────────────────────────────╯

╭─〔 ☼ Efectos Canvas ☼ 〕─╮
• ${PREFIX}bolsonaro / cadeia
• ${PREFIX}inverter / rip
╰───────────────────────╯

╭───── ⋆⁺₊⋆ ☾⋆⁺₊⋆ ─────╮
   𖦹 𝓑𝓸𝓽: ${BOT_NAME}
   𖦹 𝓒𝓻𝓮𝓪𝓭𝓸𝓻: Angelo
   𖦹 𝓒𝓸𝓵𝓪𝓫𝓸𝓻𝓪𝓭𝓸𝓻𝓮𝓼: 『ᴱꙄ┊ㅤＪＡＶＩＥＲ』亗
   𖦹 𝓥𝓮𝓻𝓼𝓲𝓸𝓷: Yuki-bot 1.0.1
   𖦹 𝓕𝓻𝓪𝓼𝓮: "Un bot nacido entre las estrellas..."
╰───── ⋆⁺₊⋆ ☾⋆⁺₊⋆ ─────╯
`;
};
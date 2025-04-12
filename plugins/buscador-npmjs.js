/*
《✧》DERECHOS RESERVADOS POR EL AUTOR《✧》
- GabrielVz (@glytglobal)
*/

import fetch from "node-fetch";

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `🌸 Digite o nome do scraper.\nExemplo: ${usedPrefix + command} yt-search`,
      m,
      rcanal
    );

  try {
    await m.react(rwait);
    conn.reply(m.chat, "🌸 Buscando el scraper....", m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: packname,
          body: dev,
          previewType: 0,
          thumbnail: icons,
          sourceUrl: channel,
        },
      },
    });

    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
    let { objects } = await res.json();

    if (!objects.length)
      return conn.reply(
        m.chat,
        `『✦』 Não foi encontrado resultado de: ${text}`,
        m,
        fake
      );

    let txt = objects.map(({ package: pkg }) => {
      return `《✧》 𝖲craper - Akari 《✧》

✦ 𝐍𝐨𝐦𝐞: ${pkg.name}  
✦ 𝐕𝐞𝐫𝐬ã𝐨: V${pkg.version}  
✦ 𝐋𝐢𝐧𝐤: ${pkg.links.npm}  
✦ 𝐃𝐞𝐬𝐜𝐫𝐢çã𝐨: ${pkg.description}
\n\n----------`;
    }).join`\n\n`;

    await conn.reply(m.chat, txt, m, fake);
    await m.react(done);
  } catch {
    await conn.reply(m.chat, "🌸 Ocorreu um erro", m, fake);
    await m.react(error);
  }
};

handler.help = ["npmjs"];
handler.tags = ["buscador"];
handler.command = ["npmjs"];
handler.register = false;
handler.estrellas = 6;
export default handler;

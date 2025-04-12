// By WillZek >> https://github.com/WillZek

import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply("🍭 Digite um texto para buscar um grupo do WhatsApp");

  try {
    let api = `https://api.agungny.my.id/api/searchgroup?q=${text}`;

    let response = await fetch(api);
    let json = await response.json();

    m.react("🕑");
    let txt = `🔎 \`GRUPO WHATSAPP - SEARCH\`.`;
    for (
      let i = 0;
      i < (5 <= json.result.length ? 5 : json.result.length);
      i++
    ) {
      let cb = json.result[i];
      txt += `\n\n`;
      txt += `💠 *Nome Do Grupo:* ${cb.title}\n`;
      txt += `💠 *descrição:* ${cb.desc}\n`;
      txt += `💠 *Link:* ${cb.link}`;
    }

    m.react("🕒");
    let img = json.result[0];

    conn.sendMessage(
      m.chat,
      { image: { url: img.thumb }, caption: txt },
      { quoted: m }
    );
    m.react("✅");
  } catch (e) {
    m.reply("💠 Não Foi Encontrado O Grupo De WhatsApp");
    m.react("✖️");
  }
};

handler.help = ["buscargp"];
handler.tag = ["buscador"];
handler.command = ["gpwasearch", "gpwas", "buscargp", "buscargrupo"];

export default handler;

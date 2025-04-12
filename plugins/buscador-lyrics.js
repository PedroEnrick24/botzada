/* Lyrics By WillZek 
- Free Codes Titan 
- https://github.com/WillZek
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S 
*/

// [⌨️] Letra De Canciones

import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(m.chat, "🍭 Insira o nome de alguma música", m, rcanal);

  try {
    let api = `https://archive-ui.tanakadomp.biz.id/search/lirik?q=${text}`;

    let responde = await fetch(api);
    let json = await responde.json();
    let crow = json.result;

    let txt = `*Nome:* ${crow.title}\n*Letra:* ${crow.lyrics}`;

    let img = crow.thumb;

    conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: txt },
      { quoted: fkontak }
    );
  } catch (e) {
    console.log(e);
    m.reply("*Não foi possível obter a letra da sua música*");
    m.reply("✖️");
  }
};

handler.help = ["lyrics"];
handler.tag = ["buscador"];
handler.command = ["lyrics"];

export default handler;

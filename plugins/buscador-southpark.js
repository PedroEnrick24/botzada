/* País Info By WillZek 
- https://github.com/WillZek 
- https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W
*/

import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("🍭 Digite o nome de um país");

  try {
    let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;

    let response = await fetch(api);
    let json = await response.json();
    let datas = json.data;

    let park = `*Informações sobre:* ${text}\n\n*Nome Oficial:* ${datas.officialName}\n*Organização:* ${datas.memberOf}\n*Capital:* ${datas.capitalCity}\n*Continente:* ${datas.continent}\n*População:* ${datas.population}\n*Prefixo:* ${datas.callingCode}\n*Moeda:* ${datas.currency}\n*Descrição:* ${datas.description}`;

    let img = datas.image;

    conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: park },
      { quoted: fkontak }
    );
  } catch (e) {
    m.reply(`*Error:* ${e.message}`);
    m.react("✖️");
  }
};

handler.help = ["flag <nombre de un país>"];
handler.tag = ["buscador"];
handler.command = ["paisinfo", "flag"];

export default handler;

/* Github Search By WillZek 
- Free Codes Titan  
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

// [🔎] 𝗚𝗶𝘁𝗵𝘂𝗯 𝗦𝗲𝗮𝗿𝗰𝗵

import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      "《★》Digite um nome de repositório ou de usuário do GitHub"
    );

  try {
    let api = `https://dark-core-api.vercel.app/api/search/github?key=dk-vip&text=${text}`;

    let response = await fetch(api);
    let json = await response.json();
    let result = json.results[0];

    let txt = `*Nome:* ${result.name}\n*Dono:* ${result.creator}\n*Estrelas:* ${result.stars}\n*Bifurcações:* ${result.forks}\n*descrição:* ${result.description}\n*Criado:* ${result.createdAt}\n*Link:* ${result.cloneUrl}`;

    let img = "https://files.catbox.moe/9vlgt5.jpg";

    conn.sendMessage(
      m.chat,
      { image: { url: img }, caption: txt },
      { quoted: fkontak }
    );
  } catch (error) {
    console.error(error);
    m.reply(`Error: ${error.message}`);
    m.react("✖️");
  }
};

handler.tag = ["buscador"];
handler.help = ["githubsearch"];
handler.command = ["githubsearch", "gbsearch"];

export default handler;

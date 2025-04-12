/*- `PLUGIN DOWNLOAD MEDIAFIRE`- By KenisawaDev*/

import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`"Digite um link do Mediafire`);
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`);
  let gyh = await ouh.json();
  await conn.sendFile(
    m.chat,
    gyh.data[0].link,
    `${gyh.data[0].nama}`,
    `*📝 Nombre:* ${gyh.data[0].nama}\n*🎮 Tamaño:* ${gyh.data[0].size}\n*💾 Extensión:* ${gyh.data[0].mime}\n> ${dev}`,
    m
  );
  await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
};
handler.help = ["mediafire"];
handler.tags = ["descargas"];
handler.command = /^(mediafire|mf)$/i;
handler.premium = false;
handler.estrellas = 5;
handler.register = true;
export default handler;

/* import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `[ ᰔᩚ ] Ingresa una URL válida de *Mediafire*.`, m);
  }

  await m.react('🕓');

  let url = args[0];
  if (!url.includes('mediafire.com')) {
    return conn.reply(m.chat, `El enlace proporcionado no parece ser de MediaFire.`, m);
  }

  try {
    const apiUrl = `https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    if (!response.data.status || !response.data.data) {
      throw new Error('No se pudo obtener la información del archivo.');
    }

    const { fileName, downloadLink, fileSize, meta } = response.data.data;

    let text = '`乂  M E D I A F I R E`';
    text += `» *Título:* ${fileName}\n`;
    text += `» *Tamaño:* ${fileSize}\n`;
    text += `» *Enlace:* ${downloadLink}\n`;

    await conn.reply(m.chat, text, m);

    const fileBuffer = (await axios.get(downloadLink, { responseType: 'arraybuffer' })).data;
    await conn.sendMessage(
      m.chat,
      { document: fileBuffer, fileName: fileName, mimetype: 'application/octet-stream' },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
  }
};

handler.help = ['mediafire *<url>*'];
handler.tags = ['descargas'];
handler.command = ['mediafire', 'mf'];
handler.register = true;
handler.estrellas = 5;

export default handler;
*/

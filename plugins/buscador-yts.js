import yts from "yt-search";

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `🎩 *Digite o título de algum vídeo do YouTube\n\nExemplo, !${command} Goku ultra Instinto`,
      m,
      rcanal
    );

  conn.reply(m.chat, wait, m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: packname,
        body: wm,
        previewType: 0,
        thumbnail: icons,
        sourceUrl: channel,
      },
    },
  });

  let results = await yts(text);
  let tes = results.all;
  let teks = results.all
    .map((v) => {
      switch (v.type) {
        case "video":
          return `☁️ *Título:* 
» ${v.title}

🔗 *Link:* 
» ${v.url}

🕝 *Duracao:*
» ${v.timestamp}

📆 *Publicado:* 
» ${v.ago}

👀 *Vistas:* 
» ${v.views}`;
      }
    })
    .filter((v) => v)
    .join("\n\n••••••••••••••••••••••••••••••••••••\n\n");

  conn.sendFile(m.chat, tes[0].thumbnail, "yts.jpeg", teks, fkontak, m);
};
handler.help = ["ytsearch"];
handler.tags = ["buscador"];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;

handler.register = true;
//handler.yenes = 1

export default handler;

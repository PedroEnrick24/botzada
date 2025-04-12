import fetch from "node-fetch";
import axios from "axios";
import cheerio from "cheerio";

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!global.db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(
      "*[❗]  Os comandos +18 esta desativado neste grupo.\n> se voce é admin e queira ativar use .enable nsfw"
    );
  }
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `*[❗𝐈𝐍𝐅𝐎❗]*\n\n🌼 * Por favor, insira o nome de algum xnxx para buscar.\nExemplo: ${usedPrefix + command} com minha prima`,
      m
    );
  }

  try {
    const results = await xvideosSearch(args.join(" "));
    if (results.length === 0) {
      return conn.reply(
        m.chat,
        `*[❗𝐈𝐍𝐅𝐎❗]*\nNão foram encontrados resultados para *${args.join(" ")}*`,
        m
      );
    }

    let responseMessage = `🌸 *Resultados de pesquisa para:* *${args.join(" ")}*\n\n`;
    results.forEach((video, index) => {
      responseMessage += `☁️ *Título:* ${video.title}\n`;
      responseMessage += `🕒 *Duracao:* ${video.duration}\n`;
      responseMessage += `🎞️ *Cualidade:* ${video.quality || "Indisponivel"}\n`;
      responseMessage += `🔗 *Link:* ${video.url}\n\n`;
    });

    conn.reply(m.chat, responseMessage, m);
  } catch (e) {
    console.error(e);
    return conn.reply(
      m.chat,
      `*[❗𝐈𝐍𝐅𝐎❗]*\nOcorreu um erro ao buscar vídeos. Por favor, tente novamente mais tarde`,
      m
    );
  }
};

handler.help = ["xvideosearch"];
handler.tag = ["buscador"];
handler.command = ["xvideossearch", "xvsearch", "xvse", "xvideosearch"];
handler.register = true;
handler.estrellas = 14;
handler.group = false;

export default handler;

async function xvideosSearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `https://www.xvideos.com/?k=${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const results = [];
      $("div.mozaique > div").each((index, element) => {
        const title = $(element).find("p.title a").attr("title");
        const videoUrl =
          "https://www.xvideos.com" + $(element).find("p.title a").attr("href");
        const duration = $(element).find("span.duration").text().trim();
        const quality = $(element).find("span.video-hd-mark").text().trim();

        results.push({ title, url: videoUrl, duration, quality });
      });

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

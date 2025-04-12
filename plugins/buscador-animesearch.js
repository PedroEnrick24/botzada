/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

import axios from "axios";
import cheerio from "cheerio";

const searchAnime = async (query) => {
  const url = `https://tioanime.com/directorio?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $("ul.animes li").each((_, element) => {
      const name = $(element).find("h3.title").text().trim();
      const id = $(element).find("a").attr("href").split("/").pop();
      const image = $(element).find("img").attr("src");
      const animeUrl = `https://tioanime.com${$(element).find("a").attr("href")}`;

      results.push({
        name,
        id,
        image: `https://tioanime.com${image}`,
        url: animeUrl,
      });
    });

    return results;
  } catch (error) {
    console.error("Erro ao buscar o anime:", error.message);
    return { error: "Nao foi possivel obter os resultados" };
  }
};

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `《★》Por favor, digite o nome de un anime para buscar.`,
      m
    );
  }

  const results = await searchAnime(args[0]);
  if (results.length === 0) {
    return conn.reply(m.chat, `${emoji2} Nao achei nenhum resultado.`, m);
  }

  const messages = [];
  for (const { name, id, url, image } of results) {
    messages.push([
      `Info do anime`,
      `Título: ${name}\n\n🔖 ID: ${id}\n*Usa este ID para baixar o anime, Selecione uma opção da lista.*`,
      image,
      [],
      [[`${url}`]],
      [],
      [
        {
          title: `Selecione para obter as informações do anime.`,
          rows: [
            {
              title: name,
              description: "Clique para obter informações detalhadas do anime.",
              rowId: `${usedPrefix}animeinfo ${url}`,
            },
          ],
        },
      ],
    ]);
  }

  await conn.sendCarousel(
    m.chat,
    "",
    `\`\`\`《★》Olá! A seguir, vou te mostrar a lista de animes encontrados.\`\`\``,
    "",
    messages,
    m
  );
};

handler.help = ["animesearch"];
handler.command = ["animesearch", "animes"];
handler.tags = ["buscador"];
handler.premium = true;
handler.register = true;
handler.group = true;

export default handler;

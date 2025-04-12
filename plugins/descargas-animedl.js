/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

async function acc(longUrl) {
  try {
    const response = await axios.get(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao encurtar o link:", error.message);
    return longUrl;
  }
}
const getDownloadLinks = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const downloads = {};
    $("table.table-downloads tbody tr").each((_, element) => {
      const server = $(element).find("td:nth-child(2)").text().trim();
      const link = $(element).find("td:nth-child(4) a").attr("href");

      if (server && link) {
        downloads[server] = link;
      }
    });
    return downloads;
  } catch (error) {
    console.error("Erro ao processar a URL:", url, error.message);
    return { error: "Não foi possível obter os links" };
  }
};

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!args[0])
    return m.reply(
      `*\`🌱 Digite o link do anime para obter informações. Exemplo:.\`*\n\n\`${usedPrefix + command} https://tioanime.com/ver/dungeon-meshi-1\`\n\n> Nota: No comando #animes, os links não são completos porque são muito longos, por isso usei um encurtador, mas ainda assim funcionam.`
    );

  const links = await getDownloadLinks(args[0]);

  if (links.error) throw links.error;

  let messageText = `⛲\n\n\`• Lista de opções para baixar:\n\n`;

  for (const [server, link] of Object.entries(links)) {
    // const shortLink = await acc(link);
    messageText += `🌴 *\`Servidor:\`* ${server}\n  🌱 *\`Link:\`* ${link}\n----------------------------------\n`;
  }
  messageText += `\n> Para baixar, use o comando respectivo ao servidor.\n`;
  messageText += `\n\`🌾 Nota: Os links nem sempre podem funcionar se forem muito antigos.\``;
  await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
};

handler.command = ["animedl", "animelinks"];
// handler.tags = ['descargas'];
//handler.estrellas = 9;

export default handler;

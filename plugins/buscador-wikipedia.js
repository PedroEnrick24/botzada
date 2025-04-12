import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { text }) => {
  if (!text) return m.reply("🔎 Digite um texto para buscar na Wikipedi ");

  try {
    const link = await axios.get(`https://es.wikipedia.org/wiki/${text}`);
    const $ = cheerio.load(link.data);

    let wik = $("#firstHeading").text().trim();
    let resulw = $("#mw-content-text > div.mw-parser-output")
      .find("p")
      .text()
      .trim();
    m.reply(`▢ *Wikipedia*

‣ Resultado De: ${wik}

${resulw}`);
  } catch (e) {
    m.reply(`Error: ${e}`);
  }
};
handler.help = ["wikipedia"];
handler.tags = ["buscador"];
handler.command = ["wiki", "wikipedia"];
handler.estrellas = 7;

export default handler;

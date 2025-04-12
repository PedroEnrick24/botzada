import fetch from "node-fetch";

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `🍫 *Digite o nome de algum anime\n\nExemplo, ${usedPrefix + command} Ai Yaemori`,
      m,
      rcanal
    );
  let res = await fetch("https://api.jikan.moe/v4/manga?q=" + text);
  if (!res.ok) return conn.reply(m.chat, `🚩 *Ocorreu uma falha*`, m, rcanal);

  let json = await res.json();
  let {
    chapters,
    title_japanese,
    url,
    type,
    score,
    members,
    background,
    status,
    volumes,
    synopsis,
    favorites,
  } = json.data[0];
  let author = json.data[0].authors[0].name;
  let animeingfo = `🍟 Título: ${title_japanese}
🚩 Capítulo: ${chapters}
💫 Transmisión: ${type}
🗂 Estado: ${status}
🗃 Volúmenes: ${volumes}
🌟 Favorito: ${favorites}
🧮 Puntaje: ${score}
👥 Miembros: ${members}
🔗 Url: ${url}
👨‍🔬 Autor: ${author}
📝 Fondo: ${background}
💬 Sinopsis: ${synopsis}
 `;
  conn.sendFile(
    m.chat,
    json.data[0].images.jpg.image_url,
    "anjime.jpg",
    "      🚩 *I N F O - A N I M E* 🚩\n\n" + animeingfo,
    fkontak,
    m
  );
};
handler.help = ["infoanime"];
handler.tags = ["buscador"];
handler.command = ["infoanime", "animeinfo"];

export default handler;

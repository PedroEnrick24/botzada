import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    return m.reply(
      `《★》Ingresa el nombre de una película\n> Ejemplo: ${usedPrefix + command} Deadpool`
    );

  try {
    let api = await fetch(
      `https://delirius-apiofc.vercel.app/search/cuevana?q=${encodeURIComponent(text)}`
    );
    let json = await api.json();

    let JT = `📽️ ${command}  -  Search 📽️`;
    json.data.forEach((app, index) => {
      JT += `\n\n══════════════════════`;
      JT += `\n☁️ *Numero :* ${index + 1}`;
      JT += `\n🖼️ *Imagem:* ${app.image}`;
      JT += `\n⚜️ *Titulo:* ${app.title}`;
      JT += `\n📚 *descrição:* ${app.description}`;
      JT += `\n🔗 *Link:* ${app.link}`;
    });

    m.reply(JT);
  } catch (error) {
    console.error(error);
  }
};

handler.help = ["cuevana"];
handler.tag = ["buscador"];
handler.command = /^(cuevana|cuevanasearch|gnula)$/i;

export default handler;

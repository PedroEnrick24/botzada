import { search, download } from "aptoide-scraper";
const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text)
    throw conn.reply(
      m.chat,
      "*\`Digite o nome do APK que deseja buscar. 🤍\`*",
      m,
      fake
    );
  try {
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `📲 *Baixador do Aptoide* 📲 📌 *Nome:* ${data5.name} 📦 *Pacote:* ${data5.package} 🕒 *Última atualização:* ${data5.lastup} 📥 *Tamanho:* ${data5.size}`;
    await conn.sendFile(
      m.chat,
      data5.icon,
      "thumbnail.jpg",
      response,
      m,
      null,
      fake
    );
    //    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
    if (data5.size.includes("GB") || data5.size.replace(" MB", "") > 999) {
      return await conn.sendMessage(
        m.chat,
        {
          text: "*[ ⛔ ] O arquivo é muito pesado, por isso não será enviado.*",
        },
        { quoted: m }
      );
    }
    await conn.sendMessage(
      m.chat,
      {
        document: { url: data5.dllink },
        mimetype: "application/vnd.android.package-archive",
        fileName: data5.name + ".apk",
        caption: null,
      },
      { quoted: m }
    );
  } catch {
    throw `*[❗] Erro, não foram encontrados resultados para sua busca..*`;
  }
};
handler.help = ["apk *<nombre>*"];
handler.tags = ["descargas"];
handler.command = /^(apk|modapk|dapk2|aptoide|aptoidedl)$/i;
export default handler;

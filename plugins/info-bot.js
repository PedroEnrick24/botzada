import fs from "fs";
const handler = (m) => m;
handler.all = async function (m) {
  const chat = global.db.data.chats[m.chat];
  if (chat.isBaneed) return;
  /* if (/^bot$/i.test(m.text)) {
conn.reply(m.chat, `🌠 ¡Olá! Sou CrowBot, em que posso te ajudar?\n\n✰ Usa *.menu* para ver meus comandos.`, m, rcanal, )
}
*/
  /*if (/^que|q$/i.test(m.text)) {
conn.reply(m.chat, `*so*`, m, rcanal, )
}*/
  if (/^English$/i.test(m.text)) {
    conn.reply(m.chat, `*The first one to speak is gay*`, m, rcanal);
  }

  if (/^Bot de mierda/i.test(m.text)) {
    conn.reply(m.chat, `*Nao diga merda, Pedro*`, m, rcanal);
  }

  if (/^porno|gore/i.test(m.text)) {
    conn.reply(
      m.chat,
      `***R꙰EGRAS DO GRUPO❍ꪜ**

📸 *Apresente-se*
🚫Não enviar mensagens privadas sem permissão
🚫Proibido vídeos pornográficos infantis e adultos

━━━━━━V͇̿I͇̿P͇̿━━━━━━

⚜️🔰🅿🆁🅾🅷🅸🅱🅸🅳🅾⚜️ Proibido pornografia
➬⃢⃞⃟🔞Proibido menores de 16 anos
➬⃢⃞⃟🩸Proibido vídeos sangrentos
➬⃢⃞⃟🚫Proibido conteúdo pornográfico
➬⃢⃞⃟❌Proibido mandar PV sem permissão
➬⃢⃞⃟👀Proibido “mirones” (espiões/observadores passivos)
➬⃢⃞⃟👾Proibido “soplones” (dedos-duros)
➬⃢⃞⃟👻Proibido fantasmas (usuários inativos)
➬⃢⃞⃟📱🚫Sem spam
➬⃢⃞⃟🦠Sem vírus e trabas
🚫SEM LINKS 🔗
➬⃢⃞⃟💣Se não cumprir, será banido💣

█║║██║║██║║██║║██║║█
✧･ﾟ: *✧･Atenciosamente,

☆ ፝͜★ৡ͜͡✞ *CrowBot* ➵͡☠️⃪̸ੵ᷒ᰰ↱

✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*✧･ﾟ: *✧･ﾟ:*`,
      m,
      rcanal
    );
  }
  return !0;
};
export default handler;

let WAMessageStubType = (await import("@whiskeysockets/baileys")).default;

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo",
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    participant: "0@s.whatsapp.net",
  };
  let chat = global.db.data.chats[m.chat];
  let usuario = `@${m.sender.split`@`[0]}`;
  let pp =
    (await conn.profilePictureUrl(m.chat, "image").catch((_) => null)) ||
    "https://files.catbox.moe/xr2m6u.jpg";

  let nombre, foto, edit, newlink, status, admingp, noadmingp, aceptar;
  nombre = `《✧》${usuario} Trocou o nome do grupo.\n\n> ✦ Agora o grupo se chama:\n> *${m.messageStubParameters[0]}*.`;
  foto = `《✧》${usuario} Trocou a imagem do grupo.`;
  edit = `《✧》${usuario} Permitiu que ${m.messageStubParameters[0] == "on" ? "Somente adm" : "todos"} possa configurar o grupo`;
  newlink = `《✧》O link do grupo foi redefinido.\n\n> ✦ Feito(a) por:\n> » ${usuario}`;
  status = `《✧》O grupo foi ${m.messageStubParameters[0] == "on" ? "*fechado 🔒*" : "*aberto 🔓*"} Por ${usuario}\n\n> ✦ Agora ${m.messageStubParameters[0] == "on" ? "*somente admins*" : "*todos*"} podem enviar mensagem.`;
  admingp = `《✧》@${m.messageStubParameters[0].split`@`[0]} Agora é admin do grupo.\n\n> ✦ Feita por:\n> » ${usuario}`;
  noadmingp = `《✧》@${m.messageStubParameters[0].split`@`[0]} Nao é mais admin do grupo.\n\n> ✦ Feita por:\n> » ${usuario}`;
  aceptar = `《✧》Chegou um novo participante no grupo.\n\n> ◦ ✐ Grupo: *${groupMetadata.subject}*\n\n> ◦ ⚘ Bem-vindo/a: @${m.messageStubParameters[0].split("@")[0]}\n\n> ◦ ✦ Aceitado por:
 @${m.sender.split("@")[0]}`;

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(
      m.chat,
      { text: nombre, mentions: [m.sender] },
      { quoted: fkontak }
    );
  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(
      m.chat,
      { image: { url: pp }, caption: foto, mentions: [m.sender] },
      { quoted: fkontak }
    );
  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(
      m.chat,
      { text: newlink, mentions: [m.sender] },
      { quoted: fkontak }
    );
  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(
      m.chat,
      { text: edit, mentions: [m.sender] },
      { quoted: fkontak }
    );
  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(
      m.chat,
      { text: status, mentions: [m.sender] },
      { quoted: fkontak }
    );
  } else if (chat.detect2 && m.messageStubType == 27) {
    await conn.sendMessage(
      m.chat,
      {
        text: aceptar,
        mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`],
      },
      { quoted: fkontak }
    );
  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(
      m.chat,
      {
        text: admingp,
        mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`],
      },
      { quoted: fkontak }
    );

    return;
  }
  if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(
      m.chat,
      {
        text: noadmingp,
        mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`],
      },
      { quoted: fkontak }
    );
  } else {
    //console.log({ messageStubType: m.messageStubType,
    //messageStubParameters: m.messageStubParameters,
    //type: WAMessageStubType[m.messageStubType],
    //})
  }
}

import { WAMessageStubType } from "@whiskeysockets/baileys";
import fetch from "node-fetch";

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split("@")[0]}`;
  let chat = global.db.data.chats[m.chat];
  let defaultImage =
    "https://cdnmega.vercel.app/media/gsw1gLhC@ew68pKDxFue1JI_z7IgeAiR61Swwz5QS0aChvcZM9CI";

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, "image");
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    const welcomeMessage =
      global.db.data.chats[m.chat]?.welcomeMessage || "Bem-vindo/a :";

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏╼★${textbot}\n┋「 Bem-vindo 」\n┗╼★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n ┋❖ ${welcomeMessage}\n ┋❀  ${groupMetadata.subject}\n ┗━━━━━━━━━━━━━━━┅ ⳹\n> ✐ Use *.profile* para ver seu perfil.`;
      await conn.sendMessage(
        m.chat,
        { image: img, caption: bienvenida, mentions: [who] },
        { quoted: estilo }
      );
    } else if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
    ) {
      const despMessage =
        global.db.data.chats[m.chat]?.despMessage || "Se Fue😹";

      let bye = `┏╼★${textbot}\n┋「 ADEUS 👋 」\n┗╼★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n ┋❖ ${despMessage}\n ┋❀ Ninguem te quer aqui\n ┗━━━━━━━━━━━━━━━┅ ⳹\n> ${dev}`;
      await conn.sendMessage(
        m.chat,
        { image: img, caption: bye, mentions: [who] },
        { quoted: estilo }
      );
    }
  }

  return true;
}

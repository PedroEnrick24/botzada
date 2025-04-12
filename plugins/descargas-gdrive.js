import fg from "api-dylux";

const mssg = {
  noLink: (service) => `${emoji} Por favor, forneça um link de ${service}.`,
  usage: (command, prefix) =>
    `🍭 Por favor, envie um link do Gdrive para baixar o arquivo.\n> Exemplo: #gdrive https://drive.google.com/file/d/1565tW24QSG4Yla4tDE5AwQqEQIPqNLgw/view?usp=drivesdk`,
  name: "Nombre del archivo",
  size: "Tamanho do arquivo",
  limitdl: "Limite de download",
  limitdlTe: "Você tem",
  Erro: "✘ Ocorreu um erro ao processar sua solicitação.",
};

let free = 100;
let prem = 500;

let handler = async (
  m,
  { conn, args, usedPrefix, command, isOwner, isPrems }
) => {
  if (!args[0]) {
    return conn.reply(m.chat, mssg.usage(command, usedPrefix), null, {
      quoted: m,
    });
  }

  m.react(rwait);

  try {
    let res = await fg.GDriveDl(args[0]);

    let limit = isPrems || isOwner ? prem : free;
    let isLimit = limit * 1024 < res.fileSizeB;

    await m.reply(`
≡  *Downloads do Google Drive*

*✿ ${mssg.name}:* ${res.fileName}
*✎ ${mssg.size}:* ${res.fileSize}
${isLimit ? `\n✧ ${mssg.limitdl} *+${free} MB* ${mssg.limitdlTe} *${prem} MB*` : ""}
        `);

    if (!isLimit) {
      conn.sendMessage(
        m.chat,
        {
          document: { url: res.downloadUrl },
          fileName: res.fileName,
          mimetype: res.mimetype,
        },
        { quoted: m }
      );
    }
    m.react(done);
  } catch (error) {
    console.error(error);
    m.reply(mssg.error);
  }
};

handler.help = ["gdrive"];
handler.tags = ["descargas"];
handler.command = ["gdrive", "drive"];
handler.group = true;
handler.register = true;
handler.estrellas = 6;

export default handler;

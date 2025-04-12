import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      `🍭 Digite o ID de um usuário do Free Fire que você quer stalkear`,
      m
    );

  try {
    let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);
    let json = api.data;
    if (!json.status)
      return conn.reply(m.chat, "Não foram encontrados resultados", m);

    let { account, pet_info, guild, ketua_guild } = json.data;
    let {
      id,
      name,
      level,
      xp,
      region,
      like,
      bio,
      create_time,
      last_login,
      honor_score,
      booyah_pass,
      booyah_pass_badge,
      evo_access_badge,
      equipped_title,
      BR_points,
      CS_points,
    } = account;

    let { name: petName, level: petLevel, xp: petXP } = pet_info;

    let { name: guildName, level: guildLevel, member, capacity } = guild;

    let txt = `[ INFO - USUÁRIO ]

Usuário: ${name}

Nível: ${level}

XP: ${xp}

Região: ${region}

Curtidas: ${like}

Bio: ${bio || "Não disponível"}

Data de Criação: ${create_time}

Último Login: ${last_login}

Pontuação de Honra: ${honor_score}

Booyah Pass: ${booyah_pass}

Pontos BR: ${BR_points}

Pontos CS: ${CS_points}

[ INFO - MASCOTE ]

Nome: ${petName}

Nível: ${petLevel}

XP: ${petXP}

[ INFO - CLÃ ]

Nome do clã: ${guildName}

Nível do clã: ${guildLevel}

Membros: ${member} / ${capacity} membros
`;

    let {
      name: leaderName,
      level: leaderLevel,
      xp: leaderXP,
      BR_points: leaderBR,
      CS_points: leaderCS,
      like: leaderLike,
    } = ketua_guild;
    txt += `[ INFO - LÍDER DO CLÃ ]

Nome: ${leaderName}

Nível: ${leaderLevel}

XP: ${leaderXP}

Pontos BR: ${leaderBR}

Pontos CS: ${leaderCS}

Curtidas: ${leaderLike}

Data de Criação: ${ketua_guild.create_time}

Último Login: ${ketua_guild.last_login}`;

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
  } catch (error) {
    console.error(error);
  }
};

handler.command = ["freefirestalk", "ffstalk"];

export default handler;

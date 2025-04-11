import { watchFile, unwatchFile } from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import fs from "fs";
import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
import moment from "moment-timezone";

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
// Staff De CrowBot
global.owner = [["5555997095964", "Pedro", true]];

global.creadorbot = [["5555997095964", "Pedro", true]];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = ["5555997095964"];

global.prems = ["573215751237"];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = "【✧】𝐂𝐫𝐨𝐰𝐁𝐨𝐭 - 𝐌.𝐅 ❖";
global.botname = "(✦◠‿◠)𝑪𝒓𝒐𝒘𝑩𝒐𝒕-𝑴𝑭";
global.wm = "⏤͟͟͞͞⋆⬪࣪ꥈ🍨★ ׄ ꒱ 𝑪𝒓𝒐𝒘𝑩𝒐𝒕 - 𝑴.𝑭 ୭";
global.author = "(⁎˃ᴗ˂⁎)𝐌𝐚𝐝𝐞 𝐁𝐲 𝐖𝐢𝐥𝐥𝐙𝐞𝐤𓆪";
global.dev = "© ⍴᥆ᥕᥱrᥱძ ᑲᥡ m᥆᥆ᥒ-𝖿᥆rᥴᥱ";
global.espera = "✰ 𝐄𝐬𝐩𝐞𝐫𝐚 𝐔𝐧 𝐌𝐨𝐦𝐞𝐧𝐭𝐨, 𝐄𝐬𝐭𝐚𝐦𝐨𝐬 𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐒𝐮 𝐏𝐞𝐝𝐢𝐝𝐨 (✿◠‿◠)";
global.namebot = "ᥴr᥆ᥕᑲ᥆𝗍 s𝗍";
global.textbot = `「 🔱 𝐂𝐫𝐨𝐰𝐁𝐨𝐭 - 𝐌𝐅 🔱 」`;
global.vs = "2.2.0";
global.publi = "✰𝐒𝐢𝐠𝐮𝐞 𝐄𝐥 𝐂𝐚𝐧𝐚𝐥👇";

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.imagen1 = fs.readFileSync("./media/menus/Menu.jpg");
global.imagen2 = fs.readFileSync("./media/menus/Menu2.jpg");
global.imagen3 = fs.readFileSync("./media/menus/Menu3.jpg");
global.welcome = fs.readFileSync("./media/welcome.jpg");
global.adios = fs.readFileSync("./media/adios.jpg");
global.catalogo = fs.readFileSync("./media/catalogo.jpg");

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
global.repobot = "https://github.com/WillZek/CrowBot-ST";
global.grupo = "https://chat.whatsapp.com/B7POPrlJiZf7UWHJKvzVkx";
global.gteam = "https://chat.whatsapp.com/EpkR7XS0hrMDYk89yw57HZ";
global.gsupport = "https://chat.whatsapp.com/K5GLB5CXp3iAl4XsDzav1W";
global.comu = "https://chat.whatsapp.com/Bgfb6Ag13BDCvwzOtldlCm";
global.channel = "https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W";
global.insta = "https://www.instagram.com/crowbot-wa";
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    ...(false ? { remoteJid: "543876577197-120363317332020195@g.us" } : {}),
  },
  message: {
    orderMessage: {
      itemCount: -999999,
      status: 1,
      surface: 1,
      message: "👑【✫𝚃𝙴𝙰𝙼  乂 𝚂𝚃𝙰𝚁𝙲𝙾𝚁𝙴✫】🎩",
      orderTitle: "Bang",
      thumbnail: catalogo,
      sellerJid: "0@s.whatsapp.net",
    },
  },
};

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69;

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});

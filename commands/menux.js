// === menux.js ===
const { cmd, commands } = require('../command');

// CONFIG LOCAL (pas besoin de config.js)
const PREFIX = ".";
const MODE = "public";
const VERSION = "1.0.0";

// Conversion en petits caractères stylés
const smallCaps = {
  "A": "ᴀ","B": "ʙ","C": "ᴄ","D": "ᴅ","E": "ᴇ","F": "ꜰ","G": "ɢ","H": "ʜ","I": "ɪ",
  "J": "ᴊ","K": "ᴋ","L": "ʟ","M": "ᴍ","N": "ɴ","O": "ᴏ","P": "ᴘ","Q": "ǫ","R": "ʀ",
  "S": "s","T": "ᴛ","U": "ᴜ","V": "ᴠ","W": "ᴡ","X": "x","Y": "ʏ","Z": "ᴢ"
};

const toSmallCaps = txt =>
  txt.split('').map(c => smallCaps[c.toUpperCase()] || c).join('');

// Date locale sans dépendances
function getLocalDate() {
  const months = [
    "Janvier","Février","Mars","Avril","Mai","Juin",
    "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
  ];
  const days = [
    "Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

// Uptime interne
function formatUptime() {
  let sec = process.uptime();
  let h = Math.floor(sec / 3600);
  let m = Math.floor((sec % 3600) / 60);
  let s = Math.floor(sec % 60);
  return `${h}h ${m}m ${s}s`;
}

module.exports = {
  pattern: "menux",
  alias: ["allmenu", "prince"],
  category: "menu",
  react: "📂",
  desc: "Show all bot commands",
  filename: __filename,
  use: ".menux",

  execute: async (conn, message, m, { from, reply }) => {
    try {
      const totalCommands = commands.length;

      // TEXTE DU MENU
      let menuText = `*╭──*『 ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ 』
*│* ❃ *ᴜsᴇʀ* : @${m.sender.split("@")[0]}
*│* ❃ *ᴅᴀᴛᴇ* : ${getLocalDate()}
*│* ❃ *ʀᴜɴᴛɪᴍᴇ* : ${formatUptime()}
*│* ❃ *ᴍᴏᴅᴇ* : ${MODE}
*│* ❃ *ᴘʀᴇғɪx* : [${PREFIX}]
*│* ❃ *ᴘʟᴜɢɪɴ* : ${totalCommands}
*│* ❃ *ᴅᴇᴠ* : \`ʜᴇɪɴᴢ ʙᴏʏ\`
*│* ❃ *ᴠᴇʀsɪᴏɴ* : ${VERSION}
*╰────────────────❍*
`;

      // Liste par catégories
      let category = {};
      for (let c of commands) {
        if (!c.category) continue;
        if (!category[c.category]) category[c.category] = [];
        category[c.category].push(c);
      }

      const keys = Object.keys(category).sort();
      for (let k of keys) {
        menuText += `\n*╭─ 「 \`${k.toUpperCase()}\` 」*`;
        const cmds = category[k]
          .filter(c => c.pattern)
          .sort((a, b) => a.pattern.localeCompare(b.pattern));

        cmds.forEach(cmd => {
          const usage = cmd.pattern.split("|")[0];
          menuText += `\n*│• ${PREFIX}${toSmallCaps(usage)}*`;
        });

        menuText += `\n*╰──────────────⭑─➤*`;
      }

      // Informations contextuelles WhatsApp
      const contextInfo = {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363405561092197@newsletter',
          newsletterName: 'ʜᴇɪɴᴢ ᴍɪɴɪ ʙᴏᴛ',
          serverMessageId: 143
        }
      };

      // ENVOI DU MENU
      await conn.sendMessage(
        from,
        {
          image: { url: 'https://files.catbox.moe/y0ra0d.jpg' },
          caption: menuText,
          contextInfo
        },
        { quoted: m }
      );

      // AUDIO OPTIONNEL
      try {
        await new Promise(r => setTimeout(r, 1200));
        await conn.sendMessage(
          from,
          {
            audio: { url: 'https://files.catbox.moe/75xm5n.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
          },
          { quoted: m }
        );
      } catch (err) {
        console.log("Audio error:", err);
      }

    } catch (e) {
      console.error("Menu error:", e);
      reply(`❌ Error: ${e.message}`);
    }
  }
};

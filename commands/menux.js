// === menux.js ===
const heinz = require('../heinz');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');

const smallCaps = {
  "A": "ᴀ","B": "ʙ","C": "ᴄ","D": "ᴅ","E": "ᴇ","F": "ꜰ","G": "ɢ","H": "ʜ","I": "ɪ",
  "J": "ᴊ","K": "ᴋ","L": "ʟ","M": "ᴍ","N": "ɴ","O": "ᴏ","P": "ᴘ","Q": "ǫ","R": "ʀ",
  "S": "s","T": "ᴛ","U": "ᴜ","V": "ᴠ","W": "ᴡ","X": "x","Y": "ʏ","Z": "ᴢ"
};

const toSmallCaps = text => text.split('').map(c => smallCaps[c.toUpperCase()] || c).join('');

module.exports = {
  pattern: "menux",
  alias: ["allmenu", "prince"],
  desc: "Show all bot commands",
  category: "menu",
  react: "📂",
  filename: __filename,
  use: ".menux",

  execute: async (conn, message, m, { from, reply }) => {
    try {
      const totalCommands = commands.length;
      const date = moment().tz("America/Port-au-Prince").format("dddd, DD MMMM YYYY");

      const uptime = () => {
        let sec = process.uptime();
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec % 3600) / 60);
        let s = Math.floor(sec % 60);
        return `${h}h ${m}m ${s}s`;
      };

      let menuText = `*╭──*『 ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ  』
*│* ❃ *ᴜsᴇʀ* : @${m.sender.split("@")[0]}
*│* ❃ *ʀᴜɴᴛɪᴍᴇ* : ${uptime()}
*│* ❃ *ᴍᴏᴅᴇ* : ${config.MODE}
*│* ❃ *ᴘʀᴇғɪx* : [${config.PREFIX}]
*│* ❃ *ᴩʟᴜɢɪɴ* : ${totalCommands}
*│* ❃ *ᴅᴇᴠ* : *\` ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ\`*
*│* ❃ *ᴠᴇʀsɪᴏɴ* : 1.0.0
*╰────────────────❍*
`;

      let category = {};
      for (let cmd of commands) {
        if (!cmd.category) continue;
        if (!category[cmd.category]) category[cmd.category] = [];
        category[cmd.category].push(cmd);
      }

      const keys = Object.keys(category).sort();
      for (let k of keys) {
        menuText += `\n*╭─ 「 \`${k.toUpperCase()}\`* 」`;
        const cmds = category[k].filter(c => c.pattern).sort((a,b)=>a.pattern.localeCompare(b.pattern));
        cmds.forEach(cmd => {
          const usage = cmd.pattern.split('|')[0];
          menuText += `\n*│• ${config.PREFIX}${toSmallCaps(usage)}*`;
        });
        menuText += `\n*╰──────────────⭑─➤*`;
      }

      const contextInfo = {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363405561092197@newsletter',
          newsletterName: 'ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ',
          serverMessageId: 143
        }
      };

      // Send menu image with caption
      await conn.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/y0ra0d.jpg' },
        caption: menuText,
        contextInfo
      }, { quoted: m });

      // Optional: Send menu audio
      try {
        await new Promise(r => setTimeout(r, 1000));
        await conn.sendMessage(from, {
          audio: { url: 'https://files.catbox.moe/75xm5n.mp3' },
          mimetype: 'audio/mp4',
          ptt: true
        }, { quoted: m });
      } catch (e) {
        console.log('Audio send failed:', e);
      }

    } catch (e) {
      console.error("Menu command error:", e);
      reply(`❌ Error: ${e.message}`);
    }
  }
};

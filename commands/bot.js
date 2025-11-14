// === bot.js ===
const { runtime } = require('../lib/functions');

module.exports = {
  pattern: "bot",
  alias: ["h", "botinfo", "status"],
  desc: "Show bot status and uptime information",
  category: "🤖 ʙᴏᴛ ɪɴꜰᴏ",
  react: "🤖",
  filename: __filename,
  use: ".bot",

  execute: async (conn, message, m, { from, reply, sender }) => {
    try {
      // Reaction
      await conn.sendMessage(from, {
        react: { text: "🤖", key: message.key }
      });

      const uptime = runtime(process.uptime());

      const about = 
`╭─ 「 *\`ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅׅׅ֬ ʙᴏׅׅᴛׁׅ \`* 」
│꙳ *ʙᴏᴛ ɴᴀᴍᴇ* ↔ ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ 
│꙳ *sᴛᴀᴛᴜs* ↔ ᴏɴʟɪɴᴇ
│꙳ *ᴀᴜᴛᴏ-ʀᴇsᴛᴀʀᴛ* ↔ ᴀᴄᴛɪᴠᴇ
│꙳ *ʀᴜɴᴛɪᴍᴇ* ↔ ${uptime}
│꙳ *ᴅᴇᴠɪᴄᴇ* ↔ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ
╰────────────────❍
> *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮*`;

      await conn.sendMessage(
        from,
        {
          image: { url: "https://files.catbox.moe/y0ra0d.jpg" },
          caption: about,
          contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363405561092197@newsletter",
              newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
              serverMessageId: 143
            }
          }
        },
        { quoted: message }
      );

    } catch (err) {
      console.error("Bot command error:", err);

      // Reaction erreur
      await conn.sendMessage(from, {
        react: { text: "❌", key: message.key }
      });

      return reply("❌ Error: " + err.message);
    }
  }
};

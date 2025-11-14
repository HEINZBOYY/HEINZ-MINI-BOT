// === dev2.js === (Optional - more technical version)
module.exports = {
  pattern: "dev",
  desc: "Show detailed developer and bot technical info",
  category: "general", 
  react: "⚙️",
  filename: __filename,
  use: ".dev",

  execute: async (conn, message, m, { from, reply, sender }) => {
    try {
      await conn.sendMessage(from, {
        react: { text: "⚙️", key: message.key }
      });

      // Get bot uptime
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      // System info
      const os = require('os');
      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
      const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
      
      const techInfo = `
╭───「 ⚙️ ᴛׅꫀᴇׅܻ݊ᴄׁ֒ʜׁׅ֮݊ɴɪׁׁׅׅׅᴄׁ֒ᴀׁׅʟׁׅ֪ ɪׁׁׅׅׅ݊ɴғᴏׅׅ 」
│
│ 🤖 *ʙᴏᴛ ᴅᴇᴛᴀɪʟs:*
│ ├─ ɴᴀᴍᴇ: ʜᴇɪɴᴢ ᴍɪɴɪ ʙᴏʏ
│ ├─ ᴅᴇᴠᴇʟᴏᴘᴇʀ: ʜᴇɪɴᴢ ʙᴏʏ
│ ├─ ᴠᴇʀsɪᴏɴ: 1.0.0
│ ├─ ʟɪʙʀᴀʀʏ: ʙᴀɪʟᴇʏs ᴍᴅ
│ ├─ ᴘʟᴀᴛғᴏʀᴍ: ɴᴏᴅᴇ.ᴊs ${process.version}
│ └─ ᴜᴘᴛɪᴍᴇ: ${hours}ʜ ${minutes}ᴍ ${seconds}s
│
│ 💻 *sʏsᴛᴇᴍ ɪɴғᴏ:*
│ ├─ ᴏs: ${os.type()} ${os.release()}
│ ├─ ᴀʀᴄʜɪᴛᴇᴄᴛᴜʀᴇ: ${os.arch()}
│ ├─ ᴄᴘᴜ: ${os.cpus()[0].model}
│ ├─ ᴍᴇᴍᴏʀʏ: ${freeMem}ɢʙ / ${totalMem}ɢʙ
│ └─ ᴄᴘᴜ ᴄᴏʀᴇs: ${os.cpus().length}
│
│ 📊 *ʙᴏᴛ sᴛᴀᴛs:*
│ ├─ ᴄᴏᴍᴍᴀɴᴅs: 50+
│ ├─ ɢʀᴏᴜᴘs: ᴀᴄᴛɪᴠᴇ
│ ├─ ᴜsᴇʀs: sᴇʀᴠɪɴɢ
│ ├─ sᴘᴇᴇᴅ: ɪɴsᴛᴀɴᴛ
│ └─ sᴛᴀᴛᴜs: ✅ ᴏɴʟɪɴᴇ
│
│ 🔧 *ᴛᴇᴄʜɴᴏʟᴏɢɪᴇs:*
│ ├─ ᴡʜᴀᴛsᴀᴘᴘ ᴡᴇʙ ᴘʀᴏᴛᴏᴄᴏʟ
│ ├─ ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ sᴜᴘᴘᴏʀᴛ
│ ├─ ᴍᴏɴɢᴏᴅʙ ᴅᴀᴛᴀʙᴀsᴇ
│ ├─ ʀᴇᴅɪs ᴄᴀᴄʜᴇ
│ └─ ᴇxᴘʀᴇss sᴇʀᴠᴇʀ
│
│ 📞 *ᴄᴏɴᴛᴀᴄᴛ ᴅᴇᴠᴇʟᴏᴘᴇʀ:*
│ ├─ ᴡʜᴀᴛsᴀᴘᴘ: +529711221986
│ ├─ɢɪᴛʜᴜʙ: ʜᴇɪɴᴢ-ʙᴏʏ
│ ╰──────────────
╰───────•••────────❅
      `.trim();

      const devPp = "https://files.catbox.moe/y0ra0d.jpg";

      await conn.sendMessage(from, {
        image: { url: devPp },
        caption: techInfo,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
            serverMessageId: 302
          }
        }
      }, { quoted: message });

    } catch (e) {
      console.error("Dev2 command error:", e);
      
      await conn.sendMessage(from, {
        react: { text: "❌", key: message.key }
      });

      await conn.sendMessage(from, {
        text: "❌ Failed to load developer information.",
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ", 
            serverMessageId: 303
          }
        }
      }, { quoted: message });
    }
  }
};

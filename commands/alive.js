module.exports = {
  pattern: "alive",
  desc: "Check if bot is online",
  category: "🦄 ʜᴇɪɴᴢ ɢᴇɴᴇʀᴀʟ",
  use: ".alive",
  filename: __filename,

  execute: async (conn, message, m, { from, reply, sender }) => {
    try {
      // Bot PP
      let botPp;
      try {
        botPp = await conn.profilePictureUrl(conn.user.id, "image");
      } catch {
        botPp = "https://files.catbox.moe/y0ra0d.jpg";
      }

      // System & uptime
      const os = require("os");
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
      const usedMem = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1);

      const senderTag = "@" + sender.split("@")[0];
      const date = new Date().toLocaleString("fr-FR", { hour12: false });

      // Alive message
      const caption = `
╭───「 ׅsʏׅׅ֮sᴛׁׅᴇׁׅܻ݊ᴍׅ֪݊ ׅsᴛׁׅᴀׁׅᴛׁׅᴜׁׅᴛׅׅs 」
│ ʙᴏᴛ : *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ *
│ ᴜᴘᴛɪᴍᴇ : *${days}ᴅ ${hours}ʜ ${minutes}ᴍ ${seconds}s*
│ ᴜsᴇʀ : ${senderTag}
│ ᴅᴀᴛᴇ : *${date}*
╰────────•••────────❆ 

◉ sʏsᴛᴇᴍ: *${os.type()} ${os.release()}*
◉ ᴄᴘᴜ: *${os.cpus().length} ᴄᴏʀᴇs*
◉ ʀᴀᴍ: *${usedMem}ɢʙ / ${totalMem}ɢʙ*

◉ sᴛᴀᴛᴜs: ✅ ᴏɴʟɪɴᴇ & ᴏᴘᴇʀᴀᴛɪᴏɴᴀʟ
`.trim();

      await conn.sendMessage(from, {
        image: { url: botPp },
        caption,
        mentions: [sender]
      }, { quoted: message });

    } catch (error) {
      console.error("Alive error:", error);
      reply("❌ ᴜɴᴀʙʟᴇ ᴛᴏ ᴅɪsᴘʟᴀʏ sʏsᴛᴇᴍ sᴛᴀᴛᴜs.");
    }
  }
};

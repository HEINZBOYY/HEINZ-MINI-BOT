const axios = require("axios");

module.exports = {
  pattern: "tiktok",
  desc: "Download TikTok video without watermark",
  react: "🧑‍💻",
  category: "📥 ʜᴇɪɴᴢ ᴅᴏᴡɴʟᴏᴀᴅ",
  filename: __filename,
  use: ".tiktok <link>",

  execute: async (conn, mek, m, { from, reply, q }) => {
    // Helper function to send messages with contextInfo
    const sendMessageWithContext = async (text, quoted = mek) => {
      return await conn.sendMessage(from, {
        text: text,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
            serverMessageId: 200
          }
        }
      }, { quoted: quoted });
    };

    try {
      if (!q) return await sendMessageWithContext("⚠️ Please provide a TikTok link.");
      if (!q.includes("tiktok.com")) return await sendMessageWithContext("❌ Invalid TikTok link.");

      // React first
      if (module.exports.react) {
        await conn.sendMessage(from, { react: { text: module.exports.react, key: mek.key } });
      }

      // Inform user
      await sendMessageWithContext("⏳ Downloading TikTok video, please wait...");

      // Fetch video from API
      const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
      const { data } = await axios.get(apiUrl);

      if (!data.status || !data.data) return await sendMessageWithContext("❌ Failed to fetch TikTok video.");

      const { title, like, comment, share, author, meta } = data.data;
      const videoUrl = meta.media.find(v => v.type === "video")?.org;

      if (!videoUrl) return await sendMessageWithContext("❌ No video found in the TikTok.");

      const caption =
        `🎵 *ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ* 🎵\n\n` +
        `👤 *ᴜsᴇʀ:* ${author.nickname} (@${author.username})\n` +
        `📖 *ᴛɪᴛʟᴇ:* ${title}\n` +
        `👍 *ʟɪᴋᴇs:* ${like}\n💬 *ᴄᴏᴍᴍᴇɴᴛs:* ${comment}\n🔁 *sʜᴀʀᴇs:* ${share}\n\n` +
        `> *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮*`;

      await conn.sendMessage(from, {
        video: { url: videoUrl },
        caption: caption,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
            serverMessageId: 200
          }
        }
      }, { quoted: mek });

    } catch (error) {
      console.error("❌ TikTok Downloader Error:", error);
      await sendMessageWithContext(`⚠️ Error downloading TikTok video:\n${error.message}`);
    }
  }
};
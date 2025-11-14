// === aura.js ===
module.exports = {
  pattern: "aura",
  desc: "Calculate aura score of a user.",
  category: "🥳 ʜᴇɪɴᴢ ғᴜɴ",
  react: "💀",
  filename: __filename,
  use: ".aura @user OR reply to a user",

  execute: async (conn, message, m, { from, isGroup, reply }) => {
    try {
      if (!isGroup) return reply("❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.");

      // Find target: mention > reply
      let target = null;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
      } else if (m.quoted) {
        target = m.quoted.sender;
      } else {
        target = m.sender;
      }

      if (!target) return reply("❌ ᴍᴇɴᴛɪᴏɴ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴜsᴇʀ ᴛᴏ ᴄᴀʟᴄᴜʟᴀᴛᴇ ᴀᴜʀᴀ.");

      // Generate random aura score
      const auraScore = Math.floor(Math.random() * 1000) + 1;

      // Aura descriptions
      const auraDescriptions = [
        { range: [1, 200], text: "⚫ Dark and chaotic… stay away! 👀" },
        { range: [201, 400], text: "🌫️ Cloudy and mysterious… can’t be trusted fully. 🤔" },
        { range: [401, 600], text: "🌊 Calm and balanced… peaceful vibes all around. 🕊️" },
        { range: [601, 800], text: "🔥 Fiery and powerful… you light up the room! ⚡" },
        { range: [801, 1000], text: "🌟 Divine and legendary… truly one of a kind! 👑" }
      ];

      const auraText =
        auraDescriptions.find(d => auraScore >= d.range[0] && auraScore <= d.range[1])?.text ||
        "✨ Undefined energy… mysterious soul.";

      // Send aura result
      await conn.sendMessage(from, {
        text: `💀 Aura of @${target.split("@")[0]}: *${auraScore}/1000*\n\n${auraText}`,
        mentions: [target]
      }, { quoted: message });

      // React
      if (module.exports.react) {
        await conn.sendMessage(from, { react: { text: module.exports.react, key: message.key } });
      }

    } catch (e) {
      console.error("Aura error:", e);
      await conn.sendMessage(from, { react: { text: "❌", key: message.key } });
      reply("⚠️ Failed to calculate aura.");
    }
  }
};

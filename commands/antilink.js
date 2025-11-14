// === antilink.js ===
module.exports = {
  pattern: "antilink",
  desc: "Toggle anti-link protection (Group Only)",
  category: "👨🏻‍💼 ʜᴇɪɴᴢ ɢʀᴏᴜᴘ",
  react: "🔗",
  use: ".antilink on/off",
  filename: __filename,

  execute: async (conn, message, m, { q, reply, from, isGroup }) => {
    try {

      // --- Group Only Check ---
      if (!isGroup) return reply("❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.");

      // --- Toggle logic ---
      if (!q) {
        return reply(
          `⚙️ ᴜsᴀɢᴇ: \`.ᴀɴᴛɪʟɪɴᴋ ᴏɴ\` ᴏʀ \`.ᴀɴᴛɪʟɪɴᴋ ᴏғғ\`\n\n📡 ᴄᴜʀʀᴇɴᴛ sᴛᴀᴛᴜs: *${process.env.ANTILINK_ENABLED === "true" ? "ON ✅" : "OFF ❌"}*`
        );
      }

      if (q.toLowerCase() === "on") {
        process.env.ANTILINK_ENABLED = "true";
        await conn.sendMessage(from, { react: { text: "🔗", key: message.key } });
        return reply("✅ ᴀɴᴛɪ-ʟɪɴᴋ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ ᴇɴᴀʙʟᴇᴅ.\n\n📡 sᴛᴀᴛᴜs: *ᴏɴ*");
      } 
      
      else if (q.toLowerCase() === "off") {
        process.env.ANTILINK_ENABLED = "false";
        await conn.sendMessage(from, { react: { text: "🔗", key: message.key } });
        return reply("❌ ᴀɴᴛɪ-ʟɪɴᴋ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ ᴅɪsᴀʙʟᴇᴅ.\n\n📡 sᴛᴀᴛᴜs: *ᴏғғ*");
      } 
      
      else {
        return reply(
          `⚙️ ᴜsᴀɢᴇ: \`.ᴀɴᴛɪʟɪɴᴋ ᴏɴ\` ᴏʀ \`.ᴀɴᴛɪʟɪɴᴋ ᴏғғ\`\n\n📡 ᴄᴜʀʀᴇɴᴛ sᴛᴀᴛᴜs: *${process.env.ANTILINK_ENABLED === "true" ? "ON ✅" : "OFF ❌"}*`
        );
      }

    } catch (e) {
      console.error("Antilink command error:", e);
      await conn.sendMessage(from, { react: { text: "❌", key: message.key } });
      reply("⚠️ ғᴀɪʟᴇᴅ ᴛᴏ ᴛᴏɢɢʟᴇ ᴀɴᴛɪ-ʟɪɴᴋ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ.");
    }
  }
};

// === welcome.js ===
module.exports = {
  pattern: "welcome",
  desc: "Toggle welcome messages (Group Only)",
  category: "👨🏻‍💼 ʜᴇɪɴᴢ ɢʀᴏᴜᴘ",
  react: "🎒",
  use: ".welcome on/off",
  filename: __filename,

  execute: async (conn, message, m, { q, reply, from, isGroup }) => {
    try {

      // --- Group Only Check ---
      if (!isGroup) return reply("❌ This command can only be used in groups.");

      // --- Toggle logic ---
      if (!q) {
        return reply(
          `⚙️ ᴜsᴀɢᴇ: \`.ᴡᴇʟᴄᴏᴍᴇ ᴏɴ\` ᴏʀ \`.ᴡᴇʟᴄᴏᴍᴇ ᴏғғ\`\n\n📡 ᴄᴜʀʀᴇɴᴛ sᴛᴀᴛᴜs: *${process.env.WELCOME_ENABLED === "true" ? "ON ✅" : "OFF ❌"}*`
        );
      }

      if (q.toLowerCase() === "on") {
        process.env.WELCOME_ENABLED = "true";
        await conn.sendMessage(from, { react: { text: "🎒", key: message.key } });
        return reply("✅ ᴡᴇʟᴄᴏᴍᴇ ᴍᴇssᴀɢᴇs ᴇɴᴀʙʟᴇᴅ.\n\n📡 sᴛᴀᴛᴜs: *ᴏɴ*");
      } 
      
      else if (q.toLowerCase() === "off") {
        process.env.WELCOME_ENABLED = "false";
        await conn.sendMessage(from, { react: { text: "🎒", key: message.key } });
        return reply("❌ ᴡᴇʟᴄᴏᴍᴇ ᴍᴇssᴀɢᴇs ᴅɪsᴀʙʟᴇᴅ.\n\n📡 sᴛᴀᴛᴜs: *ᴏғғ*");
      } 

      else {
        return reply(
          `⚙️ ᴜsᴀɢᴇ: \`.ᴡᴇʟᴄᴏᴍᴇ ᴏɴ\` ᴏʀ \`.ᴡᴇʟᴄᴏᴍᴇ ᴏғғ\`\n\n📡 ᴄᴜʀʀᴇɴᴛ sᴛᴀᴛᴜs: *${process.env.WELCOME_ENABLED === "true" ? "ON ✅" : "OFF ❌"}*`
        );
      }

    } catch (e) {
      console.error("Welcome command error:", e);
      await conn.sendMessage(from, { react: { text: "❌", key: message.key } });
      reply("⚠️ Failed to toggle welcome messages.");
    }
  }
};

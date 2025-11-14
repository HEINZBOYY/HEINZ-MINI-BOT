// === demote.js ===
module.exports = {
  pattern: "demote",
  desc: "Demote an admin to member (Admin/Owner Only)",
  category: "👨🏻‍💼 ʜᴇɪɴᴢ ɢʀᴏᴜᴘ",
  react: "⬇️",
  filename: __filename,
  use: ".demote @user OR reply to a user",

  execute: async (conn, message, m, { from, isGroup, reply, sender }) => {
    try {
      if (!isGroup) return reply("❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs.");

      let metadata;
      try {
        metadata = await conn.groupMetadata(from);
      } catch {
        return reply("❌ ғᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ɢʀᴏᴜᴘ ɪɴғᴏ.");
      }

      const participant = metadata.participants.find(p => p.id === sender);
      const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
      const isOwner = conn.user.id.split(":")[0] === sender.split("@")[0];
      if (!isAdmin && !isOwner) return reply("❌ ᴏɴʟʏ ᴀᴅᴍɪɴs ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ.");

      // Find target: mention > reply
      let target = null;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
      } else if (m.quoted) {
        target = m.quoted.sender;
      }

      if (!target) return reply("❌ ᴍᴇɴᴛɪᴏɴ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴜsᴇʀ ᴛᴏ ᴅᴇᴍᴏᴛᴇ.");

      await conn.groupParticipantsUpdate(from, [target], "demote");
      await conn.sendMessage(from, { react: { text: "✅", key: message.key } });
      await conn.sendMessage(from, {
        text: `⬇️ ᴅᴇᴍᴏᴛᴇᴅ @${target.split("@")[0]} ғʀᴏᴍ ᴀᴅᴍɪɴ`,
        mentions: [target]
      }, { quoted: message });

    } catch (e) {
      console.error("Demote error:", e);
      await conn.sendMessage(from, { react: { text: "❌", key: message.key } });
      reply("⚠️ ғᴀɪʟᴇᴅ ᴛᴏ ᴅᴇᴍᴏᴛᴇ ᴜsᴇʀ.");
    }
  }
};

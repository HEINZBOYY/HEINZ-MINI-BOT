// === promote.js ===
module.exports = {
  pattern: "promote",
  desc: "Promote a user to admin (Admin/Owner Only)",
  category: "group",
  react: "👨🏿‍💼",
  filename: __filename,
  use: ".promote @user OR reply to a user",

  execute: async (conn, message, m, { from, isGroup, reply, sender }) => {
    try {
      if (!isGroup) return reply("❌ This command can only be used in groups.");

      let metadata;
      try {
        metadata = await conn.groupMetadata(from);
      } catch {
        return reply("❌ Failed to get group info.");
      }

      const participant = metadata.participants.find(p => p.id === sender);
      const isAdmin = participant?.admin === "admin" || participant?.admin === "superadmin";
      const isOwner = conn.user.id.split(":")[0] === sender.split("@")[0];
      if (!isAdmin && !isOwner) return reply("❌ Only admins can use this command.");

      let target = null;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
      } else if (m.quoted) {
        target = m.quoted.sender;
      }

      if (!target) return reply("❌ ᴍᴇɴᴛɪᴏɴ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴜsᴇʀ ᴛᴏ ᴘʀᴏᴍᴏᴛᴇ.");

      // React success
      await conn.sendMessage(from, { react: { text: "✅", key: message.key } });

      // Promote + contextInfo
      await conn.groupParticipantsUpdate(from, [target], "promote");
      await conn.sendMessage(from, {
        text: `⚡ ᴘʀᴏᴍᴏᴛᴇᴅ @${target.split("@")[0]} ᴛᴏ ᴀᴅᴍɪɴ`,
        mentions: [target],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
            serverMessageId: 200
          }
        }
      }, { quoted: message });

    } catch (e) {
      console.error("Promote error:", e);

      // React fail
      await conn.sendMessage(from, { react: { text: "❌", key: message.key } });

      // Error with contextInfo
      await conn.sendMessage(from, {
        text: "⚠️ Failed to promote user.",
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
            serverMessageId: 200
          }
        }
      }, { quoted: message });
    }
  }
};

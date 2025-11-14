// === ship.js ===
module.exports = {
  pattern: "ship",
  desc: "Pairs the command user with another group member (mention, reply, or random).",
  react: "❤️",
  category: "🥳 ʜᴇɪɴᴢ ғᴜɴ",
  filename: __filename,

  execute: async (conn, mek, m, { from, isGroup, groupMetadata, reply, sender }) => {
    try {
      if (!isGroup) {
        return reply("❌ This command can only be used in groups.");
      }

      const botNumber = conn.user.id;
      const participants = groupMetadata.participants.map(user => user.id);

      // Step 1: Check for mention or reply
      let target = null;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
      } else if (m.quoted) {
        target = m.quoted.sender;
      }

      // Step 2: If no mention/reply, choose random from participants
      if (!target) {
        const availablePairs = participants.filter(user => user !== sender && user !== botNumber);
        if (availablePairs.length === 0) {
          return reply("❌ Not enough participants to create a pair.");
        }
        target = availablePairs[Math.floor(Math.random() * availablePairs.length)];
      }

      // Step 3: Build message
      const message = `💘 *ᴍᴀᴛᴄʜ ғᴏᴜɴᴅ!* 💘
❤️ @${sender.split("@")[0]} + @${target.split("@")[0]}
💖 ᴄᴏɴɢʀᴀᴛᴜʟᴀᴛɪᴏɴs! 🎉

> *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮*`;

      // React first
      await conn.sendMessage(from, { react: { text: "❤️", key: mek.key } });

      // Send the ship message
      await conn.sendMessage(from, {
        text: message,
        mentions: [sender, target],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
            serverMessageId: 150
          }
        }
      }, { quoted: mek });

    } catch (error) {
      console.error("❌ Error in ship command:", error);
      reply("⚠️ An error occurred while processing the command. Please try again.");
    }
  }
};

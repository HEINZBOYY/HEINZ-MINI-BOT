// === getimage.js ===
module.exports = {
  pattern: "getimage",
  alias: ["sendimage", "imgurl"],
  desc: "Send an image from a direct URL.",
  category: "🪄 ʜᴇɪɴᴢ ᴄᴏɴᴠᴇʀᴛ",
  react: "🖼️",
  filename: __filename,
  use: ".getimage <image_url>",

  execute: async (conn, message, m, { from, reply, args }) => {
    try {
      // Send reaction
      await conn.sendMessage(from, {
        react: { text: "🖼️", key: message.key }
      });

      // Check if URL is provided
      if (!args[0]) {
        return reply("*❌ Please provide a valid image URL!*");
      }

      const imageUrl = args[0];

      // Send the image
      await conn.sendMessage(
        from,
        {
          image: { url: imageUrl },
          caption: "*_🖼️ Here is your image!_*",
          mimetype: "image/png",
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363405561092197@newsletter",
              newsletterName: "ʜᴇɪɴᴢ ᴍɪɴɪ ʙᴏᴛ",
              serverMessageId: 450
            }
          }
        },
        { quoted: message }
      );
    } catch (err) {
      console.error("getimage command error:", err);

      // Error reaction
      await conn.sendMessage(from, {
        react: { text: "❌", key: message.key }
      });

      reply("❌ Error fetching image: " + err.message);
    }
  }
};

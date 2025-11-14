// === vv2.js ===
module.exports = {
  pattern: "vv2",
  alias: ["🙂‍↔", "🫠", "oh", "🤤", "nice", "ok","😒","😐","🤔"],
  desc: "Owner Only - retrieve quoted message back to user",
  category: "🦄 ʜᴇɪɴᴢ ɢᴇɴᴇʀᴀʟ",
  react: "",
  filename: __filename,
  use: ".vv2 (reply to message)",

  execute: async (conn, message, m, { from, isCreator, reply }) => {
    try {
      if (!isCreator) {
        return; // Only owner can use
      }

      if (!m.quoted) {
        return reply("*🔮 Please reply to a view-once message!*");
      }

      const buffer = await m.quoted.download();
      const mtype = m.quoted.mtype;
      const options = { quoted: message };

      let messageContent = {};

      switch (mtype) {
        case "imageMessage":
          messageContent = {
            image: buffer,
            caption: m.quoted.text || '',
            mimetype: m.quoted.mimetype || "image/jpeg"
          };
          break;
        case "videoMessage":
          messageContent = {
            video: buffer,
            caption: m.quoted.text || '',
            mimetype: m.quoted.mimetype || "video/mp4"
          };
          break;
        case "audioMessage":
          messageContent = {
            audio: buffer,
            mimetype: "audio/mp4",
            ptt: m.quoted.ptt || false
          };
          break;
        default:
          return reply("❌ Only image, video, and audio messages are supported");
      }

      // Forward to user's DM
      await conn.sendMessage(message.sender, messageContent, options);

    } catch (error) {
      console.error("VV2 command error:", error);
      await reply("❌ Error fetching vv message:\n" + error.message);
    }
  }
};

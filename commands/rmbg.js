// === rmbg.js ===
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

module.exports = {
  pattern: "rmbg",
  alias: ["removebg"],
  desc: "Remove background from an image",
  category: "🪄 ʜᴇɪɴᴢ ᴄᴏɴᴠᴇʀᴛ",
  react: "📸",
  filename: __filename,
  use: ".rmbg (reply to image)",

  execute: async (conn, message, m, { from, reply }) => {
    try {
      // React first
      await conn.sendMessage(from, {
        react: { text: "📸", key: message.key },
      });

      const quoted = message.quoted ? message.quoted : message;
      const mime = (quoted.msg || quoted).mimetype || "";

      if (!mime || !mime.startsWith("image/")) {
        return reply("*⚠️ Please reply to an image (JPG/PNG)*");
      }

      // Download media
      const buffer = await quoted.download();
      const fileSize = formatBytes(buffer.length);

      let ext = "";
      if (mime.includes("jpeg")) ext = ".jpg";
      else if (mime.includes("png")) ext = ".png";
      else return reply("*⚠️ Unsupported format. Use JPG or PNG.*");

      const tempPath = path.join(os.tmpdir(), `imgscan_${Date.now()}${ext}`);
      fs.writeFileSync(tempPath, buffer);

      // Upload to Catbox
      const form = new FormData();
      form.append("fileToUpload", fs.createReadStream(tempPath), `image${ext}`);
      form.append("reqtype", "fileupload");

      const upload = await axios.post(
        "https://catbox.moe/user/api.php",
        form,
        { headers: form.getHeaders() }
      );

      const imageUrl = upload.data;
      fs.unlinkSync(tempPath);

      if (!imageUrl || !imageUrl.startsWith("https://")) {
        return reply("*❌ Failed to upload to Catbox.*");
      }

      // Remove background
      const api = `https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(
        imageUrl
      )}`;

      const res = await axios.get(api, { responseType: "arraybuffer" });
      if (!res?.data) {
        return reply("*❌ API did not return a valid image.*");
      }

      const finalImg = Buffer.from(res.data, "binary");

      await conn.sendMessage(from, {
        image: finalImg,
        caption:
          `*✅ Background removed successfully!*\n\n` +
          `📁 *File Size:* ${fileSize}\n\n` +
          `> ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴘʀɪɴᴄᴇ sɪᴅ`,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363405561092197@newsletter",
            newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׅ ʜᴇɪɴᴢ ʙᴏᴛ",
            serverMessageId: 501,
          },
        },
      });

    } catch (err) {
      console.error("RMBG Error:", err);

      await conn.sendMessage(from, {
        react: { text: "❌", key: message.key }
      });

      reply(
        `❌ *Error:* ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    }
  },
};

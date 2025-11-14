// === restart.js ===
const { sleep } = require('../lib/functions');
const { exec } = require("child_process");

module.exports = {
  pattern: "restart",
  alias: ["rebot", "reboot"],
  desc: "Restart the bot (Owner only)",
  category: "🔧 ʜᴇɪɴᴢ ᴜᴛɪʟɪᴛʏ",
  react: "♻️",
  filename: __filename,
  use: ".restart",

  execute: async (conn, message, m, { from, isOwner, reply }) => {
    try {
      // Vérification Owner
      if (!isOwner) {
        return reply("❌ *Owner command only!*");
      }

      // Reaction avant redémarrage
      await conn.sendMessage(from, {
        react: { text: "♻️", key: message.key }
      });

      // Message avant restart
      reply("*♻️ Heinz Mini Bot restarting...*");

      await sleep(1500);

      // Redémarrer avec PM2
      exec("pm2 restart all");

    } catch (err) {
      console.error("Restart command error:", err);

      await conn.sendMessage(from, {
        react: { text: "❌", key: message.key }
      });

      return reply("❌ Error: " + err.message);
    }
  }
};

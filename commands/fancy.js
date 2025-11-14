// === fancy.js ===
const fancy = require('../lib/style');

module.exports = {
  pattern: "fancy",
  alias: ["styletext", "fstyle"],
  desc: "Apply fancy text styles",
  category: "🦄 ʜᴇɪɴᴢ ɢᴇɴᴇʀᴀʟ",
  react: "☑️",
  filename: __filename,
  use: ".fancy <id> <text>",

  execute: async (conn, message, m, { from, args, prefix, reply }) => {
    try {
      // 🔵 Reaction
      await conn.sendMessage(from, {
        react: { text: "☑️", key: message.key }
      });

      const id = args[0]?.match(/\d+/)?.join('');
      const text = args.slice(1).join(" ");

      // 📌 Afficher la liste si aucun argument
      if (!args.length) {
        return reply(
          `╭─ 「 *ғᴀɴᴄʏ sᴛʏʟᴇ* 」\n` +
          `│ Example: ${prefix}fancy 10 HEINZ-BOY\n` +
          String.fromCharCode(8206).repeat(4001) +
          fancy.list("HEINZ-BOY", fancy)
        );
      }

      // 📌 Vérification si arguments incomplets
      if (!id || !text) {
        return reply(
          `Example: ${prefix}fancy 10 HEINZ-BOY\n\n` +
          String.fromCharCode(8206).repeat(4001) +
          fancy.list("HEINZ-BOY", fancy)
        );
      }

      // 📌 Vérifier si le style existe
      const selected = fancy[parseInt(id) - 1];
      if (!selected) {
        return reply("❌ _Style not found_");
      }

      // 🎨 Appliquer le style
      const styled = fancy.apply(selected, text);
      return reply(styled);

    } catch (err) {
      console.error("Fancy command error:", err);

      // ❌ Réaction erreur
      await conn.sendMessage(from, {
        react: { text: "❌", key: message.key }
      });

      return reply("❌ _An error occurred while applying the style_");
    }
  }
};

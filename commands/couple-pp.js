// === couplepp.js ===
module.exports = {
  pattern: "couplepp",
  alias: ["couple", "cpp"],
  desc: "Obtenez des images de couple masculin et féminin.",
  category: "misc",
  react: "💑",
  filename: __filename,
  use: ".couplepp",

  execute: async (conn, m, store, { from, reply }) => {
    try {
      await reply("*💑 Récupération des images de profil de couple...*");

      // Liste d'images de couple prédéfinies
      const coupleImages = [
        { male: 'https://files.catbox.moe/cak9j9.jpg', female: 'https://files.catbox.moe/58gaj4.jpg' },
        { male: 'https://files.catbox.moe/mhhj6u.jpg', female: 'https://files.catbox.moe/j1f3bp.jpg' },
        { male: 'https://files.catbox.moe/ksoo87.jpg', female: 'https://files.catbox.moe/e6tjo9.jpg' },
        { male: 'https://files.catbox.moe/za4r2m.jpg', female: 'https://files.catbox.moe/bq5gsg.jpg' },
        { male: 'https://files.catbox.moe/qkz4tf.jpg', female: 'https://files.catbox.moe/vjzafq.jpg' },
        { male: 'https://files.catbox.moe/kqzsfc.jpg', female: 'https://files.catbox.moe/64kxyi.jpg' },
        { male: 'https://files.catbox.moe/jo7193.jpg', female: 'https://files.catbox.moe/x7snju.jpg' },
        { male: 'https://files.catbox.moe/0s8f4k.jpg', female: 'https://files.catbox.moe/xlgep0.jpg' },
        { male: 'https://files.catbox.moe/iaxx2c.jpg', female: 'https://files.catbox.moe/cgkcmj.jpg' },
        { male: 'https://files.catbox.moe/3z1y8i.jpg', female: 'https://files.catbox.moe/0wo9j9.jpg' }
      ];

      // Choisir une image aléatoire
      const randomIndex = Math.floor(Math.random() * coupleImages.length);
      const { male, female } = coupleImages[randomIndex];

      // Envoyer image masculine
      if (male) {
        await conn.sendMessage(from, {
          image: { url: male },
          caption: "*👨 Image de profil du couple masculin*\n\n> **ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮**"
        }, { quoted: m });
      }

      // Envoyer image féminine
      if (female) {
        await conn.sendMessage(from, {
          image: { url: female },
          caption: "*👩 Image de profil du couple féminin*\n\n> *Couple PP by Prince SID*"
        }, { quoted: m });
      }

    } catch (error) {
      console.error("CouplePP command error:", error);
      reply("*❌ Une erreur s'est produite lors de la récupération des images de couple.*");
    }
  }
};

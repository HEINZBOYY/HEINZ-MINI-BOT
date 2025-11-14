const axios = require("axios");

module.exports = {
    pattern: "pair",
    desc: "Connect your WhatsApp account to the bot",
    category: "🔧 ʜᴇɪɴᴢ ᴜᴛɪʟɪᴛʏ",
    use: ".pair <number>",
    filename: __filename,

    execute: async (conn, message, m, { from, q, reply }) => {
        try {
            // Step 1: Ask for phone number if missing
            if (!q) {
                return reply(`📞 *ᴇɴᴛᴇʀ ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ.*

ᴇxᴀᴍᴘʟᴇs:
• 529711221986
ᴛʜᴇɴ sᴇɴᴅ ᴀɢᴀɪɴ ʟɪᴋᴇ:
.ᴘᴀɪʀ 529711221986`);
            }

            const number = q.trim();

            // Step 2: Request pairing code from the API
            const apiURL = `https://bilal-f8489507508d.herokuapp.com/pair?number=${number}`;
            const res = await axios.get(apiURL);

            // Step 3: API returned a pairing code
            if (res.data && res.data.code) {
                const pairingCode = res.data.code;

                return reply(`
🔐 *ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ ɢᴇɴᴇʀᴀᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ!*

📌 *ʏᴏᴜʀ ᴄᴏᴅᴇ:* ${pairingCode}

ғᴏʟʟᴏᴡ ᴛʜᴇsᴇ sᴛᴇᴘs:
1. ᴏᴘᴇɴ ᴡʜᴀᴛsᴀᴘᴘ
2. sᴇᴛᴛɪɴɢs
3. ʟɪɴᴋᴇᴅ ᴅᴇᴠɪᴄᴇs
4. ʟɪɴᴋ ᴀ ᴅᴇᴠɪᴄᴇ
5. ᴇɴᴛᴇʀ ᴛʜᴇ ᴄᴏᴅᴇ ᴀʙᴏᴠᴇ

✅ *ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ᴡɪʟʟ ɴᴏᴡ ᴄᴏɴɴᴇᴄᴛ ᴛᴏ ʜᴇɪɴᴢ.*`);
            }

            // API responded but no code found
            return reply("⚠️ Unable to fetch pairing code. Please try again.");

        } catch (err) {
            console.error("PAIR COMMAND ERROR:", err);

            return reply(`❌ *Server Error*
Message: ${err.message}
Please try again later.`);
        }
    }
};

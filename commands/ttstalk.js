const axios = require("axios");

module.exports = {
    pattern: "ttstalk",
    desc: "Fetch TikTok user profile details",
    react: "📱",
    category: "search",
    filename: __filename,
    use: ".ttstalk [username]",

    execute: async (conn, message, m, { from, q, reply, sender }) => {
        // Helper function to send messages with contextInfo
        const sendMessageWithContext = async (text, quoted = message) => {
            return await conn.sendMessage(from, {
                text: text,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363405561092197@newsletter",
                        newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
                        serverMessageId: 200
                    }
                }
            }, { quoted: quoted });
        };

        try {
            if (!q) {
                return await sendMessageWithContext("❎ Please provide a TikTok username.\n\n*Example:* .ttstalk ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ");
            }

            // React 📱
            if (module.exports.react) {
                await conn.sendMessage(from, { react: { text: module.exports.react, key: message.key } });
            }

            const apiUrl = `https://api.princetechn.com/api/stalk/tiktokstalk?apikey=prince&username=${encodeURIComponent(q)}`;
            const { data } = await axios.get(apiUrl);

            if (!data.success || !data.result) {
                return await sendMessageWithContext("❌ User not found or API returned no data.");
            }

            const user = data.result;

            const profileInfo = `╭─「 *🎭 ᴛɪᴋᴛᴏᴋ ᴘʀᴏғɪʟᴇ* 」
│ 👤 *ᴜsᴇʀɴᴀᴍᴇ*: @${user.username}
│ 📛 *ɴɪᴄᴋɴᴀᴍᴇ*: ${user.name || "Unknown"}
│ ✅ *ᴠᴇʀɪғɪᴇᴅ*: ${user.verified ? "Yes ✅" : "No ❌"}
│ 🔒 *ᴘʀɪᴠᴀᴛᴇ*: ${user.private ? "Yes 🔒" : "No 🌍"}
│ 📝 *ʙɪᴏ*: ${user.bio || "No bio available."}
│
│ 📊 *sᴛᴀᴛɪsᴛɪᴄ*:
│ 👥 ғᴏʟʟᴏᴡᴇʀs: ${user.followers?.toLocaleString() || "0"}
│ 👤 ғᴏʟʟᴏᴡɪɴɢ: ${user.following?.toLocaleString() || "0"}
│ ❤️ ʟɪᴋᴇs: ${user.likes?.toLocaleString() || "0"}
│
│ 🆔 *ɪᴅ*: ${user.id || "N/A"}
│ 🔗 *ᴘʀᴏғɪʟᴇ*: https://www.tiktok.com/@${user.username}
╰───────•••───────❆
> *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮*`;

            if (user.avatar) {
                await conn.sendMessage(from, {
                    image: { url: user.avatar },
                    caption: profileInfo,
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
            } else {
                await sendMessageWithContext(profileInfo);
            }

        } catch (error) {
            console.error("❌ Error in TikTok stalk command:", error);
            await sendMessageWithContext("⚠️ An error occurred while fetching TikTok profile data.");
        }
    }
};
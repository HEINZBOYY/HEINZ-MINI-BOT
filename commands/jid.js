module.exports = {
    pattern: "jid",
    desc: "Get full JID of current chat/user/channel",
    category: "🦄 ʜᴇɪɴᴢ ɢᴇɴᴇʀᴀʟ",
    react: "🆔",
    filename: __filename,
    use: ".jid",

    execute: async (conn, message, m, { from, isGroup, reply, sender }) => {
        const sendFancyReply = async (text, quoted = message) => {
            return await conn.sendMessage(from, {
                text: text,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363405561092197@newsletter",
                        newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
                        serverMessageId: 200
                    },
                    externalAdReply: {
                        title: "🆔 JID Information",
                        body: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮",
                        thumbnailUrl: "https://files.catbox.moe/y0ra0d.jpg", // Replace with your image URL
                        sourceUrl: "https://github.com/Brenaldmedia/SUNSET",      // Replace with your repo link
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: quoted });
        };

        try {
            if (from.endsWith("@newsletter")) {
                const channelJID = from;
                await sendFancyReply(`📢 *Channel JID:*\n\`\`\`${channelJID}\`\`\``);
            } else if (isGroup) {
                const groupJID = from.includes('@g.us') ? from : `${from}@g.us`;
                await sendFancyReply(`👥 *Group JID:*\n\`\`\`${groupJID}\`\`\``);
            } else {
                const userJID = sender.includes('@s.whatsapp.net') ? sender : `${sender}@s.whatsapp.net`;
                await sendFancyReply(`👤 *User JID:*\n\`\`\`${userJID}\`\`\``);
            }
        } catch (e) {
            console.error("JID Error:", e);
            await sendFancyReply(`⚠️ Error fetching JID:\n${e.message}`);
        }
    }
};
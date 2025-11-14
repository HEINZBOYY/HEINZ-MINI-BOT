// === tagadmins.js ===
module.exports = {
    pattern: "tagadmins",
    desc: "To Tag all Admins of the Group",
    category: "👨🏻‍💼 ʜᴇɪɴᴢ ɢʀᴏᴜᴘ",
    use: '.tagadmins [message]',
    filename: __filename,

    execute: async (conn, message, m, { args, q, reply, from, isGroup, groupMetadata }) => {
        try {
            if (!isGroup) {
                return reply("❌ This command can only be used in groups.");
            }

            // Get metadata
            let metadata;
            try {
                metadata = await conn.groupMetadata(from);
            } catch (error) {
                return reply("❌ Failed to get group information.");
            }

            // Collect admins
            const admins = metadata.participants
                .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
                .map(p => p.id);
            
            const totalAdmins = admins.length;
            if (totalAdmins === 0) {
                return reply("❌ No admins found in this group.");
            }

            // Emojis
            const emojis = ['👑', '⚡', '🌟', '✨', '🎖️', '💎', '🔱', '🛡️', '🚀', '🏆'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            // Message
            const customMessage = q || "Attention Admins!";
            const groupName = metadata.subject || "Unknown Group";

            let teks = `╭─「 *ᴛׅᴀׁׅɢׁᴀׅᴅׁׅ݊ᴍׁׅ֪݊ ɪׁׁׁׅׅׅ݊ɴׅs* 」\n│◉ *Group*: ${groupName}\n`;
            teks += `│◉ *ᴀᴅᴍɪɴs*: ${totalAdmins}\n`;
            teks += `│◉ *ᴍᴇssᴀɢᴇ*: ${customMessage}\n\n`;
            teks += `│◉ *ʜᴇɪɴᴢ ʙᴏʏ*\n`;

            admins.forEach(adminId => {
                teks += `│${randomEmoji} @${adminId.split('@')[0]}\n`;
            });

            teks += "╰──❍ ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅׅ֬ ʙᴏׅׅᴛׁׅ  ❍";

            // Send with channel context
            await conn.sendMessage(from, {
                text: teks,
                mentions: admins,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363405561092197@newsletter",
                        newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
                        serverMessageId: 201
                    }
                }
            }, { quoted: message });

        } catch (error) {
            console.error("Tagadmins error:", error);
            reply(`❌ Error: ${error.message}`);
        }
    }
};

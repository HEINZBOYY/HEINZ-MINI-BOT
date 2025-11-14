// === groupevents.js ===
const { isJidGroup } = require('@whiskeysockets/baileys');

const defaultProfilePics = [
  'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
  'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
  'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

// Store violation counts per user per group
const violationCounts = new Map();

// Newsletter context (for forwarded-style look)
const getContextInfo = (mentionedJids) => ({
  mentionedJid: mentionedJids,
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363405561092197@newsletter',
    newsletterName: "ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׁׅ֬ ᴍɪׁׁׁׅׅׅ݊ɴɪׁׁׁׅׅׅ ʙᴏׅׅᴛׁׅ ",
    serverMessageId: 200,
  },
});

// Fonction Antilink
const antiLinkHandler = async (conn, m, groupId) => {
  try {
    const message = m.message;
    if (!message) return;

    // Detect links in different message types
    let detectedLink = null;

    // Check message text
    if (message.conversation && /https?:\/\/[^\s]+/gi.test(message.conversation)) {
      detectedLink = message.conversation.match(/https?:\/\/[^\s]+/gi)[0];
    }
    
    // Check extended text messages
    if (message.extendedTextMessage?.text && /https?:\/\/[^\s]+/gi.test(message.extendedTextMessage.text)) {
      detectedLink = message.extendedTextMessage.text.match(/https?:\/\/[^\s]+/gi)[0];
    }

    // Check image captions
    if (message.imageMessage?.caption && /https?:\/\/[^\s]+/gi.test(message.imageMessage.caption)) {
      detectedLink = message.imageMessage.caption.match(/https?:\/\/[^\s]+/gi)[0];
    }

    // Check video captions
    if (message.videoMessage?.caption && /https?:\/\/[^\s]+/gi.test(message.videoMessage.caption)) {
      detectedLink = message.videoMessage.caption.match(/https?:\/\/[^\s]+/gi)[0];
    }

    if (detectedLink) {
      const sender = m.key.participant || m.key.remoteJid;
      const user = sender.split('@')[0];
      
      // Initialize violation count for user in this group
      const userKey = `${groupId}_${sender}`;
      const currentViolations = violationCounts.get(userKey) || 0;
      const newViolations = currentViolations + 1;
      violationCounts.set(userKey, newViolations);
      
      // Delete the message containing the link
      await conn.sendMessage(groupId, {
        delete: {
          id: m.key.id,
          participant: sender,
          remoteJid: groupId,
          fromMe: false
        }
      });

      // Warning message based on violation count
      let warningMsg = '';
      let shouldKick = false;

      if (newViolations >= 3) {
        warningMsg = `🚫 *FINAL WARNING - USER KICKED*\n\n@${user} has been removed from the group for sharing links 3 times.\nViolations: ${newViolations}/3`;
        shouldKick = true;
      } else if (newViolations === 2) {
        warningMsg = `⚠️ *SECOND WARNING*\n\n@${user} - Link detected!\nViolations: ${newViolations}/3\nNext violation will result in removal from group.`;
      } else {
        warningMsg = `⚠️ *FIRST WARNING*\n\n@${user} - Link detected!\nViolations: ${newViolations}/3\nPlease stop sharing links in this group.`;
      }

      await conn.sendMessage(groupId, {
        text: warningMsg,
        mentions: [sender]
      });

      // Kick user after 3 violations
      if (shouldKick) {
        try {
          await conn.groupParticipantsUpdate(groupId, [sender], "remove");
          // Reset violation count after kicking
          violationCounts.delete(userKey);
        } catch (kickError) {
          console.error("Failed to kick user:", kickError);
          await conn.sendMessage(groupId, {
            text: `❌ Failed to remove @${user}. Bot may need admin permissions.`,
            mentions: [sender]
          });
        }
      }

      return true; // Link detected and handled
    }
  } catch (error) {
    console.error("Antilink error:", error);
  }
  return false;
};

// Function to reset violations (for admin commands)
const resetViolations = (groupId, userId = null) => {
  if (userId) {
    // Reset specific user
    const userKey = `${groupId}_${userId}`;
    violationCounts.delete(userKey);
  } else {
    // Reset all users in group
    for (const [key] of violationCounts) {
      if (key.startsWith(groupId)) {
        violationCounts.delete(key);
      }
    }
  }
};

// Function to get violation count
const getViolationCount = (groupId, userId) => {
  const userKey = `${groupId}_${userId}`;
  return violationCounts.get(userKey) || 0;
};

module.exports = async (conn, update, m) => {
  try {
    // === ANTILINK HANDLING ===
    if (m && m.key && isJidGroup(m.key.remoteJid)) {
      await antiLinkHandler(conn, m, m.key.remoteJid);
    }

    // === GROUP EVENTS HANDLING ===
    const { id, participants, action } = update || {};
    if (!id || !isJidGroup(id) || !participants) return;

    const groupMetadata = await conn.groupMetadata(id);
    const groupName = groupMetadata.subject || "Group";
    const desc = groupMetadata.desc || "No Description available.";
    const groupMembersCount = groupMetadata.participants?.length || 0;
    const timestamp = new Date().toLocaleString();

    for (const participant of participants) {
      const userName = participant.split("@")[0];

      // Try to fetch profile picture
      let userPpUrl;
      try {
        userPpUrl = await conn.profilePictureUrl(participant, "image");
      } catch {
        userPpUrl = defaultProfilePics[Math.floor(Math.random() * defaultProfilePics.length)];
      }

      // === STYLIZED WELCOME ===
      if (action === "add") {
        const welcomeText = `
╭───「 ᴡׁׅᴇׅܻ݊ʟׁׅ֪ᴄׁ֒ᴏׁׅׅᴍׁׅ݊ᴇׅܻ݊ ʜׅ֮ᴏׁׅׅᴍׅ֪݊ɪׁׁׁׅׅׅᴇׁׅܻ݊ 」 
│ 👋 ʜׁׅᴇׅܻ݊ʏׁׅ֮ @${userName}!
│ 🏠 ᴡׁׅᴇׅܻʟׅ֪ᴄ֒ᴏׅׅᴍׁׅ֪݊ ᴛׅᴏׁׅׅ: ${groupName}
│ 🔢 ᴍׁׅ֪݊ᴇׁׅܻ݊ᴍׁׅ݊ ֮ʙᴇׁׅܻ݊ꭈׁׅׅs #: ${groupMembersCount}
│ 🕒 ᴊׁׅᴏׁׅׅɪׁׁׁׅׅׅ݊ɴᴇׁׅܻ݊ᴅׁׅ݊: ${timestamp} 
╰──────────•••────────❆
> *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮*
        `.trim();

        await conn.sendMessage(id, {
          image: { url: userPpUrl },
          caption: welcomeText,
          mentions: [participant],
          contextInfo: getContextInfo([participant]),
        });
      }

      // === STYLIZED GOODBYE ===
      else if (action === "remove") {
        const goodbyeText = `
╭───「 ɢׁᴏׁׅׅᴏׁׅׅᴅׅ֮݊ʙʏׁׅ֮ᴇ ʜׁׅ֮ᴏׁׅׅᴍׁׅ֪݊ɪׁׁׅׅׅᴇׅܻ݊ 
│ 👋 ܻғᴀׅʀׁׅᴇׁׅܻ݊ᴡׁׅᴇׅܻ݊ʟׁׅ֪ʟׁׅ֪ @${userName}!
│ 🏠 ʏׅ֮ᴏׅׅᴜׁׅ ʟׅ֪ᴇׁׅܻܻ݊ғᴛׁׅ: ${groupName}
│ 🕒 ᴛׁׅɪׁׁׅׅׅᴍׁׅ֪݊ᴇׁׅܻ݊: ${timestamp}
│ 
│ 🌟 ᴡׁׅᴇׅܻ݊'ʟׁׅ֪ʟׁׅ֪ ᴍׁׅ֪݊ɪׁׁׁׅׅׅׅsׅs ʏׁׅ֮ᴏׁׅׅᴜׅ!
╰─────────•••────────❆
> *ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ᴍׁׅ֪݊ɪׁׁׅׅׅ݊ɴɪׁׁׅׅׅ ֮ʙᴏׁׅׅᴛׁׅ֮ ֮ʙׁʏ ׅ֮ʜׅ֮ᴇׁׅܻ݊ɪׁׁׁׅׅׅ݊ɴᴢׅ֬ ֮ʙׁᴏׁׅׅʏׅ֮*
        `.trim();

        await conn.sendMessage(id, {
          image: { url: userPpUrl },
          caption: goodbyeText,
          mentions: [participant],
          contextInfo: getContextInfo([participant]),
        });
      }
    }
  } catch (err) {
    console.error("GroupEvents error:", err);
  }
};

// Export functions for external use
module.exports.antiLinkHandler = antiLinkHandler;
module.exports.resetViolations = resetViolations;
module.exports.getViolationCount = getViolationCount;
module.exports.violationCounts = violationCounts;

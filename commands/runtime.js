// === runtime.js ===
const startTime = Date.now();

function getUptime() {
  const uptime = Date.now() - startTime;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalMs: uptime };
}

function getRuntimeCommand() {
  return {
    pattern: "runtime",
    tags: ["utility"],
    desc: "Show bot uptime",
    use: ".runtime",

    execute: async (conn, message, args, { from, reply }) => {
      try {
        const uptime = getUptime();
        const runtimeText = `🕐 *ʀᴜɴᴛɪᴍᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ*

⏰ ᴜᴘᴛɪᴍᴇ: ${uptime.days}ᴅ ${uptime.hours}ʜ ${uptime.minutes}ᴍ ${uptime.seconds}s
📊 ᴛᴏᴛᴀʟ: ${uptime.totalMs} ᴍs`;

        await reply(runtimeText);

      } catch (e) {
        console.error("Runtime error:", e);
        await reply("⚠️ Error retrieving runtime.");
      }
    }
  };
}

module.exports = {
  getUptime,
  getRuntimeCommand
};
// ===============================
// 📁 modules/update.js
// ===============================

const axios = require('axios');
const fs = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const { cmd } = require("../command");
const { setCommitHash, getCommitHash } = require('../data/updateDB');

cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    desc: "Update the bot to the latest version",
    category: "🔧 ʜᴇɪɴᴢ ᴜᴛɪʟɪᴛʏ",
    filename: __filename
},

async (conn, mek, m, { reply, isOwner, args }) => {

    if (!isOwner) return reply("*⛔ This command is only for the bot owner.*");

    try {
        await reply("*🔍 Checking for updates...*");

        // Fetch latest commit hash from GitHub
        const { data: commitData } = await axios.get(
            "https://api.github.com/repos/HEINZBOYY/HEINZ-MINI-BOT/commits/main"
        );

        const latestCommitHash = commitData.sha;
        const currentHash = await getCommitHash();

        // Already up to date
        if (latestCommitHash === currentHash) {
            return reply("*✅ Heinz mini bot is already up-to-date!*");
        }

        await reply("*🚀 Updating Heinz mini bot...*");

        // Download latest ZIP
        const zipPath = path.join(__dirname, "latest.zip");
        const { data: zipData } = await axios.get(
            "https://github.com/HEINZBOYY/HEINZ-MINI-BOT/archive/main.zip",
            { responseType: "arraybuffer" }
        );

        fs.writeFileSync(zipPath, zipData);

        // Extract ZIP
        await reply("*📦 Extracting update...*");
        const extractPath = path.join(__dirname, "latest");
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        // Replace files (ignore config.js & app.json)
        await reply("*🔄 Replacing files...*");
        const sourcePath = path.join(extractPath, "HEINZ-MINI-BOT-main");
        const destinationPath = path.join(__dirname, '..');

        copyFolderSync(sourcePath, destinationPath);

        // Save new commit hash
        await setCommitHash(latestCommitHash);

        // Cleanup
        fs.unlinkSync(zipPath);
        fs.rmSync(extractPath, { recursive: true, force: true });

        await reply("*✅ Update complete! Restarting bot...*");
        process.exit(0);

    } catch (error) {
        console.error("Update Error:", error);
        reply("*❌ Update failed. Try again manually.*");
    }
});


// ===============================
// 📌 Helper: Copy files safely
// ===============================

function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

    const items = fs.readdirSync(source);
    for (const item of items) {
        const srcPath = path.join(source, item);
        const destPath = path.join(target, item);

        // Skip important local files
        if (item === "config.js" || item === "app.json") {
            console.log(`Skipping protected file: ${item}`);
            continue;
        }

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

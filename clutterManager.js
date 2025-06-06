const fs = require("fs/promises");
const path = require("path");
const { corr_folder } = require("./FileToFolder");

const currDirPath = __dirname;
const ageLimit = 2;

// to ignore main files
const ignoreFiles = new Set([
  "clutterManager.js",
  "FileToFolder.js",
  "package.json",
  "package-lock.json",
  ".gitignore",
  "README.md",
]);

// ensure folder exists , then move file into it
async function ensureAndMove(folderName, sourcePath, destPath) {
  const folderPath = path.join(__dirname, folderName);
  try {
    await fs.access(folderPath);
  } catch {
    await fs.mkdir(folderPath);
  }
  await fs.rename(sourcePath, destPath);
}

// delete file if it is empty, or if older than ageLimit years
// check before moving file if it was DELETED
async function deleteEmptyOrOld(filePath, stat) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    if (!content.trim()) {
      await fs.unlink(filePath);
      console.log(`🗑️ Deleted empty file: ${filePath}`);
      return true;
    }
    const ageYears = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24 * 365);
    if (ageYears > ageLimit) {
      await fs.unlink(filePath);
      console.log(`📁 Deleted file older than ${ageLimit} years: ${filePath}`);
      return true;
    }
  } catch (err) {
    console.error(`❌ Error checking file: ${filePath}`, err);
  }
  return false;
}

(async () => {
  try {
    const items = await fs.readdir(currDirPath);

    for (const item of items) {
      if (ignoreFiles.has(item)) continue;

      const itemPath = path.join(currDirPath, item);
      const stat = await fs.stat(itemPath);
      if (!stat.isFile()) continue;

      // delete if empty or expired then skip further processing 
      const wasDeleted = await deleteEmptyOrOld(itemPath, stat);
      if (wasDeleted) continue;

      const ext = path.extname(itemPath).toLowerCase();
      console.log(`Processing: ${itemPath} (ext: ${ext})`);

      // only move if extension is in corresponding_folder
      const targetFolder = corr_folder[ext];
      if (!targetFolder) continue;

      const destDir = path.join(__dirname, targetFolder);
      const destFile = path.join(destDir, path.basename(itemPath));
      await ensureAndMove(targetFolder, itemPath, destFile);
      console.log(`Moved "${item}" → "${targetFolder}"`);
    }
  } catch (err) {
    console.error("Fatal error:", err);
  }
})();

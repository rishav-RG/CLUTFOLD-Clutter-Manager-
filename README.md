# Clutter Manager

A simple Node.js script that organizes files in the current directory by extension,
deletes empty files, and removes files older than thresold years.

## Features

- **Move files** into subfolders based on their extension:
  - Images: `IMAGES`
  - PDFs: `PDFs`
  - Word docs: `WORD`
  - Text: `TEXT`
  - Presentations: `PRESENTATIONS`
  - Spreadsheets: `SPREADSHEETS`
  - Code: `CODE`
- **Delete empty files** (zero‐length content).
- **Skip** the script files and common config files (`clutterManager.js`, `FileToFolder.js`, `package.json`, etc.).
- **Configurable age limit**: Easily set the file age threshold (in years) for deletion by modifying the `ageLimit` variable in `clutterManager.js`.

## 🔧 How to Use

1. Place `clutterManager.js` and `FileToFolder.js` in the folder you want to organize.

2. **(Required)** Initialize a Node.js project (creates `package.json`):

   ```bash
   npm init -y

   ```

3. (Optional) Adjust the following settings inside `clutterManager.js`:
   - `ageLimitYears`: Set how old a file (in years) must be before it's deleted.
     ```js
     const ageLimitYears = 2; // Deletes files older than 2 years
     ```
4. (Optional) Add or update file-type mappings in `FileToFolder.js`:
   - Example:
     ```js
     const corr_folder = {
       ".pdf": "PDFs",
       ".jpg": "IMAGES",
       ".txt": "TEXT",
       // Add more extensions as needed
     };
     ```
5. Open a terminal in the project folder and run the script:
   ```bash
   node clutterManager.js
   ```

## Requirements

- Node.js v14 or higher.

## Installation

1. Clone or download this repository.
2. Run:
   ```bash
   npm install
   ```

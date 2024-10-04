const { app, BrowserWindow } = require('electron');
const path = require('node:path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

// Handle the app ready event
app.whenReady().then(() => {
  createWindow();

  // Re-create a window in the app when the dock icon is clicked (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Ensure Electron APIs are only used after the app is ready
app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

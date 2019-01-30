// Modules to control application life and create native browser window
const { app } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);
const isDev = require('electron-is-dev');

const mainWindow = require('./mainWindow');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', mainWindow.createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin')  app.quit();
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null)  mainWindow.createWindow();
})

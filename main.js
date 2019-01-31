// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app } = require('electron');

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отделения кода работающего только для разработки, добавляем модуль electron-is-dev
const isDev = require('electron-is-dev');

// Подключаем mainWindow.js с объектом главного окна приложение
const mainWindow = require('./mainWindow');

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}

// Этот метод будет вызван, когда электрон закончит
// инициализацию и будет готов для создания окна приложения.
// Некоторые API можно использовать только после этого события.
app.on('ready', mainWindow.createWindow);

// Выходим, когда все окна закрыты.
app.on('window-all-closed', () => {
// Для macOS является общим для всего приложения и его меню 
  // пока пользователь явно не завершит работу с помощью Cmd + Q
  if (process.platform !== 'darwin')  app.quit();
})

app.on('activate', () => {
  // На macOS обычно повторно создают окно в приложении, когда
  // dock значок нажат и нет никаких других открытых окон.
  if (mainWindow === null)  mainWindow.createWindow();
})

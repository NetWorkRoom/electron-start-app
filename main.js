// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, ipcMain } = require('electron');

// Для отделения кода работающего только для разработки, добавляем модуль electron-is-dev
const isDev = require('electron-is-dev');

if (isDev) {
  // Для отключения сообщений о недостаточной безопасности добавляем строку
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  // Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
  require('electron-reload')(__dirname);
  console.log('Running in development');
} else { 
  console.log('Running in production');
}

// Подключаем mainWindow.js с объектом главного окна приложение
const mainWindow = require('./mainWindow');
const readItem = require('./readItem');

// Слушатель для полученяи новых записей
ipcMain.on('new-item', (e, itemURL) => {
  // console.log('The resulting entry in the main process');
  // console.log(itemURL);
  // Получаем прочтеные записи с readItem модулем
  readItem(itemURL, (item) => {
    e.sender.send('new-item-success', item);
  });
});

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

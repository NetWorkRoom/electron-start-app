// Подключаем модули Electron API
const { BrowserWindow } = require('electron');

// Экспортируем экземпляр браузера
exports.win;

// Экспортируем функцию createWindow с конфигурацией окна приложения 
exports.createWindow = () => { 

	// Создаем окно браузера.
	this.win = new BrowserWindow({
		width: 500,
		height: 650,
		minWidth: 350,
		maxWidth: 650,
		minHeight: 310,
		webPreferences: {
			nodeIntegration: true,
			webSecurity: false
		}
	});

	// и загружаем файл index.html он содержит наше приложение.
	this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  // Открываем инструменты разработчика (DevTools). 
  // Если необходимо раскомментируйте строку ниже
	this.win.webContents.openDevTools();

	 // Запускается при закрытии окна.
	this.win.on('closed', () => { 
    // После закрытия окна ,удаляются ранее созданные объекты 
    // для организации работы приложения.
		this.win = null;
	})

}

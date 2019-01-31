// Подключаем модуль BrowserWindow
const { BrowserWindow } = require('electron');

// Инициализируем переменную BrowserWindow
let bgItemWin;

// Новый метод чтения элементов
module.exports = (url, callback) => { 

	// Создаем новый закадровый браузер
	bgItemWin = new BrowserWindow({
		width: 1000,
		height: 1000,
		show: false,
		webPreferences: {
			offscreen: true
		}
	})

	// Загружаем прочитанный элемент
	bgItemWin.loadURL(url);

	// Ждем завершения загрузки страницы
	bgItemWin.webContents.on('did-finish-load', () => { 
		// Получение скриншота (миниатюры)
		bgItemWin.webContents.capturePage((image) => { 
			// Получение изображения как dataURI
			let screenshot = image.toDataURL();

			// Получение заголовока страницы
			let title = bgItemWin.getTitle()

			// Возврат новой записи через callback
			callback({ title, screenshot, url })

			// Очистка
			bgItemWin.close()
			bgItemWin = null
		})
	})

}

// Modules
const { BrowserWindow } = require('electron');

// Browser instance
exports.win;

// mainWindow createWindow fn
exports.createWindow = () => { 
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

	// Devtools
	this.win.webContents.openDevTools();

	// Load main window content
	this.win.loadURL(`file://${__dirname}/renderer/main.html`)

	// Handle window closeв
	this.win.on('closed', () => { 
		this.win = null;
	})

}






function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			webSecurity: false
		}
	});

	// and load the index.html of the app.

	mainWindow.loadFile(`${path.join(__dirname, "/renderer/main.html")}`);

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	})
}

// Подключаем модуль remote
const { remote, shell } = require('electron');

// Инициализируем шаблон меню
const template = [
	{
		label: 'Items',
		submenu: [
			{
				label: 'Add New',
				accelerator: 'CmdOrCtrl+O',
				click() { $('.open-add-modal').click()}
			},
			{
				label: 'Read Item',
				accelerator: 'CmdOrCtrl+Enter',
				click() { window.openItem() }
			},
			{
				label: 'Delete Item',
				accelerator: 'CmdOrCtrl+Backspace',
				click() { window.deleteItem() }
			},
			{
				label: 'Open in Browser',
				accelerator: 'CmdOrCtrl+Shift+Enter',
				click() { window.openInBrowser() }
			},
			{
				type: 'separator',
			},
			{
				label: 'Serach Items',
				accelerator: 'CmdOrCtrl+S',
				click() { $('#search').focus() }
			},
		]
	},
	{
		label: 'Edit',
		submenu: [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'pasteandmatchstyle'},
			{role: 'delete'},
			{role: 'selectall'},
		],
	},
	{
		role: 'window',
		submenu: [
			{ role: 'minimize' },
			{ role: 'close' },			
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click() { shell.openExternal('https://networkroom.ru') }
			}
		]
	}
];

// Специально для MacOS
if (process.platform === 'darwin') { 
	// Добавляем первый пункт меню
	template.unshift({
		label: app.getName(),
		submenu: [
			{ role: 'about' },
			{ type: 'separator' },
			{ role: 'services' },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideothers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		]
	})

	// Edit menu
	template[1].submenu.push(
		{ type: 'separator' },
		{
			label: 'Speech',
			submenu: [
				{ role: 'startspeaking' },
				{ role: 'stopspeaking' }
			]
		}
	)

	// Window menu
	template[3].submenu = [
		{ role: 'close' },
		{ role: 'minimize' },
		{ role: 'zoom' },
		{ type: 'separator' },
		{ role: 'front' }
	]
}

// Добвляем меню в приложение
const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);

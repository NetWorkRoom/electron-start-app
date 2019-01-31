// Подключаем модули Electron.js
const { ipcRenderer } = require('electron');

// Открытие модального окна #add-modal
$('.open-add-modal').click(() => {
	$('#add-modal').addClass('is-active');
});

// Закрытие модального окна #add-modal
$('.close-add-modal').click(() => {
	$('#add-modal').removeClass('is-active');
});

// Закрытие модального окна #add-modal при клике по занавеске
$('.modal-background').click(() => {
	$('#add-modal').removeClass('is-active');
});

// Слушатель события добавления URL
$('#add-button').click(() => {
	// Получение URL из поля ввода
	let newItemURL = $('#item-input').val();

	if (newItemURL) { 

		// При отправке новой записи блокируем кнопку и поле ввода текста
		$('#item-input').prop('disabled', true);
		$('#add-button').addClass('is-loading')
		$('.close-add-modal').addClass('is-disabled')

		// console.log(newItemURL);
		// Отправка URL в главный процесс с помощью ipcRenderer
		ipcRenderer.send('new-item', newItemURL);
	}
})

ipcRenderer.on('new-item-success', (e, item) => { 
	console.log(item);

	// Закрываем и перезагружаем значения в модальном окне
	$('#add-modal').removeClass('is-active');
	$('#item-input').prop('disabled', false).val('');
	$('#add-button').removeClass('is-loading');
	$('.close-add-modal').removeClass('is-disabled');
})

// Слушатель события добавления URL по нажатию клавиши Enter
$('#item-input').keyup((e) => { 
	if (e.key === 'Enter') $('#add-button').click()
})

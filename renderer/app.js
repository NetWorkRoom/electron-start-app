// Подключаем модули Electron.js
const { ipcRenderer } = require('electron');
const items = require('./items');

// Перемещение по выбранному элементу с помощью клавиш вверх/вниз
$(document).keydown((e) => { 
	switch (e.key) { 
		case 'ArrowUp':
			items.changeItem('up')
			break;
		case 'ArrowDown':
			items.changeItem('down')
			break;	
	}
})

// Открытие модального окна #add-modal
$('.open-add-modal').click(() => {
	$('#add-modal').addClass('is-active');
});

// Закрытие модального окна #add-modal
$('.close-add-modal').click(() => {
	$('#add-modal').removeClass('is-active');
	$('#item-input').prop('disabled', false).val('');
	$('#add-button').removeClass('is-loading');
	$('.close-add-modal').removeClass('is-disabled');

});

// Закрытие модального окна #add-modal при клике по занавеске
$('.modal-background').click(() => {
	$('#add-modal').removeClass('is-active');
	$('#item-input').prop('disabled', false).val('');
	$('#add-button').removeClass('is-loading');
	$('.close-add-modal').removeClass('is-disabled');
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

		// Отправка URL в главный процесс с помощью ipcRenderer
		ipcRenderer.send('new-item', newItemURL);
	}
});

ipcRenderer.on('new-item-success', (e, item) => {
	// Добавить элемент в массив элементов 
	items.toreadItems.push(item);
	// Сохранить элементы
	items.saveItems();
	// Добавить элемент
	items.addItem(item);
	// Закрываем и перезагружаем значения в модальном окне
	$('#add-modal').removeClass('is-active');
	$('#item-input').prop('disabled', false).val('');
	$('#add-button').removeClass('is-loading');
	$('.close-add-modal').removeClass('is-disabled');

	// Если добавляется первый элемент, выбираем его
	if (items.toreadItems.length === 1) { 
		$('.read-item:first()').addClass('is-active');
	}
});

// Слушатель события добавления URL по нажатию клавиши Enter
$('#item-input').keyup((e) => {
	if (e.key === 'Enter') $('#add-button').click()
});

// Фильтр записей по названию
$('#search').keyup((e) => {

	// Получение строки из #search
	let filter = $(e.currentTarget).val();

	$('.read-item').each((index, element) => { 
		$(element).text().toLocaleLowerCase().includes(filter) ? $(element).show() : $(element).hide();
	})
		
	
});

// Добавить элементы при загрузке приложения
if (items.toreadItems.length) {
	items.toreadItems.forEach(items.addItem);
	$('.read-item:first()').addClass('is-active');
}
	

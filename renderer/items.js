// Отслеживаем элементы в массиве
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || [];

// Сохранение элементов в локальном хранилище
exports.saveItems = () => { 
	localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Переключаем выбранный элемент
exports.selectItem = (e) => { 
	$('.read-item').removeClass('is-active');	
	$(e.currentTarget).addClass('is-active');
}

// Выбираем следующий/предыдущий элемент
exports.changeItem = (direction) => { 

	// Получаем текущий активный элемент
	let activeItem = $('.read-item.is-active')
	
	// Проверяем направление и получаем следующий или предыдущий елемент
	let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item')

	// Только если элемент существует, выбираем и изменяем
	if (newItem.length) { 
		activeItem.removeClass('is-active');	
		newItem.addClass('is-active');
	}
}

// Фенкции Window 
// Удаление по индексу записи
window.deleteItem = (i = false) => { 

	// Установливаем значение i в активный элемент, если не передается в качестве аргумента
	if (i === false) i = ($('.read-item.is-active').index() - 1);
	
	console.log(i);
	// Удаление записи из DOM
	$('.read-item').eq(i).remove();

	// Удаление из массива toreadItems
	this.toreadItems = this.toreadItems.filter((item, index) => {
		return index != i;
	});

	// Обновляем состояние storage
	this.saveItems();

	// Выбираем предыдущую запись или none если список пуст
	if (this.toreadItems.length) {
		// Если первый элемент был удален, 
		// выбераем новый первый элемент в списке, иначе предыдущий элемент
		let newIndex = (i === 0) ? 0 : i - 1;
		// Назначаем активный класс новому элементу
		$('.read-item').eq(newIndex).addClass('is-active');
	// Если иначе показываем сообщение 'no items'
	} else { 
		$('#no-items').show();
	}
}

// Открываем элемент в браузере по умолчанию
window.openInBrowser = () => { 
	// Только если элементы существуют
	if (!this.toreadItems) return;

	// Получаем выбраную запись
	let targetItem = $('.read-item.is-active');
	require('electron').shell.openExternal(targetItem.data('url'));
	
}

// Открываем элемент для чтения
window.openItem = () => { 

	// Только если элементы были добавлены
	if (!this.toreadItems.length) return;

	// Получаем выбранный элемент
	let targetItem = $('.read-item.is-active');

	// Получаем url-адрес содержимого элемента (encoded)
	let contentURL = encodeURIComponent(targetItem.data('url'));

	// Получаем индекс элемента для передачи в окно прокси
	let itemIndex = targetItem.index() - 1;
	
	let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}&itemIndex=${itemIndex}`;
	// console.log('Opening Item');
	// console.log(contentURL);

	// Открываем элемент в новом окне
	let readerWin = window.open(readerWinURL, targetItem.data('title'));
}

// Добавляем новый элемент
exports.addItem = (item) => { 
	
	// Скрываем сообщение "Нет элементов" 
	$('#no-items').hide();

	// Новый элемент html
	let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
										<figure class="image is-shadow is-64x64 thumb">
											<img src="${item.screenshot}">
										</figure>
										<h2 class="title is-5 column">${item.title}</h2>
									</a>`;
	
	// Добавляем в список для четения
	$('#read-list').append(itemHTML);

	// Присоединяем выбраный обработчик событий
	$('.read-item')
		.off('click, dblclick')
		.on('click', this.selectItem)
		.on('dblclick', window.openItem);
}

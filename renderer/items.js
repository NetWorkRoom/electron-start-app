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

// Открываем элемент для чтения
exports.openItem = () => { 

	// Только если элементы были добавлены
	if (!this.toreadItems.length) return;

	// Получаем выбранный элемент
	let targetItem = $('.read-item.is-active');

	// Получаем url-адрес содержимого элемента
	let contentURL = targetItem.data('url');
	
	console.log('Opening Item');
	console.log(contentURL);
}

// Добавляем новый элемент
exports.addItem = (item) => { 
	
	// Скрываем сообщение "Нет элементов" 
	$('#no-items').hide();

	// Новый элемент html
	let itemHTML = `<a class="panel-block read-item" data-url="${item.url}">
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
		.on('dblclick', this.openItem);
}

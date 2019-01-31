// Отслеживаем элементы в массиве
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || [];

// Сохранение элементов в локальном хранилище
exports.saveItems = () => { 
	localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Добавляем новый элемент
exports.addItem = (item) => { 
	// Скрываем сообщение "Нет элементов" 
	$('#no-items').hide();

	// Новый элемент html
	let itemHTML = `<a class="panel-block read-item">
										<figure class="image is-shadow is-64x64 thumb">
											<img src="${item.screenshot}">
										</figure>
										<h2 class="title is-5 column">${item.title}</h2>
									</a>`;
	
	// Добавляем в список для четения
	$('#read-list').append(itemHTML);
}

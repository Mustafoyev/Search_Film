let elForm = document.querySelector('.js-form');
let elInp = document.querySelector('.js-input');
let elSel = document.querySelector('.js-select');
let elList = document.querySelector('.js-list');
let elFragment = document.createDocumentFragment();
let template = document.querySelector('.template').content;
let loadImg = document.querySelector('.loading-img');
let Dark = document.querySelector('.dark-mode');
let inpVal = '';
let pages = 0;
let elPages = document.querySelector('.pagination');

function render(arr, node) {
	loadImg.style.display = 'none';
	node.innerHTML = '';
	elPages.innerHTML = '';
	arr.forEach((el) => {
		let elTemplate = template.cloneNode(true);

		elTemplate.querySelector('.item');
		elTemplate.querySelector('.item-title').textContent = el.Title;
		elTemplate.querySelector('.item-img').src = el.Poster;
		elTemplate.querySelector('.item-year').textContent = `Year: ${el.Year}`;
		elTemplate.querySelector('.item-id').textContent = `ID: ${el.imdbID}`;
		elTemplate.querySelector('.item-type').textContent = `Type: ${el.Type}`;

		elFragment.appendChild(elTemplate);
	});
	node.appendChild(elFragment);
	loopPages();
}

async function getElement(link) {
	const response = await fetch(link);
	const data = await response.json();
	pages = Math.ceil(data.totalResults / 10);
	render(data.Search, elList);
}

function loopPages() {
	for (i = 1; i <= pages; i++) {
		let newItem = document.createElement('li');
		let pageBtn = document.createElement('button');

		pageBtn.textContent = i;
		pageBtn.setAttribute('id', i);
		pageBtn.setAttribute('class', 'page-btn');

		newItem.appendChild(pageBtn);
		elPages.appendChild(newItem);
		elPages.style.display = 'flex';
	}
	return;
}

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	elSel.value = '';
	inpVal = elInp.value;

	getElement(`https://www.omdbapi.com/?apikey=f6ef9e38&s=${elInp.value}`);
	elList.innerHTML = '';
	elPages.innerHTML = '';
	elPages.style.display = 'none';
	loadImg.style.display = 'block';
	elInp.value = '';
});

elSel.addEventListener('change', function () {
	getElement(
		`https://www.omdbapi.com/?apikey=f6ef9e38&s=${inpVal}&type=${elSel.value}`,
	);
	elList.innerHTML = '';
	elPages.innerHTML = '';
	elPages.style.display = 'none';
	loadImg.style.display = 'block';
});

elPages.addEventListener('click', function (evt) {
	if (evt.target.matches('.page-btn')) {
		let currentPage = evt.target.id;

		getElement(
			`https://www.omdbapi.com/?apikey=f6ef9e38&s=${inpVal}&page=${currentPage}`,
		);

		elList.innerHTML = '';
		elPages.style.display = 'none';
		loadImg.style.display = 'block';
	}
});

let theme = false;

Dark.addEventListener('click', function () {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'light' : 'dark');
	darkMode();
});

function darkMode() {
	if (window.localStorage.getItem('theme') == 'light') {
		document.body.classList.add('light');
	} else {
		document.body.classList.remove('light');
	}
}

darkMode();

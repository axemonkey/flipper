const C = { // constants
	size: 150,
	auto: true,
	autoDelay: 300, // 1000
	coversPath: '/public/images/covers/',
};

const obj = {
	divs: [],
	filenames: [],
};

const loop = () => {
	const wCoverNumber = Math.floor(Math.random() * C.count);
	const wCover = document.querySelector(`[data-count="${wCoverNumber}"]`);
	changeCover(wCover);
	window.setTimeout(() => {
		loop();
	}, C.autoDelay);
};

const changeCover = element => {
	const divElement = element;
	let tempCount = C.current || 0;
	// const wCover = Math.floor(Math.random() * C.coverCount);
	const wCover = tempCount;

	if (element.classList.contains('flippedl') || element.classList.contains('flippingl')) {
		return;
	}

	divElement.addEventListener('animationend', () => {
		divElement.classList.remove('flippingl');
		divElement.style.backgroundImage = `url(${C.coversPath}${C.files[wCover]})`;
		divElement.dataset.filename = C.files[wCover];
		console.log(`${wCover}: ${C.files[wCover]}`);
		divElement.classList.add('flippedl');
		C.current = tempCount + 1;
		window.setTimeout(() => {
			divElement.classList.remove('flippedl');
		}, 650);
	});
	divElement.classList.add('flippingl');
};

const attachListeners = () => {
	for (const div of obj.divs) {
		div.addEventListener('click', event => {
			const element = event.target;
			changeCover(element);
		});
	}
};

const fillContainer = () => {
	let count = 0;

	for (let c = 0; c < C.colCount; c++) {
		for (let r = 0; r < C.rowCount; r++) {
			// console.log(`row ${r}, col ${c}`);
			const wCover = Math.floor(Math.random() * C.coverCount);
			const element = document.createElement('div');
			element.classList.add('c');

			element.style.width = `${C.size}px`;
			element.style.height = `${C.size}px`;
			element.style.left = `${C.size * r}px`;
			element.style.top = `${C.size * c}px`;
			element.style.backgroundImage = `url(${C.coversPath}${C.files[wCover]})`;

			element.dataset.row = `row${r}`;
			element.dataset.col = `col${c}`;
			element.dataset.count = count;
			element.dataset.filename = C.files[wCover];

			C.container.append(element);
			obj.divs.push(element);

			count++;
		}
	}

	C.count = count;
	console.log(`count: ${count}`);

	if (C.auto) {
		loop();
	} else {
		attachListeners();
	}
};

const getFilenames = () => {
	const els = document.querySelectorAll('#list li');
	const covers = [];
	for (const el of els) {
		covers.push(el.textContent);
	}
	obj.filenames = covers;
	return covers;
};

const setup = () => {
	C.files = getFilenames();
	// console.log(C.files);
	C.coverCount = C.files.length;
	C.container = document.querySelector('main');
	const vpw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	const vph = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	const rowLength = Math.floor(vpw / C.size);
	const colHeight = Math.floor(vph / C.size);

	C.contWidth = rowLength * C.size;
	C.contHeight = colHeight * C.size;

	C.container.style.width = `${C.contWidth}px`;
	C.container.style.height = `${C.contHeight}px`;

	C.rowCount = Math.floor(C.contWidth / C.size);
	C.colCount = Math.floor(C.contHeight / C.size);

	console.log(`vpw: ${vpw}, vph: ${vph}, rowLength: ${rowLength}, colHeight: ${colHeight}`);

	fillContainer();
};

const init = () => {
	console.log(`let's go`);

	setup();
};

window.addEventListener('load', init);

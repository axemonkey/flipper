/*
TODOs:
* investigate lazy load or something? maybe load before flip?
* make initial container fill optional
* some kind of design?
* favicon
* investigate different methods of changing, other than flip? (fade, zoom etc)
* add controls for
	* switching modes
	* delay time in auto mode
	* size of tiles
* in auto mode, have a popup on click that shows album details
* in auto mode, add a pause button
*/

/*
TO DONE:
* figure out why occasionally a flip doesn't happen
* have a tiny footer that shows the current flip details
* find a way of setting the time in JS or CSS, not both
* have two time values, one for transition duration and one for gap between transitions
* repaint on window resize
*/

const C = { // constants
	size: 150,
	auto: true,
	autoDelay: 1000,
	transitionDuration: 800,
	coversPath: '/public/images/covers/',
	forceSmall: false,
	resetting: false,
	mode: 'flip', // flip || fade || zoom || slide || random
	initialFill: false,
};

const obj = {
	divs: [],
	filenames: [],
};

const stripExtension = filename => {
	const lastDotIndex = filename.lastIndexOf('.');
	return filename.slice(0, lastDotIndex);
};

const unspace = string => {
	return string.replace(/-/gm, ' ');
};

const loop = () => {
	const wCoverNumber = Math.floor(Math.random() * C.count);
	const wCover = document.querySelector(`[data-count="${wCoverNumber}"]`);
	// console.log(`loop has picked cover number ${wCoverNumber}`);
	changeCover(wCover);
};

const end = () => {
	if (C.auto && !C.resetting) {
		window.setTimeout(() => {
			loop();
		}, C.autoDelay);
	}
};

const showInFooter = wFile => {
	const strippedFile = stripExtension(wFile);
	// console.log(strippedFile);
	const parts = strippedFile.split('-----');
	const footerElement = document.querySelector('footer');
	footerElement.textContent = `${unspace(parts[0])} - ${unspace(parts[1])}`;
};

const flipCover = (element, wFile) => {
	const PERSPECTIVE = '300px';
	const divElement = element;
	const currentBg = divElement.dataset.filename;
	divElement.classList.add('moving');
	divElement.style.backgroundImage = `url(${C.coversPath}${currentBg}), url(${C.coversPath}${wFile})`;

	const flipForward = divElement.animate([
		{transform: `perspective(${PERSPECTIVE}) rotateY(0deg)`},
		{transform: `perspective(${PERSPECTIVE}) rotateY(-90deg)`},
	], {
		duration: C.transitionDuration / 2,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	flipForward.cancel();

	const flipBack = divElement.animate([
		{transform: `perspective(${PERSPECTIVE}) rotateY(90deg)`},
		{transform: `perspective(${PERSPECTIVE}) rotateY(0deg)`},
	], {
		duration: C.transitionDuration / 2,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-out',
	});
	flipBack.cancel();

	flipForward.onfinish = () => {
		divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		showInFooter(wFile);
		divElement.dataset.filename = wFile;
		flipBack.play();
	};

	flipBack.onfinish = () => {
		divElement.classList.remove('moving');
		end();
	};

	flipForward.play();
};

const fadeCover = (element, wFile) => {
	const divElement = element;
	const lPos = divElement.style.left;
	const tPos = divElement.style.top;

	const newDiv = document.createElement('div');
	newDiv.classList.add('c');
	newDiv.classList.add('moving');
	newDiv.style.width = `${C.size}px`;
	newDiv.style.height = `${C.size}px`;
	newDiv.style.left = lPos;
	newDiv.style.top = tPos;
	newDiv.style.backgroundImage = `url(${C.coversPath}${wFile})`;
	newDiv.style.opacity = 0;

	C.container.append(newDiv);

	const fadeIn = newDiv.animate([
		{opacity: 0},
		{opacity: 1},
	], {
		duration: C.transitionDuration,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	fadeIn.cancel();

	fadeIn.onfinish = () => {
		divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		divElement.dataset.filename = wFile;
		newDiv.remove();
		end();
	};

	showInFooter(wFile);

	fadeIn.play();
};

const zoomCover = (divElement, wFile) => {
	console.log(`haven't written zoomCover yet`);
	console.log(divElement, wFile);
};

const changeCover = element => {
	const divElement = element;
	const wCover = Math.floor(Math.random() * C.coverCount);
	const wFile = C.files[wCover];

	// console.log(`changeCover has picked ${wFile}`);
	// console.log(`incumbent bg is ${currentBg}`);

	switch (C.mode) {
	case 'fade':
		fadeCover(divElement, wFile);
		break;
	case 'zoom':
		zoomCover(divElement, wFile);
		break;
	default: // flip
		flipCover(divElement, wFile);
	}
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
			element.dataset.row = `row${r}`;
			element.dataset.col = `col${c}`;
			element.dataset.count = count;

			if (C.initialFill) {
				element.style.backgroundImage = `url(${C.coversPath}${C.files[wCover]})`;
				element.dataset.filename = C.files[wCover];
			} else {
				element.style.backgroundImage = `url(/public/images/covers/_-----_.png)`;
				element.dataset.filename = '_-----_.png';
			}

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
	const availWidth = vpw - 50;
	const availHeight = vph - 50;

	let rowLength = Math.floor(availWidth / C.size);
	let colHeight = Math.floor(availHeight / C.size);

	if (C.forceSmall) {
		rowLength = 2;
		colHeight = 3;
	}

	C.contWidth = rowLength * C.size;
	C.contHeight = colHeight * C.size;

	C.container.style.width = `${C.contWidth}px`;
	C.container.style.height = `${C.contHeight}px`;

	C.rowCount = Math.floor(C.contWidth / C.size);
	C.colCount = Math.floor(C.contHeight / C.size);

	console.log(`availWidth: ${availWidth}, availHeight: ${availHeight}, rowLength: ${rowLength}, colHeight: ${colHeight}`);

	fillContainer();
};

const init = () => {
	console.log(`let's go`);

	setup();
};

const reset = () => {
	C.resetting = true;
	document.querySelector('main').replaceChildren();
	window.setTimeout(() => {
		C.resetting = false;
		setup();
	}, C.autoDelay + C.transitionDuration);
};

window.addEventListener('load', init);
window.addEventListener('resize', reset);

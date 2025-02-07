import {
	C,
	initSettings,
} from './modules/settings.js';
import {
	loop,
	initPauseButton,
} from './modules/loop-functions.js';
import {
	attachListeners,
} from './modules/click-functions.js';

/*
TODOs:
* once controls exist, allow configuration in URL
* some simple maths to make sure that there are at least 2 rows and 2 cols
* in auto mode, have a popup on click that shows album details (and pauses)
* investigate lazy load or something? maybe load before flip?
* further crazy transitions, like blinds? checkerboard?
* add a control to adjust size of tiles?
*/

/*
TO DONE:
* figure out why occasionally a flip doesn't happen
* have a tiny footer that shows the current flip details
* find a way of setting the time in JS or CSS, not both
* have two time values, one for transition duration and one for gap between transitions
* repaint on window resize
* investigate different methods of changing, other than flip? (fade, zoom etc)
* exclude the white image from covers
* make initial container fill optional
* break transition functions into their own files
* add controls for
	* switching modes
	* transition duration
	* delay time in auto mode
	* initial fill, or nah
* spin transition
* reveal transition
* some kind of design?
  * nicer background than grey box
	* title
	* page bg maybe
* favicon
* in auto mode, add a pause button
*/

const obj = {
	divs: [],
	filenames: [],
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

			let imageFile = '_-----_.png'; // blank white
			if (C.initialFill) {
				imageFile = `${C.files[wCover]}`;
			}
			element.style.backgroundImage = `url(${C.coversPath}${imageFile})`;
			element.dataset.filename = imageFile;

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

const setBodyClass = () => {
	document.body.classList.remove('auto', 'click');
	document.body.classList.add(C.auto ? 'auto' : 'click');
};

const setup = () => {
	setBodyClass();
	C.files = getFilenames();
	// console.log(C.files);
	C.coverCount = C.files.length;
	C.container = document.querySelector('main');
	C.container.replaceChildren();

	const vpw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	const vph = document.body.clientHeight;
	const availWidth = vpw - C.size;
	const availHeight = vph - C.size;

	let rowLength = Math.max(Math.floor(availWidth / C.size), 2);
	let colHeight = Math.floor(availHeight / C.size);

	if (C.forceSmall) {
		rowLength = 2;
		colHeight = 2;
	}

	C.contWidth = rowLength * C.size;
	C.contHeight = colHeight * C.size;

	C.container.style.width = `${C.contWidth}px`;
	C.container.style.height = `${C.contHeight}px`;

	C.rowCount = Math.floor(C.contWidth / C.size);
	C.colCount = Math.floor(C.contHeight / C.size);

	console.log(`availWidth: ${availWidth}, availHeight: ${availHeight}, rowLength: ${rowLength}, colHeight: ${colHeight}`);

	fillContainer();
	initSettings();
};

const init = () => {
	console.log(`let's go`);

	initPauseButton();
	setup();
};

const reset = () => {
	if (!C.resetting) {
		C.resetting = true;

		for (const div of obj.divs) {
			div.classList.add('resetFadeOut');
		}

		window.setTimeout(() => {
			C.resetting = false;
			setup();
		}, (C.autoDelay + C.transitionDuration) * 2);
	}
};

window.addEventListener('load', init);
window.addEventListener('resize', reset);

export {
	obj,
	reset,
	setBodyClass,
};

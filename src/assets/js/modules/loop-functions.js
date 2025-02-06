import {MODES} from './constants';
import {flipCover} from './transitions/flip-cover';
import {fadeCover} from './transitions/fade-cover';
import {zoomInCover} from './transitions/zoom-in-cover';
import {zoomOutCover} from './transitions/zoom-out-cover';
import {slideCover} from './transitions/slide-cover';

const changeCover = element => {
	const divElement = element;
	const wCover = Math.floor(Math.random() * C.coverCount);
	const wFile = C.files[wCover];

	// console.log(`changeCover has picked ${wFile}`);

	if (!MODES.includes(C.mode)) {
		console.error(`BAD! That's not an available mode, you dingo.\nMode attempted: ${C.mode}`);
		return;
	}

	let whichMode = C.mode;
	if (whichMode === 'random') {
		whichMode = MODES[Math.floor(Math.random() * (MODES.length - 1))];
	}

	// console.log(`whichMode: ${whichMode}`);

	switch (whichMode) {
	case 'fade':
		fadeCover(divElement, wFile);
		break;
	case 'zoomIn':
		zoomInCover(divElement, wFile);
		break;
	case 'zoomOut':
		zoomOutCover(divElement, wFile);
		break;
	case 'slide':
		slideCover(divElement, wFile);
		break;
	default: // flip
		flipCover(divElement, wFile);
	}
};

const loop = () => {
	if (C.resetting) {
		return;
	}
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

const stripExtension = filename => {
	const lastDotIndex = filename.lastIndexOf('.');
	return filename.slice(0, lastDotIndex);
};

const unspace = string => {
	return string.replace(/-/gm, ' ');
};

export {
	changeCover,
	loop,
	end,
	showInFooter,
};

import {
	reset,
	setBodyClass,
} from '../main.js';
import {
	loop,
} from './loop-functions.js';
import {
	attachListeners,
} from './click-functions.js';

const C = { // settings
	size: 150,
	auto: true,
	autoDelay: 1000,
	paused: false,
	transitionDuration: 1000,
	coversPath: '/public/images/covers/',
	forceSmall: false,
	resetting: false,
	initialMode: 'blinds',
	initialFill: true,
};
const initialSettings = window.structuredClone(C);

const initModeDropdown = () => {
	const element = document.querySelector('#settings-mode');
	element.addEventListener('change', () => {
		if (element.value === 'auto') {
			C.auto = true;
			loop();
		} else {
			C.auto = false;
			attachListeners();
		}
		setBodyClass();
	});
};

const initStartDropdown = () => {
	const element = document.querySelector('#settings-start');
	element.addEventListener('change', () => {
		C.initialFill = (element.value === 'filled');
		reset();
	});
};

const initTransitionDropdown = () => {
	const element = document.querySelector('#settings-transition');
	element.addEventListener('change', () => {
		C.mode = element.value;
	});
};

const initDurationSlider = () => {
	const element = document.querySelector('#settings-duration');
	element.addEventListener('change', () => {
		C.transitionDuration = element.value;
	});
};

const initDelaySlider = () => {
	const element = document.querySelector('#settings-delay');
	element.addEventListener('change', () => {
		C.autoDelay = element.value;
	});
};

const showSettings = () => {
	document.querySelector('#settings').classList.remove('u-hide');
};

const hideSettings = () => {
	document.querySelector('#settings').classList.add('u-hide');
};

const resetSettings = () => {
	const loopRestart = !C.auto;
	C.auto = initialSettings.auto;
	C.autoDelay = initialSettings.autoDelay;
	C.transitionDuration = initialSettings.transitionDuration;
	C.initialMode = initialSettings.initialMode;
	C.initialFill = initialSettings.initialFill;
	C.mode = initialSettings.initialMode;

	document.querySelector('#settings-mode').value = (initialSettings.auto ? 'auto' : 'click');
	document.querySelector('#settings-start').value = (initialSettings.initialFill ? 'filled' : 'empty');
	document.querySelector('#settings-transition').value = initialSettings.initialMode;
	document.querySelector('#settings-duration').value = Number(initialSettings.transitionDuration);
	document.querySelector('#settings-delay').value = Number(initialSettings.autoDelay);

	if (loopRestart) {
		loop();
	}
};

const initButtons = () => {
	document.querySelector('#settings-button').addEventListener('click', event => {
		showSettings();
		event.target.classList.add('u-hide');
	});
	document.querySelector('#settings-close').addEventListener('click', () => {
		hideSettings();
		document.querySelector('#settings-button').classList.remove('u-hide');
	});
	document.querySelector('#settings-reset').addEventListener('click', () => {
		resetSettings();
	});
};

const initSettings = () => {
	initModeDropdown();
	initStartDropdown();
	initTransitionDropdown();
	initDurationSlider();
	initDelaySlider();
	initButtons();
};

export {
	C,
	initSettings,
};

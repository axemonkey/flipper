import {
	obj,
} from '../main.js';
import {
	changeCover,
} from './loop-functions.js';

const attachListeners = () => {
	for (const div of obj.divs) {
		div.addEventListener('click', event => {
			const element = event.target;
			changeCover(element);
		});
	}
};

export {
	attachListeners,
};

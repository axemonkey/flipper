import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

const zoomInCover = (element, wFile) => {
	const divElement = element;

	divElement.classList.add('plughole');

	const newDiv = document.createElement('div');
	newDiv.classList.add('moving');
	newDiv.style.width = `0`;
	newDiv.style.height = `0`;
	newDiv.style.backgroundImage = `url(${C.coversPath}${wFile})`;

	divElement.append(newDiv);

	const zoomIn = newDiv.animate([
		{
			width: 0,
			height: 0,
		},
		{
			width: `${C.size}px`,
			height: `${C.size}px`,
		},
	], {
		duration: C.transitionDuration,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	zoomIn.cancel();

	zoomIn.onfinish = () => {
		divElement.classList.remove('plughole');
		divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		divElement.dataset.filename = wFile;
		newDiv.remove();
		end();
	};

	showInFooter(wFile);

	zoomIn.play();
};

export {
	zoomInCover,
};

import {
	end,
	showInFooter,
} from '../loop-functions.js';

const zoomOutCover = (element, wFile) => {
	const divElement = element;
	const currFile = divElement.dataset.filename;

	divElement.classList.add('plughole');

	const newDiv = document.createElement('div');
	newDiv.classList.add('moving');
	newDiv.style.width = `${C.size}px`;
	newDiv.style.height = `${C.size}px`;
	newDiv.style.backgroundImage = `url(${C.coversPath}${currFile})`;

	divElement.append(newDiv);

	divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;

	const zoomOut = newDiv.animate([
		{
			width: `${C.size}px`,
			height: `${C.size}px`,
		},
		{
			width: 0,
			height: 0,
		},
	], {
		duration: C.transitionDuration,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	zoomOut.cancel();

	zoomOut.onfinish = () => {
		divElement.classList.remove('plughole');
		// divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		divElement.dataset.filename = wFile;
		newDiv.remove();
		end();
	};

	showInFooter(wFile);

	zoomOut.play();
};

export {
	zoomOutCover,
};

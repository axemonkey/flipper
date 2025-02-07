import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

const revealCover = (element, wFile) => {
	const divElement = element;
	const currFile = divElement.dataset.filename;

	// divElement.classList.add('plughole');

	const newDiv = document.createElement('div');
	newDiv.classList.add('moving');
	newDiv.style.width = `${C.size}px`;
	newDiv.style.height = `${C.size}px`;
	newDiv.style.left = 0;
	newDiv.style.top = 0;
	newDiv.style.backgroundImage = `url(${C.coversPath}${currFile})`;
	newDiv.style.backgroundPosition = 'left center';

	divElement.append(newDiv);

	divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;

	const reveal = newDiv.animate([
		{
			width: `${C.size}px`,
		},
		{
			width: 0,
		},
	], {
		duration: Number(C.transitionDuration),
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	reveal.cancel();

	reveal.onfinish = () => {
		divElement.classList.remove('plughole');
		// divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		divElement.dataset.filename = wFile;
		newDiv.remove();
		end();
	};

	showInFooter(wFile);

	reveal.play();
};

export {
	revealCover,
};

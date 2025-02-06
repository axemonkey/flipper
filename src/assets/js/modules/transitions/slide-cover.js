import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

const slideCover = (element, wFile) => {
	const divElement = element;
	const currFile = divElement.dataset.filename;

	const newDiv = document.createElement('div');
	newDiv.classList.add('moving');
	newDiv.style.position = 'absolute';
	newDiv.style.left = 0;
	newDiv.style.top = 0;
	newDiv.style.width = `${C.size * 2}px`;
	newDiv.style.height = `${C.size}px`;
	const leftDiv = document.createElement('div');
	leftDiv.classList.add('moving');
	leftDiv.style.position = 'absolute';
	leftDiv.style.left = 0;
	leftDiv.style.top = 0;
	leftDiv.style.width = `${C.size}px`;
	leftDiv.style.height = `${C.size}px`;
	leftDiv.style.backgroundImage = `url(${C.coversPath}${currFile})`;
	const rightDiv = document.createElement('div');
	rightDiv.classList.add('moving');
	rightDiv.style.position = 'absolute';
	rightDiv.style.left = `${C.size}px`;
	rightDiv.style.top = 0;
	rightDiv.style.width = `${C.size}px`;
	rightDiv.style.height = `${C.size}px`;
	rightDiv.style.backgroundImage = `url(${C.coversPath}${wFile})`;

	newDiv.append(leftDiv);
	newDiv.append(rightDiv);
	divElement.classList.add('clipIt');
	divElement.append(newDiv);

	const slide = newDiv.animate([
		{
			left: 0,
		},
		{
			left: `-${C.size}px`,
		},
	], {
		duration: C.transitionDuration,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	slide.cancel();

	slide.onfinish = () => {
		divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		divElement.dataset.filename = wFile;
		divElement.classList.remove('clipIt');
		newDiv.remove();
		end();
	};

	showInFooter(wFile);

	slide.play();
};

export {
	slideCover,
};

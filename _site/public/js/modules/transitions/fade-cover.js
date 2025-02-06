import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

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
		duration: Number(C.transitionDuration),
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

export {
	fadeCover,
};

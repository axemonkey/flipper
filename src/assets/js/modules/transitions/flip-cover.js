import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

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

export {
	flipCover,
};

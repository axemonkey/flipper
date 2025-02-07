import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

const spinCover = (element, wFile) => {
	const scaleTo = 0.4;
	const divElement = element;
	const currentBg = divElement.dataset.filename;
	divElement.classList.add('moving');
	divElement.style.backgroundImage = `url(${C.coversPath}${currentBg}), url(${C.coversPath}${wFile})`;

	const spinOut = divElement.animate([
		{
			transform: `rotate(0deg) scale(1)`,
		},
		{
			transform: `rotate(720deg) scale(${scaleTo})`,
		},
	], {
		duration: Number(C.transitionDuration) / 2,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-in',
	});
	spinOut.cancel();

	const spinBack = divElement.animate([
		{
			transform: `rotate(0deg) scale(${scaleTo})`,
		},
		{
			transform: `rotate(720deg) scale(1)`,
		},
	], {
		duration: Number(C.transitionDuration) / 2,
		iterations: 1,
		fill: 'forwards',
		easing: 'ease-out',
	});
	spinBack.cancel();

	spinOut.onfinish = () => {
		divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
		showInFooter(wFile);
		divElement.dataset.filename = wFile;
		spinBack.play();
	};

	spinBack.onfinish = () => {
		divElement.classList.remove('moving');
		end();
	};

	spinOut.play();
};

export {
	spinCover,
};

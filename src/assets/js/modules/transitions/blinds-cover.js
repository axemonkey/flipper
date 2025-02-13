import {C} from '../settings.js';
import {
	end,
	showInFooter,
} from '../loop-functions.js';

const blindsCover = (element, wFile) => {
	const divElement = element;
	const currFile = divElement.dataset.filename;
	const slats = 10;
	const slatWidth = C.size / slats;
	const slatsArray = [];
	const slatsAnim = [];

	for (let index = 0; index < slats; index++) {
		const newDiv = document.createElement('div');
		newDiv.classList.add('c', 'moving', `blinds-slat`);
		newDiv.id = `blinds-slat${index}`;
		newDiv.style.width = `${slatWidth}px`;
		newDiv.style.height = `${C.size}px`;
		newDiv.style.left = `${index * (slatWidth)}px`;
		newDiv.style.top = 0;
		newDiv.style.backgroundImage = `url(${C.coversPath}${currFile})`;
		newDiv.style.backgroundPosition = `${-index * slatWidth}px 0`;
		divElement.append(newDiv);
		slatsArray.push(newDiv);
	}

	divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;

	for (let index = 0; index < slats; index++) {
		slatsAnim[index] = slatsArray[index].animate([
			{
				width: `${slatWidth}px`,
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
		slatsAnim[index].cancel();

		slatsAnim[index].onfinish = () => {
			slatsArray[index].remove();
			if (index === 0) {
				divElement.dataset.filename = wFile;
				end();
			}
		};
	}

	showInFooter(wFile);

	for (let index = 0; index < slats; index++) {
		slatsAnim[index].play();
	}
};

export {
	blindsCover,
};

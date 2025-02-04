(function () {
	'use strict';

	/*
	TODOs:
	* find a way of setting the time in JS or CSS, not both
	* have two time values, one for transition duration and one for gap between transitions
	* investigate lazy load or something? maybe load before flip?
	* repaint on window resize
	* some kind of design?
	* favicon
	* investigate different methods of changing, other than flip? (fade, zoom etc)
	* add controls for
		* switching modes
		* delay time in auto mode
		* size of tiles
	* in auto mode, have a popup on click that shows album details
	* in auto mode, add a pause button
	*/

	/*
	TO DONE:
	* figure out why occasionally a flip doesn't happen
	* have a tiny footer that shows the current flip details
	*/

	const C = {
	  // constants
	  size: 150,
	  auto: true,
	  autoDelay: 1000,
	  coversPath: '/public/images/covers/',
	  forceSmall: false
	};
	const stripExtension = filename => {
	  const lastDotIndex = filename.lastIndexOf('.');
	  return filename.slice(0, lastDotIndex);
	};
	const unspace = string => {
	  return string.replace(/-/gm, ' ');
	};
	const loop = () => {
	  const wCoverNumber = Math.floor(Math.random() * C.count);
	  const wCover = document.querySelector(`[data-count="${wCoverNumber}"]`);
	  changeCover(wCover);
	  window.setTimeout(() => {
	    loop();
	  }, C.autoDelay);
	};
	const showInFooter = wFile => {
	  const strippedFile = stripExtension(wFile);
	  // console.log(strippedFile);
	  const parts = strippedFile.split('-----');
	  const footerElement = document.querySelector('footer');
	  footerElement.textContent = `${unspace(parts[0])} - ${unspace(parts[1])}`;
	};
	const changeCover = element => {
	  const divElement = element;
	  const wCover = Math.floor(Math.random() * C.coverCount);
	  const wFile = C.files[wCover];
	  if (element.classList.contains('flippedl') || element.classList.contains('flippingl')) {
	    console.log('*** burn');
	    return;
	  }
	  showInFooter(wFile);
	  divElement.addEventListener('animationend', () => {
	    divElement.classList.remove('flippingl');
	    divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
	    divElement.dataset.filename = wFile;
	    divElement.classList.add('flippedl');
	    window.setTimeout(() => {
	      divElement.classList.remove('flippedl');
	    }, 650);
	  });
	  divElement.classList.add('flippingl');
	};
	const fillContainer = () => {
	  let count = 0;
	  for (let c = 0; c < C.colCount; c++) {
	    for (let r = 0; r < C.rowCount; r++) {
	      // console.log(`row ${r}, col ${c}`);
	      const wCover = Math.floor(Math.random() * C.coverCount);
	      const element = document.createElement('div');
	      element.classList.add('c');
	      element.style.width = `${C.size}px`;
	      element.style.height = `${C.size}px`;
	      element.style.left = `${C.size * r}px`;
	      element.style.top = `${C.size * c}px`;
	      element.style.backgroundImage = `url(${C.coversPath}${C.files[wCover]})`;
	      element.dataset.row = `row${r}`;
	      element.dataset.col = `col${c}`;
	      element.dataset.count = count;
	      element.dataset.filename = C.files[wCover];
	      C.container.append(element);
	      count++;
	    }
	  }
	  C.count = count;
	  console.log(`count: ${count}`);
	  {
	    loop();
	  }
	};
	const getFilenames = () => {
	  const els = document.querySelectorAll('#list li');
	  const covers = [];
	  for (const el of els) {
	    covers.push(el.textContent);
	  }
	  return covers;
	};
	const setup = () => {
	  C.files = getFilenames();
	  // console.log(C.files);
	  C.coverCount = C.files.length;
	  C.container = document.querySelector('main');
	  const vpw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	  const vph = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	  const availWidth = vpw - 50;
	  const availHeight = vph - 50;
	  let rowLength = Math.floor(availWidth / C.size);
	  let colHeight = Math.floor(availHeight / C.size);
	  C.contWidth = rowLength * C.size;
	  C.contHeight = colHeight * C.size;
	  C.container.style.width = `${C.contWidth}px`;
	  C.container.style.height = `${C.contHeight}px`;
	  C.rowCount = Math.floor(C.contWidth / C.size);
	  C.colCount = Math.floor(C.contHeight / C.size);
	  console.log(`availWidth: ${availWidth}, availHeight: ${availHeight}, rowLength: ${rowLength}, colHeight: ${colHeight}`);
	  fillContainer();
	};
	const init = () => {
	  console.log(`let's go`);
	  setup();
	};
	window.addEventListener('load', init);

})();

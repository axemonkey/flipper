(function () {
	'use strict';

	const MODES = ['flip', 'fade', 'zoomIn', 'zoomOut', 'slide', 'random' // must be last
	];

	const flipCover = (element, wFile) => {
	  const PERSPECTIVE = '300px';
	  const divElement = element;
	  const currentBg = divElement.dataset.filename;
	  divElement.classList.add('moving');
	  divElement.style.backgroundImage = `url(${C.coversPath}${currentBg}), url(${C.coversPath}${wFile})`;
	  const flipForward = divElement.animate([{
	    transform: `perspective(${PERSPECTIVE}) rotateY(0deg)`
	  }, {
	    transform: `perspective(${PERSPECTIVE}) rotateY(-90deg)`
	  }], {
	    duration: C.transitionDuration / 2,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
	  });
	  flipForward.cancel();
	  const flipBack = divElement.animate([{
	    transform: `perspective(${PERSPECTIVE}) rotateY(90deg)`
	  }, {
	    transform: `perspective(${PERSPECTIVE}) rotateY(0deg)`
	  }], {
	    duration: C.transitionDuration / 2,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-out'
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
	  const fadeIn = newDiv.animate([{
	    opacity: 0
	  }, {
	    opacity: 1
	  }], {
	    duration: C.transitionDuration,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
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

	const zoomInCover = (element, wFile) => {
	  const divElement = element;
	  divElement.classList.add('plughole');
	  const newDiv = document.createElement('div');
	  newDiv.classList.add('moving');
	  newDiv.style.width = `0`;
	  newDiv.style.height = `0`;
	  newDiv.style.backgroundImage = `url(${C.coversPath}${wFile})`;
	  divElement.append(newDiv);
	  const zoomIn = newDiv.animate([{
	    width: 0,
	    height: 0
	  }, {
	    width: `${C.size}px`,
	    height: `${C.size}px`
	  }], {
	    duration: C.transitionDuration,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
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
	  const zoomOut = newDiv.animate([{
	    width: `${C.size}px`,
	    height: `${C.size}px`
	  }, {
	    width: 0,
	    height: 0
	  }], {
	    duration: C.transitionDuration,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
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
	  const slide = newDiv.animate([{
	    left: 0
	  }, {
	    left: `-${C.size}px`
	  }], {
	    duration: C.transitionDuration,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
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

	const changeCover = element => {
	  const divElement = element;
	  const wCover = Math.floor(Math.random() * C.coverCount);
	  const wFile = C.files[wCover];

	  // console.log(`changeCover has picked ${wFile}`);

	  if (!MODES.includes(C.mode)) {
	    console.error(`BAD! That's not an available mode, you dingo.\nMode attempted: ${C.mode}`);
	    return;
	  }
	  let whichMode = C.mode;
	  if (whichMode === 'random') {
	    whichMode = MODES[Math.floor(Math.random() * (MODES.length - 1))];
	  }

	  // console.log(`whichMode: ${whichMode}`);

	  switch (whichMode) {
	    case 'fade':
	      fadeCover(divElement, wFile);
	      break;
	    case 'zoomIn':
	      zoomInCover(divElement, wFile);
	      break;
	    case 'zoomOut':
	      zoomOutCover(divElement, wFile);
	      break;
	    case 'slide':
	      slideCover(divElement, wFile);
	      break;
	    default:
	      // flip
	      flipCover(divElement, wFile);
	  }
	};
	const loop = () => {
	  if (C.resetting) {
	    return;
	  }
	  const wCoverNumber = Math.floor(Math.random() * C.count);
	  const wCover = document.querySelector(`[data-count="${wCoverNumber}"]`);
	  // console.log(`loop has picked cover number ${wCoverNumber}`);
	  changeCover(wCover);
	};
	const end = () => {
	  if (C.auto && !C.resetting) {
	    window.setTimeout(() => {
	      loop();
	    }, C.autoDelay);
	  }
	};
	const showInFooter = wFile => {
	  const strippedFile = stripExtension(wFile);
	  // console.log(strippedFile);
	  const parts = strippedFile.split('-----');
	  const footerElement = document.querySelector('footer');
	  footerElement.textContent = `${unspace(parts[0])} - ${unspace(parts[1])}`;
	};
	const stripExtension = filename => {
	  const lastDotIndex = filename.lastIndexOf('.');
	  return filename.slice(0, lastDotIndex);
	};
	const unspace = string => {
	  return string.replace(/-/gm, ' ');
	};

	/*
	TODOs:
	* add controls for
		* switching modes
		* transition duration
		* delay time in auto mode
		* size of tiles
		* initial fill, or nah
	* break transition functions into their own files
	* some simple maths to make sure that there are at least 2 rows and 2 cols
	* spin transition?
	* some kind of design?
	  * nicer background than grey box
		* title
		* page bg maybe
	* favicon
	* in auto mode, have a popup on click that shows album details
	* in auto mode, add a pause button
	* investigate lazy load or something? maybe load before flip?
	* further crazy transitions, like blinds? checkerboard?
	*/

	/*
	TO DONE:
	* figure out why occasionally a flip doesn't happen
	* have a tiny footer that shows the current flip details
	* find a way of setting the time in JS or CSS, not both
	* have two time values, one for transition duration and one for gap between transitions
	* repaint on window resize
	* investigate different methods of changing, other than flip? (fade, zoom etc)
	* exclude the white image from covers
	* make initial container fill optional
	*/

	const C$1 = {
	  // constants
	  size: 150,
	  auto: true,
	  autoDelay: 1000,
	  transitionDuration: 800,
	  coversPath: '/public/images/covers/',
	  forceSmall: false,
	  resetting: false,
	  mode: 'flip',
	  // flip || fade || zoomIn || zoomOut || slide || random
	  initialFill: true
	};
	const obj = {
	  divs: [],
	  filenames: []
	};
	const fillContainer = () => {
	  let count = 0;
	  for (let c = 0; c < C$1.colCount; c++) {
	    for (let r = 0; r < C$1.rowCount; r++) {
	      // console.log(`row ${r}, col ${c}`);
	      const wCover = Math.floor(Math.random() * C$1.coverCount);
	      const element = document.createElement('div');
	      element.classList.add('c');
	      element.style.width = `${C$1.size}px`;
	      element.style.height = `${C$1.size}px`;
	      element.style.left = `${C$1.size * r}px`;
	      element.style.top = `${C$1.size * c}px`;
	      element.dataset.row = `row${r}`;
	      element.dataset.col = `col${c}`;
	      element.dataset.count = count;
	      {
	        element.style.backgroundImage = `url(${C$1.coversPath}${C$1.files[wCover]})`;
	        element.dataset.filename = C$1.files[wCover];
	      }
	      C$1.container.append(element);
	      obj.divs.push(element);
	      count++;
	    }
	  }
	  C$1.count = count;
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
	  obj.filenames = covers;
	  return covers;
	};
	const setup = () => {
	  C$1.files = getFilenames();
	  // console.log(C.files);
	  C$1.coverCount = C$1.files.length;
	  C$1.container = document.querySelector('main');
	  C$1.container.replaceChildren();
	  const vpw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	  const vph = document.body.clientHeight;
	  const availWidth = vpw - C$1.size;
	  const availHeight = vph - C$1.size;
	  let rowLength = Math.max(Math.floor(availWidth / C$1.size), 2);
	  let colHeight = Math.floor(availHeight / C$1.size);
	  C$1.contWidth = rowLength * C$1.size;
	  C$1.contHeight = colHeight * C$1.size;
	  C$1.container.style.width = `${C$1.contWidth}px`;
	  C$1.container.style.height = `${C$1.contHeight}px`;
	  C$1.rowCount = Math.floor(C$1.contWidth / C$1.size);
	  C$1.colCount = Math.floor(C$1.contHeight / C$1.size);
	  console.log(`availWidth: ${availWidth}, availHeight: ${availHeight}, rowLength: ${rowLength}, colHeight: ${colHeight}`);
	  fillContainer();
	};
	const init = () => {
	  console.log(`let's go`);
	  setup();
	};
	const reset = () => {
	  if (!C$1.resetting) {
	    C$1.resetting = true;
	    for (const div of obj.divs) {
	      div.classList.add('resetFadeOut');
	    }
	    window.setTimeout(() => {
	      C$1.resetting = false;
	      setup();
	    }, (C$1.autoDelay + C$1.transitionDuration) * 2);
	  }
	};
	window.addEventListener('load', init);
	window.addEventListener('resize', reset);

})();

(function (exports) {
	'use strict';

	const MODES = ['flip', 'fade', 'zoomIn', 'zoomOut', 'slide', 'reveal', 'spin', 'blinds', 'random' // must be last
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
	    duration: Number(C.transitionDuration) / 2,
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
	    duration: Number(C.transitionDuration) / 2,
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
	    duration: Number(C.transitionDuration),
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
	    duration: Number(C.transitionDuration),
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
	    duration: Number(C.transitionDuration),
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
	    duration: Number(C.transitionDuration),
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
	  const reveal = newDiv.animate([{
	    width: `${C.size}px`
	  }, {
	    width: 0
	  }], {
	    duration: Number(C.transitionDuration),
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
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

	const spinCover = (element, wFile) => {
	  const scaleTo = 0.4;
	  const divElement = element;
	  const currentBg = divElement.dataset.filename;
	  divElement.classList.add('moving');
	  divElement.style.backgroundImage = `url(${C.coversPath}${currentBg}), url(${C.coversPath}${wFile})`;
	  const spinOut = divElement.animate([{
	    transform: `rotate(0deg) scale(1)`
	  }, {
	    transform: `rotate(720deg) scale(${scaleTo})`
	  }], {
	    duration: Number(C.transitionDuration) / 2,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-in'
	  });
	  spinOut.cancel();
	  const spinBack = divElement.animate([{
	    transform: `rotate(0deg) scale(${scaleTo})`
	  }, {
	    transform: `rotate(720deg) scale(1)`
	  }], {
	    duration: Number(C.transitionDuration) / 2,
	    iterations: 1,
	    fill: 'forwards',
	    easing: 'ease-out'
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
	    newDiv.style.left = `${index * slatWidth}px`;
	    newDiv.style.top = 0;
	    newDiv.style.backgroundImage = `url(${C.coversPath}${currFile})`;
	    newDiv.style.backgroundPosition = `${-index * slatWidth}px 0`;
	    divElement.append(newDiv);
	    slatsArray.push(newDiv);
	  }
	  divElement.style.backgroundImage = `url(${C.coversPath}${wFile})`;
	  for (let index = 0; index < slats; index++) {
	    slatsAnim[index] = slatsArray[index].animate([{
	      width: `${slatWidth}px`
	    }, {
	      width: 0
	    }], {
	      duration: Number(C.transitionDuration),
	      iterations: 1,
	      fill: 'forwards',
	      easing: 'ease-in'
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

	const changeCover = element => {
	  const divElement = element;
	  const wCover = Math.floor(Math.random() * C.coverCount);
	  const wFile = C.files[wCover];
	  if (!C.mode) {
	    C.mode = C.initialMode;
	  }

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
	    case 'reveal':
	      revealCover(divElement, wFile);
	      break;
	    case 'spin':
	      spinCover(divElement, wFile);
	      break;
	    case 'blinds':
	      blindsCover(divElement, wFile);
	      break;
	    default:
	      // flip
	      flipCover(divElement, wFile);
	  }
	};
	const pauseClicked = () => {
	  C.paused = !C.paused;
	  document.body.classList.toggle('paused');
	};
	const initPauseButton = () => {
	  document.querySelector('#pause-button').addEventListener('click', pauseClicked);
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
	    if (C.paused) {
	      window.setTimeout(() => {
	        end();
	      }, 500);
	    } else {
	      window.setTimeout(() => {
	        loop();
	      }, C.autoDelay);
	    }
	  }
	};
	const showInFooter = wFile => {
	  const strippedFile = stripExtension(wFile);
	  // console.log(strippedFile);
	  const parts = strippedFile.split('-----');
	  const footerElement = document.querySelector('footer');
	  footerElement.innerHTML = `<p>${unspace(parts[0])} - ${unspace(parts[1])}</p>`;
	};
	const stripExtension = filename => {
	  const lastDotIndex = filename.lastIndexOf('.');
	  return filename.slice(0, lastDotIndex);
	};
	const unspace = string => {
	  return string.replace(/-/gm, ' ');
	};

	const attachListeners = () => {
	  for (const div of obj.divs) {
	    div.addEventListener('click', event => {
	      const element = event.target;
	      changeCover(element);
	    });
	  }
	};

	const C = {
	  // settings
	  size: 150,
	  auto: true,
	  autoDelay: 1000,
	  paused: false,
	  transitionDuration: 1000,
	  coversPath: '/public/images/covers/',
	  forceSmall: false,
	  resetting: false,
	  initialMode: 'blinds',
	  initialFill: true
	};
	const initialSettings = window.structuredClone(C);
	const initModeDropdown = () => {
	  const element = document.querySelector('#settings-mode');
	  element.addEventListener('change', () => {
	    if (element.value === 'auto') {
	      C.auto = true;
	      loop();
	    } else {
	      C.auto = false;
	      attachListeners();
	    }
	    setBodyClass();
	  });
	};
	const initStartDropdown = () => {
	  const element = document.querySelector('#settings-start');
	  element.addEventListener('change', () => {
	    C.initialFill = element.value === 'filled';
	    reset();
	  });
	};
	const initTransitionDropdown = () => {
	  const element = document.querySelector('#settings-transition');
	  element.addEventListener('change', () => {
	    C.mode = element.value;
	  });
	};
	const initDurationSlider = () => {
	  const element = document.querySelector('#settings-duration');
	  element.addEventListener('change', () => {
	    C.transitionDuration = element.value;
	  });
	};
	const initDelaySlider = () => {
	  const element = document.querySelector('#settings-delay');
	  element.addEventListener('change', () => {
	    C.autoDelay = element.value;
	  });
	};
	const showSettings = () => {
	  document.querySelector('#settings').classList.remove('u-hide');
	};
	const hideSettings = () => {
	  document.querySelector('#settings').classList.add('u-hide');
	};
	const resetSettings = () => {
	  const loopRestart = !C.auto;
	  C.auto = initialSettings.auto;
	  C.autoDelay = initialSettings.autoDelay;
	  C.transitionDuration = initialSettings.transitionDuration;
	  C.initialMode = initialSettings.initialMode;
	  C.initialFill = initialSettings.initialFill;
	  C.mode = initialSettings.initialMode;
	  document.querySelector('#settings-mode').value = initialSettings.auto ? 'auto' : 'click';
	  document.querySelector('#settings-start').value = initialSettings.initialFill ? 'filled' : 'empty';
	  document.querySelector('#settings-transition').value = initialSettings.initialMode;
	  document.querySelector('#settings-duration').value = Number(initialSettings.transitionDuration);
	  document.querySelector('#settings-delay').value = Number(initialSettings.autoDelay);
	  if (loopRestart) {
	    loop();
	  }
	};
	const initButtons = () => {
	  document.querySelector('#settings-button').addEventListener('click', event => {
	    showSettings();
	    event.target.classList.add('u-hide');
	  });
	  document.querySelector('#settings-close').addEventListener('click', () => {
	    hideSettings();
	    document.querySelector('#settings-button').classList.remove('u-hide');
	  });
	  document.querySelector('#settings-reset').addEventListener('click', () => {
	    resetSettings();
	  });
	};
	const initSettings = () => {
	  initModeDropdown();
	  initStartDropdown();
	  initTransitionDropdown();
	  initDurationSlider();
	  initDelaySlider();
	  initButtons();
	};

	/*
	TODOs:
	* once controls exist, allow configuration in URL
	* some simple maths to make sure that there are at least 2 rows and 2 cols
	* in auto mode, have a popup on click that shows album details (and pauses)
	* investigate lazy load or something? maybe load before flip?
	* further crazy transitions, like checkerboard?
	* add a control to adjust size of tiles?
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
	* break transition functions into their own files
	* add controls for
		* switching modes
		* transition duration
		* delay time in auto mode
		* initial fill, or nah
	* spin transition
	* reveal transition
	* blinds transition
	* some kind of design?
	  * nicer background than grey box
		* title
		* page bg maybe
	* favicon
	* in auto mode, add a pause button
	*/

	const obj = {
	  divs: [],
	  filenames: []
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
	      element.dataset.row = `row${r}`;
	      element.dataset.col = `col${c}`;
	      element.dataset.count = count;
	      let imageFile = '_-----_.png'; // blank white
	      if (C.initialFill) {
	        imageFile = `${C.files[wCover]}`;
	      }
	      element.style.backgroundImage = `url(${C.coversPath}${imageFile})`;
	      element.dataset.filename = imageFile;
	      C.container.append(element);
	      obj.divs.push(element);
	      count++;
	    }
	  }
	  C.count = count;
	  console.log(`count: ${count}`);
	  if (C.auto) {
	    loop();
	  } else {
	    attachListeners();
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
	const setBodyClass = () => {
	  document.body.classList.remove('auto', 'click');
	  document.body.classList.add(C.auto ? 'auto' : 'click');
	};
	const setup = () => {
	  setBodyClass();
	  C.files = getFilenames();
	  // console.log(C.files);
	  C.coverCount = C.files.length;
	  C.container = document.querySelector('main');
	  C.container.replaceChildren();
	  const vpw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	  const vph = document.body.clientHeight;
	  const availWidth = vpw - C.size;
	  const availHeight = vph - C.size;
	  let rowLength = Math.max(Math.floor(availWidth / C.size), 2);
	  let colHeight = Math.floor(availHeight / C.size);
	  if (C.forceSmall) {
	    rowLength = 2;
	    colHeight = 2;
	  }
	  C.contWidth = rowLength * C.size;
	  C.contHeight = colHeight * C.size;
	  C.container.style.width = `${C.contWidth}px`;
	  C.container.style.height = `${C.contHeight}px`;
	  C.rowCount = Math.floor(C.contWidth / C.size);
	  C.colCount = Math.floor(C.contHeight / C.size);
	  console.log(`availWidth: ${availWidth}, availHeight: ${availHeight}, rowLength: ${rowLength}, colHeight: ${colHeight}`);
	  fillContainer();
	  initSettings();
	};
	const init = () => {
	  console.log(`let's go`);
	  initPauseButton();
	  setup();
	};
	const reset = () => {
	  if (!C.resetting) {
	    C.resetting = true;
	    for (const div of obj.divs) {
	      div.classList.add('resetFadeOut');
	    }
	    window.setTimeout(() => {
	      C.resetting = false;
	      setup();
	    }, (C.autoDelay + C.transitionDuration) * 2);
	  }
	};
	window.addEventListener('load', init);
	window.addEventListener('resize', reset);

	exports.obj = obj;
	exports.reset = reset;
	exports.setBodyClass = setBodyClass;

	return exports;

})({});

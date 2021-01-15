'use strict';

const mapSection = document.querySelector('.map-section');

const mapBtn = document.querySelector('.map__selector-buttons');

const mapAllItems = document.querySelector('.js--map-items').children;
const mapAllBtns = document.querySelectorAll('.map__btn');

const mapImgGy = document.querySelector('.map-sm-gy');
const mapImgArm = document.querySelector('.map-sm-arm');
const mapImgLib = document.querySelector('.map-sm-lib');
const mapImgDef = document.querySelector('.map-sm-entrance');

const removeActive = function (el) {
  const arr = Object.entries(el);
  arr.forEach((el) => {
    el[1].classList.remove('map__btn-active');
  });
};

const hideMapItems = function () {
  const allItems = Object.entries(mapAllItems);
  allItems.forEach((el) => {
    el[1].classList.add('hidden');
  });
};

const toggleMapItem = function (el) {
  if (el === 'default') {
    mapImgDef.classList.toggle('hidden');
  }
  if (el === 'gy') {
    mapImgGy.classList.toggle('hidden');
  }
  if (el === 'arm') {
    mapImgArm.classList.toggle('hidden');
  }
  if (el === 'lib') {
    mapImgLib.classList.toggle('hidden');
  }
};

const addEventListeners = function () {
  mapBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const activeBtn = e.target.classList.value.includes('active');
    const activeMap = e.target.dataset.map;

    mapSection.classList.remove('active');
    hideMapItems();

    // Remove/add button classes if the button isnt already active
    // Resize the page to 200vh
    if (!activeBtn) {
      mapSection.classList.toggle('active');
      toggleMapItem(activeMap);
      removeActive(mapAllBtns);
      e.target.classList.add('map__btn-active');
    }
    // If the button is already active, remove all active classes and display default map
    if (activeBtn) {
      toggleMapItem('default');
      removeActive(mapAllBtns);
    }
  });
};

const init = function () {
  addEventListeners();
};
init();

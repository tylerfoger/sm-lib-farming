'use strict';

import {
  removeClass as removeClass,
  addClass as addClass,
} from '../helpers.js';

const mapAllItems = document.querySelector('.js--map-items').children;
const mapAllBtns = document.querySelectorAll('.map__btn');
const mapImgGy = document.querySelector('.map-sm-gy');
const mapImgArm = document.querySelector('.map-sm-arm');
const mapImgLib = document.querySelector('.map-sm-lib');
const mapImgDef = document.querySelector('.map-sm-entrance');

export const showMap = function (e) {
  const activeMap = e.target.dataset.map;
  const activeBtn = e.target.classList.value.includes('active');

  // If theres no currently active button
  if (!activeBtn) {
    // Hide whats currently there
    addClass(mapAllItems, 'hidden');

    // Unhide the map that was clicked on
    toggleMapItem(activeMap);

    // Remove currently active stuff
    removeClass(mapAllBtns, 'map__btn-active');

    // Change button color
    e.target.classList.add('map__btn-active');

    // Hide default map
    mapImgDef.classList.add('hidden');
  }
  // If the button is already active, remove all active classes and display default map
  if (activeBtn) {
    removeClass(mapAllBtns, 'map__btn-active');
    addClass(mapAllItems, 'hidden');
    toggleMapItem('default');
  }
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

'use strict';

import {
  clearNodeElements as clearNodeElements,
  toggleModalOverlay as toggleModalOverlay,
} from './helpers.js';
import * as mapView from './views/mapView.js';
import * as herbView from './views/herbView.js';

import * as model from './model.js';

const mapBtn = document.querySelector('.map__selector-buttons');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const herbSelect = document.querySelector('.herb__qty--container');
const herbContainer = document.querySelector('.modal__select-herb-container');
const herbResetBtn = document.querySelector('.herbReset');
const btnCloseModalHerb = document.querySelector('.btn--close-modal');
const btnCloseModalPrice = document.querySelector('.btn--close-modal--price');
const btnOpenPriceModal = document.querySelector('.btn--show-modal__price');
const modalHerb = document.querySelector('.modal');
const modalPrice = document.querySelector('.modal__price');
const btnModalPriceSubmit = document.querySelector('.modal__price-btn--submit');

const createHerbRun = function (total) {
  if (model.state.resetCounter >= 5) {
    // clear list of runs
    const herbRunResults = document.querySelectorAll('.herb__run-result');
    clearNodeElements(herbRunResults);

    model.state.overall += model.state.totalGraveMoss;
    model.state.resetCounter = 0;
    model.state.totalGraveMoss = 0;
  }
  if (model.state.resetCounter === 4) {
    // Update the total of gravemoss and increment reset counter
    model.state.totalGraveMoss += +total;
    model.state.resetCounter++;

    // Render the lockout html
    herbView.renderHerbLockout(
      model.state.totalGraveMoss,
      model.state.gsppPrice
    );
  }
  if (model.state.resetCounter < 4) {
    // Update the model, then update the UI
    model.state.totalGraveMoss += +total;
    model.state.resetCounter++;

    herbView.renderRunResults(total);
  }
};

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const addEventListeners = function () {
  // Map event listeners
  mapBtn.addEventListener('click', function (e) {
    e.preventDefault();
    mapView.showMap(e);
  });

  // Herb event listeners
  //When you click the picture of herbs
  herbSelect.addEventListener('click', function (e) {
    e.preventDefault();

    const graveMoss = e.target.classList[0];

    if (graveMoss === 'gm0') {
      createHerbRun(0);
    }

    // Unhide array of buttons based on number of gravemoss, then show modal
    herbView.renderModalBtns(graveMoss);
    toggleModalOverlay(modalHerb);
  });

  // When you click the button with the number of herbs you got
  herbContainer.addEventListener('click', function (e) {
    e.preventDefault();

    let herbAmt;
    !e.target.dataset.total
      ? (herbAmt = e.target.parentElement.dataset.total)
      : (herbAmt = e.target.dataset.total);

    // Create new herb per run html item and display
    createHerbRun(herbAmt);

    // Hide Modal/Overlay
    toggleModalOverlay(modalHerb);
  });

  btnOpenPriceModal.addEventListener('click', function (e) {
    e.preventDefault();
    toggleModalOverlay(modalPrice);
  });

  btnCloseModalHerb.addEventListener('click', function (e) {
    e.preventDefault();

    toggleModalOverlay(modalHerb);
  });

  btnCloseModalPrice.addEventListener('click', function (e) {
    e.preventDefault();

    toggleModalOverlay(modalPrice);
  });

  btnModalPriceSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const newPrice = document.getElementById('modal__price-form').value;
    model.state.gsppPrice = newPrice;
    toggleModalOverlay(modalPrice);
  });

  herbResetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const herbRunResults = document.querySelectorAll('.herb__run-result');
    clearNodeElements(herbRunResults);

    // Reset grave moss total and counter to 0
    model.state.totalGraveMoss = 0;
    model.state.resetCounter = 0;
  });
};

const init = function () {
  addEventListeners();
};
init();

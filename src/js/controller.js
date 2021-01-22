'use strict';

import { clearNodeElements as clearNodeElements } from './helpers.js';
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
const btnCloseModal = document.querySelector('.btn--close-modal');

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

    // Unhide array of buttons based on number of gravemoss, then show modal
    herbView.renderModalBtns(graveMoss);
  });

  // When you click the button with the number of herbs you got
  herbContainer.addEventListener('click', function (e) {
    e.preventDefault();

    const herbAmt = e.target.dataset.total;

    // Create new herb per run html item and display
    createHerbRun(herbAmt);

    // Hide Modal/Overlay
    herbView.toggleModalOverLay();
  });

  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault();

    herbView.toggleModalOverLay();
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

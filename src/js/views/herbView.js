'use strict';

import { addClass as addClass } from '../helpers.js';

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const herbTotalHeader = document.querySelector('.herb__total--header');
const herbResetBtn = document.querySelector('.herbReset');
const modalHerbBtns = document.querySelectorAll('.btn--select-herb');

const showModalBtns = function (arr) {
  arr.forEach((btn) => {
    modalHerbBtns.forEach((el) => {
      if (+el.dataset.total === btn) {
        el.classList.remove('inactive');
      }
    });
  });
};

export const renderHerbLockout = function (totalGraveMoss, gsppPrice) {
  const lockoutHTML = `<div class="herb__payout">You got <span>${
    totalGraveMoss / 4
  }</span> GSPP worth of <span class="purple">Grave Moss</span> this lockout: <span class="gold">${
    (totalGraveMoss / 4) * gsppPrice
  }</span> Gold.</div>`;
  herbResetBtn.insertAdjacentHTML('beforebegin', lockoutHTML);
};

export const renderRunResults = function (total) {
  const html = `<div class="gold herb__run-result">${total}</div>`;
  return herbTotalHeader.insertAdjacentHTML('afterend', html);
};

export const renderModalBtns = function (num) {
  const arrGM3 = [3, 4, 5, 6, 7, 8, 9];
  const arrGM2 = [2, 3, 4, 5, 6];
  const arrGM1 = [1, 2, 3];

  // Hide the modal buttons by adding the inactive class to all of them
  addClass(modalHerbBtns, 'inactive');

  if (num === 'gm3') {
    //unhide buttons
    showModalBtns(arrGM3);
  }
  if (num === 'gm2') {
    showModalBtns(arrGM2);
  }
  if (num === 'gm1') {
    showModalBtns(arrGM1);
  }
  if (num === 'gm0') {
    // Display a message automatically
  }
  toggleModalOverLay();
};

export const toggleModalOverLay = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

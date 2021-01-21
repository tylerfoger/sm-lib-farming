'use strict';

const herbSelect = document.querySelector('.herb__qty--container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const herbTotalHeader = document.querySelector('.herb__total--header');
const herbResetBtn = document.querySelector('.herbReset');

let totalGraveMoss = 0;
let resetCounter = 0;
let gsppPrice = 14;

const herbResetItemHTML = function (total) {
  return `<div class="gold btn--reset-herb">${total}</div>`;
};

const createHerbResetItem = function (total) {
  if (resetCounter === 4) {
    +total + totalGraveMoss;
    resetCounter++;

    const lockoutHTML = `<div class=>You got <span>${
      totalGraveMoss / 4
    }</span> GSPP worth of <span class="purple">Grave Moss</span> this lockout: <span class="gold">${
      (totalGraveMoss / 4) * gsppPrice
    }</span> Gold.</div>`;
    herbResetBtn.insertAdjacentHTML('beforebegin', lockoutHTML);
    resetCounter = 0;
  }
  const html = herbResetItemHTML(total);
  totalGraveMoss += +total;
  resetCounter++;
  return herbTotalHeader.insertAdjacentHTML('afterend', html);
};

const createModalHTML = function (arr) {
  let newHTML = ``;
  const gmIcon = document.querySelector('.gmImg').src;
  arr.forEach((btn) => {
    // Create modal button and filler
    newHTML += `
    <button class="btn--select-herb" data-total="${btn}">
    <h1 class='gold'>${btn}</h1>
    <div class="modal__filler"></div>
    `;
    // Add number of gravemoss
    createGraveMossHTML(btn)(() => (newHTML += `<img src="${gmIcon}">`));

    // end button
    newHTML += `</button>`;
  });
  return newHTML;
};

const createGraveMossHTML = (num) => (f) => {
  if (num > 0) {
    f();
    createGraveMossHTML(num - 1)(f);
  }
};

const createModalWindow = function (graveMoss) {
  const gm3 = [3, 4, 5, 6, 7, 8, 9];
  const gm2 = [2, 3, 4, 5, 6];
  const gm1 = [1, 2, 3];
  const gm0 = [];

  let html = `<div class="modal__select-herb-container">`;

  if (graveMoss === '3') {
    const newHTML = createModalHTML(gm3);
    html += newHTML;
  }
  if (graveMoss === '2') {
    const newHTML = createModalHTML(gm2);
    html += newHTML;
  }
  if (graveMoss === '1') {
    const newHTML = createModalHTML(gm1);
    html += newHTML;
  }
  if (graveMoss === '0') {
    const newHTML = createModalHTML(gm0);
    html += newHTML;
  }
  html += `</div>`;

  return btnCloseModal.insertAdjacentHTML('afterend', html);
};

const clearModal = (elements) => elements.forEach((el) => el.remove());

const toggleModalOverLay = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

export function addEventListeners() {
  herbSelect.addEventListener('click', function (e) {
    e.preventDefault();

    // Number of gravemoss picked
    const gm = e.target.classList[0].split('gm')[1];

    // What to do when image of gravemoss is pushed
    createModalWindow(gm);
    // Show Modal and overlay
    toggleModalOverLay();

    const herbContainer = document.querySelector(
      '.modal__select-herb-container'
    );

    // When modal button is pressed
    herbContainer.addEventListener('click', function (e) {
      e.preventDefault();

      // Select number of gravemoss
      const herbAmt = e.target.dataset.total;

      // Select modal content
      const modalHerbBtns = document.querySelectorAll('.btn--select-herb');

      // Hide Modal/Overlay
      toggleModalOverLay();
      clearModal(modalHerbBtns);

      // Create new herb per reset html item and display
      createHerbResetItem(herbAmt);
    });
  });

  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault();

    // Select buttons
    const modalHerbBtns = document.querySelectorAll('.btn--select-herb');

    // Toggle modal and overlay and clear the modal buttons
    toggleModalOverLay();
    clearModal(modalHerbBtns);
  });

  herbResetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Reset UI
    const allHerbs = document.querySelectorAll('.btn--reset-herb');
    clearModal(allHerbs);

    // Reset grave moss total and counter to 0
    totalGraveMoss = 0;
    resetCounter = 0;
  });
}

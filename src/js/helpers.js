'use strict';

const overlay = document.querySelector('.overlay');

// Function that removes a class to items in a node list
export const removeClass = function (elArr, classList) {
  const arr = Object.entries(elArr);
  arr.forEach((el) => {
    el[1].classList.remove(`${classList}`);
  });
};

// Function that adds a class to items in a node list
export const addClass = function (elArr, classList) {
  const arr = Object.entries(elArr);
  arr.forEach((el) => {
    el[1].classList.add(`${classList}`);
  });
};

// Removes all elements in nodelist
export const clearNodeElements = (elements) => {
  elements.forEach((el) => {
    el.remove();
  });
};

// toggles the requested overlay on or off
export const toggleModalOverlay = function (modal) {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

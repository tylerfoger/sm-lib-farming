'use strict';

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

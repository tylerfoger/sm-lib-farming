// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/mapScript.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListeners = addEventListeners;
var mapSection = document.querySelector('.map-section');
var mapBtn = document.querySelector('.map__selector-buttons');
var mapAllItems = document.querySelector('.js--map-items').children;
var mapAllBtns = document.querySelectorAll('.map__btn');
var mapImgGy = document.querySelector('.map-sm-gy');
var mapImgArm = document.querySelector('.map-sm-arm');
var mapImgLib = document.querySelector('.map-sm-lib');
var mapImgDef = document.querySelector('.map-sm-entrance');

var removeActive = function removeActive(el) {
  var arr = Object.entries(el);
  arr.forEach(function (el) {
    el[1].classList.remove('map__btn-active');
  });
};

var hideMapItems = function hideMapItems() {
  var allItems = Object.entries(mapAllItems);
  allItems.forEach(function (el) {
    el[1].classList.add('hidden');
  });
};

var toggleMapItem = function toggleMapItem(el) {
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

function addEventListeners() {
  mapBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var activeBtn = e.target.classList.value.includes('active');
    var activeMap = e.target.dataset.map;
    hideMapItems(); // Make current video pause(if one is playing)
    // Remove/add button classes if the button isnt already active
    // Resize the page to 200vh

    if (!activeBtn) {
      mapSection.classList.add('active');
      toggleMapItem(activeMap);
      removeActive(mapAllBtns);
      e.target.classList.add('map__btn-active');
    } // If the button is already active, remove all active classes and display default map, also remove active class to shrink view size


    if (activeBtn) {
      mapSection.classList.remove('active');
      toggleMapItem('default');
      removeActive(mapAllBtns);
    }
  });
}
},{}],"src/js/herbScript.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListeners = addEventListeners;
var herbSelect = document.querySelector('.herb__qty--container');
var overlay = document.querySelector('.overlay');
var modal = document.querySelector('.modal');
var btnCloseModal = document.querySelector('.btn--close-modal');
var herbTotalHeader = document.querySelector('.herb__total--header');
var herbResetBtn = document.querySelector('.herbReset');
var modalHerbBtns = document.querySelectorAll('.btn--select-herb');
var totalGraveMoss = 0;
var resetCounter = 0;
var gsppPrice = 14;

var createHerbResetItem = function createHerbResetItem(total) {
  if (resetCounter === 4) {
    +total + totalGraveMoss;
    resetCounter++;
    var lockoutHTML = "<div class=>You got <span>".concat(totalGraveMoss / 4, "</span> GSPP worth of <span class=\"purple\">Grave Moss</span> this lockout: <span class=\"gold\">").concat(totalGraveMoss / 4 * gsppPrice, "</span> Gold.</div>");
    herbResetBtn.insertAdjacentHTML('beforebegin', lockoutHTML);
    resetCounter = 0;
  }

  var html = herbResetItemHTML(total);
  totalGraveMoss += +total;
  resetCounter++;
  return herbTotalHeader.insertAdjacentHTML('afterend', html);
};

var showBtns = function showBtns(arr) {};

var createModalWindow = function createModalWindow(graveMoss) {
  var arrGM3 = [3, 4, 5, 6, 7, 8, 9];
  var arrGM2 = [2, 3, 4, 5, 6];
  var arrGM1 = [1, 2, 3];

  if (graveMoss === 'gm3') {
    //unhide buttons
    showBtns(arrGM3);
  }

  if (graveMoss === 'gm2') {
    showBtns(arrGM2);
  }

  if (graveMoss === 'gm1') {
    showBtns(arrGM1);
  }

  if (graveMoss === 'gm0') {
    createModalHTML(arrGM0);
  }
};

var toggleModalOverLay = function toggleModalOverLay() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

function addEventListeners() {
  herbSelect.addEventListener('click', function (e) {
    e.preventDefault(); // Number of gravemoss picked

    var graveMoss = e.target.classList[0]; // What to do when image of gravemoss is pushed

    createModalWindow(graveMoss); // Show Modal and overlay

    toggleModalOverLay();
    var herbContainer = document.querySelector('.modal__select-herb-container'); // When modal button is pressed

    herbContainer.addEventListener('click', function (e) {
      e.preventDefault(); // Select number of gravemoss

      var herbAmt = e.target.dataset.total; // Hide Modal/Overlay

      toggleModalOverLay(); // Create new herb per reset html item and display

      createHerbResetItem(herbAmt);
    });
  });
  btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault(); // Toggle modal and overlay and clear the modal buttons

    toggleModalOverLay();
  });
  herbResetBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Reset UI

    var allHerbs = document.querySelectorAll('.btn--reset-herb');
    clearModal(allHerbs); // Reset grave moss total and counter to 0

    totalGraveMoss = 0;
    resetCounter = 0;
  });
} // maybe needed for reset?


var clearModal = function clearModal(elements) {
  return elements.forEach(function (el) {
    return el.remove();
  });
}; // to be disposed of


var createGraveMossHTML = function createGraveMossHTML(num) {
  return function (f) {
    if (num > 0) {
      f();
      createGraveMossHTML(num - 1)(f);
    }
  };
};

var herbResetItemHTML = function herbResetItemHTML(total) {
  return "<div class=\"gold btn--reset-herb\">".concat(total, "</div>");
};

var createModalHTML = function createModalHTML(arr) {
  var newHTML = "";
  var gmIcon = document.querySelector('.gmImg').src;
  arr.forEach(function (btn) {
    // Create modal button and filler
    newHTML += "\n    <button class=\"btn--select-herb\" data-total=\"".concat(btn, "\">\n    <h1 class='gold'>").concat(btn, "</h1>\n    <div class=\"modal__filler\"></div>\n    "); // Add number of gravemoss

    createGraveMossHTML(btn)(function () {
      return newHTML += "<img src=\"".concat(gmIcon, "\">");
    }); // end button

    newHTML += "</button>";
  });
  return newHTML;
};
},{}],"src/js/script.js":[function(require,module,exports) {
'use strict';

var mapScript = _interopRequireWildcard(require("./mapScript.js"));

var herb = _interopRequireWildcard(require("./herbScript.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Sticky Nav
var header = document.querySelector('.header');
var nav = document.querySelector('.nav');
var navHeight = nav.getBoundingClientRect().height;

var stickyNav = function stickyNav(entries) {
  var _entries = _slicedToArray(entries, 1),
      entry = _entries[0];

  if (!entry.isIntersecting) nav.classList.add('sticky');else nav.classList.remove('sticky');
};

var headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-".concat(navHeight, "px")
});
headerObserver.observe(header);

var init = function init() {
  mapScript.addEventListeners();
  herb.addEventListeners();
};

init();
},{"./mapScript.js":"src/js/mapScript.js","./herbScript.js":"src/js/herbScript.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61484" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/js/script.js"], null)
//# sourceMappingURL=/script.04c05cf5.js.map
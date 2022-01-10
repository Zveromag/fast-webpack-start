/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/src/js/app.js":
/*!********************************!*\
  !*** ./frontend/src/js/app.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./frontend/src/js/utils/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var form_validation_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! form-validation-plugin */ "./node_modules/form-validation-plugin/dist/validator.js");
/* harmony import */ var form_validation_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(form_validation_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/config */ "./frontend/src/js/utils/config.js");




(form_validation_plugin__WEBPACK_IMPORTED_MODULE_2___default().i18n) = _utils_config__WEBPACK_IMPORTED_MODULE_3__.default.validator.i18n;

/***/ }),

/***/ "./frontend/src/js/utils/config.js":
/*!*****************************************!*\
  !*** ./frontend/src/js/utils/config.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  modal: {
    stickySelectors: []
  },
  validator: {
    i18n: {
      required: 'Данное поле обязательно для заполнения',
      minLen: 'Минимально допустимое количество символов равно %s%',
      maxLen: 'Максимально допустимое количество символов равно %s%',
      email: 'Поле e-mail имеет неверный формат',
      number: 'Введенные данные должны быть числом',
      equalTo: 'Введенные данные не совпадают'
    },
    regex: {
      phone: {
        pattern: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
        error: 'Неверный формат номера: пример +7 (xxx) xxx-xx-xx'
      }
    }
  }
});

/***/ }),

/***/ "./frontend/src/js/utils/index.js":
/*!****************************************!*\
  !*** ./frontend/src/js/utils/index.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMobile": function() { return /* binding */ isMobile; },
/* harmony export */   "debounce": function() { return /* binding */ debounce; },
/* harmony export */   "customTrigger": function() { return /* binding */ customTrigger; },
/* harmony export */   "throttle": function() { return /* binding */ throttle; },
/* harmony export */   "copyToClipboard": function() { return /* binding */ copyToClipboard; },
/* harmony export */   "loadImage": function() { return /* binding */ loadImage; },
/* harmony export */   "resizeImage": function() { return /* binding */ resizeImage; },
/* harmony export */   "isInViewport": function() { return /* binding */ isInViewport; },
/* harmony export */   "getBoundingRect": function() { return /* binding */ getBoundingRect; },
/* harmony export */   "createElement": function() { return /* binding */ createElement; },
/* harmony export */   "unescapeHtml": function() { return /* binding */ unescapeHtml; },
/* harmony export */   "plural": function() { return /* binding */ plural; },
/* harmony export */   "checkPhone": function() { return /* binding */ checkPhone; },
/* harmony export */   "LSBroadcastMessage": function() { return /* binding */ LSBroadcastMessage; },
/* harmony export */   "currency": function() { return /* binding */ currency; },
/* harmony export */   "bytesTOmegabyte": function() { return /* binding */ bytesTOmegabyte; }
/* harmony export */ });
const isMobile = (() => {
  const mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
  const ua = navigator.userAgent;
  return mobileRE.test(ua);
})();
function debounce(func, wait, immediate) {
  let timeout = null;
  return function () {
    const context = this,
          args = arguments;

    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
function customTrigger(type, el, {
  bubbles = false,
  cancelable = false,
  detail = null
} = {}) {
  let evt;
  const params = {
    detail,
    bubbles,
    cancelable
  };

  if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
    evt = new CustomEvent(type, { ...params
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, true, true, { ...params
    });
  }

  el.dispatchEvent(evt);
}
function throttle(callback, delay) {
  let isThrottled = false,
      args,
      context;

  function wrapper() {
    if (isThrottled) {
      args = arguments;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, arguments);
    setTimeout(() => {
      isThrottled = false;

      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, delay);
  }

  return wrapper;
}
function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = err => reject(err);

    img.src = path;
  });
}
function resizeImage(path, {
  height = 100,
  type = 'jpg'
}) {
  return new Promise((resolve, reject) => {
    loadImage(path).then(img => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (height < img.height) {
        img.width *= height / img.height;
        img.height = height;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      resolve(canvas.toDataURL(`image/${type}`));
    }).catch(err => {
      reject(err);
    });
  });
}
function isInViewport(element, {
  offset = 0,
  thresholdValue = 0
} = {}) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = element.getBoundingClientRect();
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };
  const threshold = {
    x: thresholdValue * width,
    y: thresholdValue * height
  };
  return intersection.t > (offset.top || offset + threshold.y) && intersection.r > (offset.right || offset + threshold.x) && intersection.b > (offset.bottom || offset + threshold.y) && intersection.l > (offset.left || offset + threshold.x);
}
function getBoundingRect(el) {
  const {
    left,
    top,
    right,
    bottom
  } = el.getBoundingClientRect();
  return {
    left: left + window.pageXOffset,
    top: top + window.pageYOffset,
    width: right - left,
    height: bottom - top
  };
}
function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);

  for (const attribute in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }

  if (children.length) {
    if (children[0].html) {
      element.innerHTML = children[0].html;
    } else {
      const fragment = document.createDocumentFragment();
      children.forEach(child => {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }

        fragment.appendChild(child);
      });
      element.appendChild(fragment);
    }
  }

  return element;
}
function unescapeHtml(unsafe) {
  return unsafe.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, '\'');
}
/**
 * Хелпер для склонений на русском в зависимости от числа
 * @param {number} n число
 * @param {Array} plurals  массив склонений
 */

function plural(n, plurals) {
  const index = n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  return plurals[index];
}
function checkPhone(phone) {
  return /^^\+7(9\d{9})$/.test(phone);
}
function LSBroadcastMessage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.localStorage.removeItem(key);
} // Приведение числа к валюте врублях

function currency(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2
  }).format(value);
}
/**
 * Хелпер преобразования киллобайтов в мегабайты
 * @param {number} size число
 * @returns {number}
 */

function bytesTOmegabyte(size) {
  return (size / (1024 * 1024)).toFixed(2);
}

/***/ }),

/***/ "./frontend/src/scss/app.scss":
/*!************************************!*\
  !*** ./frontend/src/scss/app.scss ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgulp_boilerplate"] = self["webpackChunkgulp_boilerplate"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["defaultVendors-node_modules_form-validation-plugin_dist_validator_js-node_modules_vue_dist_vu-159c0f"], function() { return __webpack_require__("./frontend/src/scss/app.scss"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["defaultVendors-node_modules_form-validation-plugin_dist_validator_js-node_modules_vue_dist_vu-159c0f"], function() { return __webpack_require__("./frontend/src/js/app.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map
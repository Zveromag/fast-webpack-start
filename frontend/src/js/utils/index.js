export const isMobile = (() => {
  const mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

  const ua = navigator.userAgent;
  return mobileRE.test(ua);
})();

export function debounce(func, wait, immediate) {
  let timeout = null;

  return function() {
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

export function customTrigger(type, el, {
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
    evt = new CustomEvent(type, {
      ...params
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, true, true, {
      ...params
    });
  }

  el.dispatchEvent(evt);
}

export function throttle(callback, delay) {
  let isThrottled = false, args, context;

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

export function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selected = document.getSelection().rangeCount > 0
    ? document.getSelection().getRangeAt(0)
    : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

export function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = path;
  });
}

export function resizeImage(path, {
  height = 100,
  type = 'jpg'
}) {
  return new Promise((resolve, reject) => {
    loadImage(path)
      .then(img => {
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
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function isInViewport(element, { offset = 0, thresholdValue = 0 } = {}) {
  const { top, right, bottom, left, width, height } = element.getBoundingClientRect();

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

  return intersection.t > (offset.top || offset + threshold.y) &&
    intersection.r > (offset.right || offset + threshold.x) &&
    intersection.b > (offset.bottom || offset + threshold.y) &&
    intersection.l > (offset.left || offset + threshold.x);
}

export function getBoundingRect(el) {
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

export function createElement(tag, attributes = {}, ...children) {
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
      children.forEach((child) => {
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

export function unescapeHtml(unsafe) {
  return unsafe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '\'');
}

/**
 * Хелпер для склонений на русском в зависимости от числа
 * @param {number} n число
 * @param {Array} plurals  массив склонений
 */
export function plural(n, plurals) {
  const index =
    n % 10 == 1 &&
      n % 100 != 11 ? 0 : n % 10 >= 2 &&
        n % 10 <= 4 &&
        (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  return plurals[index];
}

export function checkPhone(phone) {
  return /^^\+7(9\d{9})$/.test(phone);
}

export function LSBroadcastMessage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.localStorage.removeItem(key);
}

// Приведение числа к валюте врублях
export function currency(value) {
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
export function bytesTOmegabyte(size) {
  return (size / (1024 * 1024)).toFixed(2);
}

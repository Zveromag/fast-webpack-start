const easing = {
  linear(t) { return t; },
  easeInQuad(t) { return t * t; },
  easeOutQuad(t) { return t * (2 - t); },
  easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
  easeInCubic(t) { return t * t * t; },
  easeOutCubic(t) { return (--t) * t * t + 1; },
  easeInOutCubic(t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
  easeInQuart(t) { return t * t * t * t; },
  easeOutQuart(t) { return 1 - (--t) * t * t * t; },
  easeInOutQuart(t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
  easeInQuint(t) { return t * t * t * t * t; },
  easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
  easeInOutQuint(t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
};

// export default function(position, duration, easingFunction = 'linear') {
export default function({
  el = window,
  scrollTop = undefined,
  scrollLeft = undefined,
  easingFunction = 'linear',
  duration = 300
} = {}) {
  return new Promise(resolve => {
    const start = Date.now();

    if (el === window) {
      const html = document.documentElement;
      html.scrollTop += 1;
      el = html.scrollTop !== 0 ? html : document.body;
      html.scrollTop -= 1;
    }

    const directions = [];
    if (scrollTop !== undefined) {
      directions.push({
        way: 'scrollTop',
        from: el['scrollTop'],
        to: scrollTop
      });
    }
    if (scrollLeft !== undefined) {
      directions.push({
        way: 'scrollLeft',
        from: el['scrollLeft'],
        to: scrollLeft
      });
    }

    const done = directions.every(
      direction => direction.to === el[direction.way]
    );
    if (done) {
      return resolve();
    }

    const scroll = () => {
      const currentTime = Date.now();
      const time = Math.min(1, (currentTime - start) / duration);
      const tf = easing[easingFunction](time);
      directions.forEach(direction => {
        el[direction.way] =
          tf * (direction.to - direction.from) + direction.from;
      });

      if (time >= 1) {
        return resolve();
      }
      window.requestAnimationFrame(scroll);
    };
    window.requestAnimationFrame(scroll);
  });
}

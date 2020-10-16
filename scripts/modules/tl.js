'use strict';

const defaultOption = {
  // markers: true,
  start: 'top 70%',
  end: 'bottom top',
  toggleActions: 'play pause resume pause'
}
class Tl extends gsap.timeline {
  constructor(val) {
    super({ scrollTrigger: Object.assign(defaultOption, val) });
  }
}
'use strict';

const defaultOption = {
  markers: true,
  // start: 'top top',
  // start: 'bottom bottom',
  start: 'center 50%',
  end: 'center 25%',
  // end: '110% 110%',
  // toggleActions: 'play pause resume pause'
}
class Tl extends gsap.timeline {
  constructor(val) {
    const option = Object.assign(defaultOption, val);
    console.log('option:', option);
    super({ scrollTrigger: option });
  }
}
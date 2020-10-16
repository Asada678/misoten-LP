'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
  console.log('main:', main);
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this._observers = [];
    this._init();
  }

  set observers(val) {
    this._observers = [...this._observers, val];
  }

  get observers() {
    return this._observers;
  }
  
  _init() {
    this._scrollInit();
    // new MobileMenu();
    // this.hero = new HeroSlider('.swiper-container');
    // Pace.on('done', this._paceDone.bind(this));
  }
  
  _paceDone() {
    this._scrollInit();
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  }
  
  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }
  
  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate()
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side => side.classList.add('inview'));
    } else {
      this.sides.forEach(side => side.classList.remove('inview'));
    }
  }

  _destroyObservers() {
    this.observers.forEach(ob => {
      ob.destroy();
    })
  }

  destroy() {
    this._destroyObservers();
  }
  
  _scrollInit() {

    // this.observers = new ScrollObserver('.header', this._inviewAnimation, { once: false});
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false });
    console.log('this._observers:', this._observers);
    // this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
    // this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation);
    // this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});
    // this.observers = new ScrollObserver('.appear', this._inviewAnimation);
    // this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
    // console.log('this.observers:', this.observers);
  }
}

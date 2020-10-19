'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
  // console.log('main:', main);



});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.languages = document.querySelector('.languages');
    this.selectedLanguage = document.querySelector('.selected-language');
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
    // new MobileMenu();
    // this.hero = new HeroSlider('.swiper-container');
    this._initSwiper();
    this._addEvents();
    new fullpage('#container', {
      autoScrolling: true,
      navigation: true,
      anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8',],
      // navigationTooltips: ['Home', 'Purpose', 'Features', 'Coach', 'SNS', 'Team', 'Technologies', 'Footer'],
      showActiveTooltip: true,
      controlArrows: false,
      slidesNavigation: true
    });
    Pace.on('done', this._paceDone.bind(this));
  }

  _paceDone() {
    this._scrollInit();
    
    const tl = new Tl();
    // console.log('tl:', tl);
    tl
    .from('.concept', { x: '-100px', opacity: 0, duration: 0.5 })
    .from('.title', { y: '100px', opacity: 0, duration: 1 })
  }

  _initSwiper() {
    const swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: true,
      },
      loop: true
    });
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
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver('.appear', this._inviewAnimation);
    this.observers = new ScrollObserver('.section__heading h2', this._inviewAnimation);
    this.observers = new ScrollObserver('.arrow-container', this._inviewAnimation, { once: false });
  }

  _addEvents() {
    this.selectedLanguage.addEventListener('click', () => {
      this.languages.classList.toggle('open');
    });

    const lis = this.languages.querySelectorAll('li');
    lis.forEach(li => {
      li.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('event.target:', event.target);
      })
    });

  }
}

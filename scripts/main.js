'use strict';

new ViewportExtra(375)
document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
  // console.log('main:', main);



});

// class Main start
class Main {
  constructor() {
    this.tl = gsap.timeline();
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
    Pace.on('done', this._paceDone.bind(this));
  }

  _paceDone() {
    this._initFullpage();
    this._scrollInit();
    this._initSwiper();
    this._addEvents();
    // tlSection1();
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
      loop: true,
    });
  }

  _initFullpage() {
    const afterLoad = this._afterLoad.bind(this);
    const onLeave = this._onLeave.bind(this);
    const afterSlideLoad = this._afterSlideLoad.bind(this);
    const onSlideLeave = this._onSlideLeave.bind(this);
    const options = {
      autoScrolling: true,
      navigation: true,
      anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8',],
      // navigationTooltips: ['Home', 'Purpose', 'Features', 'Coach', 'SNS', 'Team', 'Technologies', 'Footer'],
      showActiveTooltip: true,
      controlArrows: false,
      slidesNavigation: true,
      touchSensitivity: 12,
      afterLoad,
      onLeave,
      afterSlideLoad,
      onSlideLeave
    }
    this.fullpage = new fullpage('#container', options);
  }

  _addInviewArrowContainer(arrowContainer) {
    if(!arrowContainer) return;
    setTimeout(() => {
      arrowContainer.classList.add('inview');
    }, 1000);
  }
  _removeInviewArrowContainer(arrowContainer) {
    if(!arrowContainer) return;
    arrowContainer.classList.remove('inview');
  }
  async _afterLoad(origin, destination, direction) {
    const destinationSectionContents = document.querySelectorAll(`.section[data-anchor=${destination.anchor}] .content`);
    destinationSectionContents.forEach(el => {
      el.classList.add('active');
    })
    switch (destination.anchor) {
      case 'section1':
        await tlSection1();
        break;
      case 'section3':
        await tlSection3();
        break;
      default:
        break;
    }
    const arrowContainer = document.querySelector(`.section[data-anchor=${destination.anchor}] .arrow-container`);
    this._addInviewArrowContainer(arrowContainer);
  }
  _onLeave(origin, destination, direction) {
    const originSectionContents = document.querySelectorAll(`.section[data-anchor=${origin.anchor}] .content`);
    originSectionContents.forEach(el => {
      el.classList.remove('active');
    });
    const arrowContainer = document.querySelector(`.section[data-anchor=${origin.anchor}] .arrow-container`);
    this._removeInviewArrowContainer(arrowContainer);
    switch (origin.anchor) {
      case 'section3':
        removeSection3();
        break;
      default:
        break;
    }
  }
  _afterSlideLoad(section, origin, destination, direction) {
    console.log('section, origin, destination, direction:', section, origin, destination, direction);
    console.log('destination.item:', destination.item);
    // const activeContent = document.querySelector(destination.item);
    const arrowContainer = destination.item.querySelector('.arrow-container');
    this._addInviewArrowContainer(arrowContainer);

  }
  _onSlideLeave(section, origin, destination, direction) {
    console.log('section, origin, destination, direction:', section, origin, destination, direction);
    const arrowContainer = origin.item.querySelector('.arrow-container');
    this._removeInviewArrowContainer(arrowContainer);
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
    // this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver('.appear', this._inviewAnimation);
    this.observers = new ScrollObserver('.section__heading h2', this._inviewAnimation, { once: false });
    // this.observers = new ScrollObserver('.arrow-container', this._inviewAnimation, { once: false });
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

    const rightArrows = document.querySelectorAll('.arrow.right');
    rightArrows.forEach(rightArrow => {
      rightArrow.addEventListener('click', () => {
        this.fullpage.moveSlideRight();
      })
    })
    const downArrows = document.querySelectorAll('.arrow.down');
    downArrows.forEach(downArrow => {
      downArrow.addEventListener('click', () => {
        this.fullpage.moveSectionDown();
      })
    })

  }
}
// class Main end

async function tlSection1() {
  const tl = gsap.timeline();
  await tl
    .from('.concept .item', { x: '-70px', opacity: 0, duration: .5, stagger: 0.3 }, '+=0.3')
    .from('.system-name h1', { opacity: 0, duration: 2.5 })
}
async function tlSection3() {
  const tl = gsap.timeline();
  await tl
    .from('.description', { y: '300px', opacity: 0, duration: 0.5 }, '+=0')
    .from('.description .item', { y: '70px', opacity: 0, duration: 0.5, stagger: 0.5 }, '+=0')
    // .to('.description', { x: '700px', opacity: 0, duration: 0.5 }, '+=0.5')
    .from('.feature.red', { x: '-700px', opacity: 0, duration: 0.5 }, '+=0.5')
    .from('.feature.blue', { x: '700px', opacity: 0, duration: 0.5 })
    .call(() => {
      const features = document.querySelectorAll('.feature');
      features.forEach(feature => {
        feature.classList.add('tl-done')
      })
    })
  // .set('.description', { x: '-700px', opacity: 1, duration: 0.5 }, '+=0')
}
function removeSection3() {
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
    feature.classList.remove('tl-done')
  })
}
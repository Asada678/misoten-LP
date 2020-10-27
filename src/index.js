'use strict';
import 'regenerator-runtime/runtime';

import fullpage from 'fullpage.js';
// import Pace from 'pace-js';
import Swiper from 'swiper'
import gsap from 'gsap';

import './styles/pace.scss';
import './styles/style.scss';

new ViewportExtra(375);
document.addEventListener('DOMContentLoaded', function () {
  Pace.on('done', () => {
    initFullpage();
    initSwiper();
    addEvents();
  })
});

// ----- tl --------------------------------------------------------------------
async function tlSection1() {
  const tl = gsap.timeline();
  await tl
    .from('.concept .item', { x: '-70px', opacity: 0, duration: .5, stagger: 0.3 }, '+=0.3')
    .from('.system-name h1', { opacity: 0, duration: 2 });
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
        feature.classList.add('tl-done');
      });
    });
  // .set('.description', { x: '-700px', opacity: 1, duration: 0.5 }, '+=0')
}
async function tlSection6() {
  const tl = gsap.timeline();
  await tl
    .from('.section.message p', { y: '70px', opacity: 0, duration: 0.5, stagger: 0.5 }, '+=0.5')
  // .set('.description', { x: '-700px', opacity: 1, duration: 0.5 }, '+=0')
}
function removeSection3() {
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
    feature.classList.remove('tl-done');
  });
}

// ----- arrow container --------------------------------------------------------------------
function addInviewArrowContainer(arrowContainer) {
  if (!arrowContainer) return;
  setTimeout(() => {
    arrowContainer.classList.add('inview');
  }, 700);
}
function removeInviewArrowContainer(arrowContainer) {
  if (!arrowContainer) return;
  arrowContainer.classList.remove('inview');
}
async function afterLoad(origin, destination, direction) {
  const destinationSectionContents = destination.item.querySelectorAll('.content');
  const sectionHeading = destination.item.querySelector('.section__heading h2');

  destinationSectionContents.forEach(el => {
    el.classList.add('active');
  });
  if (sectionHeading) {
    sectionHeading.classList.add('inview');
  }
  // sectionHeading.classList.add('inview')
  switch (destination.anchor) {
    case 'section1':
      await tlSection1();
      break;
    case 'section3':
      await tlSection3();
      break;
    case 'section6':
      await tlSection6();
      break;
    default:
      break;
  }
  const arrowContainer = destination.item.querySelector('.arrow-container');
  addInviewArrowContainer(arrowContainer);
}
function onLeave(origin, destination, direction) {
  const originSectionContents = origin.item.querySelectorAll('.content');
  const sectionHeading = origin.item.querySelector('.section__heading h2');

  originSectionContents.forEach(el => {
    el.classList.remove('active');
  });
  if (sectionHeading) {
    sectionHeading.classList.remove('inview')
  };
  const arrowContainer = origin.item.querySelector('.arrow-container');
  removeInviewArrowContainer(arrowContainer);
  switch (origin.anchor) {
    case 'section3':
      removeSection3();
      break;
    default:
      break;
  }
}
function afterSlideLoad(section, origin, destination, direction) {
  // console.log('section, origin, destination, direction:', section, origin, destination, direction);
  const arrowContainer = destination.item.querySelector('.arrow-container');
  addInviewArrowContainer(arrowContainer);

}
function onSlideLeave(section, origin, destination, direction) {
  // console.log('section, origin, destination, direction:', section, origin, destination, direction);
  const arrowContainer = origin.item.querySelector('.arrow-container');
  removeInviewArrowContainer(arrowContainer);
}

// ----- swiper --------------------------------------------------------------------
function initSwiper() {
  new Swiper('.swiper-container', {
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

// ----- fullpage --------------------------------------------------------------------
function initFullpage() {
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
  };
  const fp = new fullpage('#container', options);
  
  const rightArrows = document.querySelectorAll('.arrow.right');
  rightArrows.forEach(rightArrow => {
    rightArrow.addEventListener('click', () => {
      fp.moveSlideRight();
    });
  });
  const downArrows = document.querySelectorAll('.arrow.down');
  downArrows.forEach(downArrow => {
    downArrow.addEventListener('click', () => {
      fp.moveSectionDown();
    });
  });
}

// ----- add events --------------------------------------------------------------------
function addEvents() {
  const languages = document.querySelector('.languages');
  const selectedLanguage = document.querySelector('.selected-language');
  selectedLanguage.addEventListener('click', () => {
    languages.classList.toggle('open');
  });

  const lis = languages.querySelectorAll('li');
  lis.forEach(li => {
    li.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('event.target:', event.target);
    });
  });

}
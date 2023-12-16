"use strict";
const secHome = document.querySelector('[data="secHome"]');
let secHomeC = {
    item: secHome,
    itens: null,
    itensEx: null,
    actionsAboutClass: ["ZIndexUp"]
};
let imgsSecHome = {
    item: null,
    itens: secHome.querySelectorAll('[data="secHome__imgStatic"]'),
    itensEx: null,
    actionsAboutClass: ["translateZero"]
};
let logoNavBarSecHome = {
    item: null,
    itens: secHome.querySelectorAll('[data="secHome__into"]'),
    itensEx: null,
    actionsAboutClass: ["opacityOff"]
};
const secTopA = document.querySelector('[data="secTopA"]');
let secTopAC = {
    item: secTopA,
    itens: null,
    itensEx: null,
    actionsAboutClass: ["ZIndexUp"]
};
let lineSecTopA = {
    item: secTopA.querySelector('[data="line"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["widthZero"]
};
let titleSecTopA = {
    item: secTopA.querySelector('[data="title"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["translateZero", "opacityOff"]
};
let cardsSecTopA = {
    item: null,
    itens: null,
    itensEx: () => {
        slideOneByOneAnimation(secTopA);
    },
    actionsAboutClass: []
};
let imgsSecTopA = {
    item: null,
    itens: secTopA.querySelectorAll('[data="secHome__imgStatic"]'),
    itensEx: null,
    actionsAboutClass: ['translateZero']
};
const secReviews = document.querySelector('[data="secReviews"]');
let secReviewsC = {
    item: secReviews,
    itens: null,
    itensEx: null,
    actionsAboutClass: ["ZIndexUp"]
};
let lineSecReviews = {
    item: secReviews.querySelector('[data="line"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["widthZero"]
};
let titleSecReviews = {
    item: secReviews.querySelector('[data="title"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["translateZero", "opacityOff"]
};
let sliderSecReviews = {
    item: secReviews.querySelector('[data="slider"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["translateZero", "widthZero"]
};
let imgsSecReviews = {
    item: null,
    itens: secReviews.querySelectorAll('[data="secReviews__imgStatic"]'),
    itensEx: null,
    actionsAboutClass: ["translateZero"]
};
let imgsSecReviews2 = {
    item: null,
    itens: secReviews.querySelectorAll('[data="secReviews__imgStatic2"]'),
    itensEx: null,
    actionsAboutClass: ["secReviews__imgSplash"]
};
const secTopB = document.querySelector('[data="secTopB"]');
let secTopBC = {
    item: secTopB,
    itens: null,
    itensEx: null,
    actionsAboutClass: ["ZIndexUp"]
};
let lineSecTopB = {
    item: secTopB.querySelector('[data="line"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["widthZero"]
};
let titleSecTopB = {
    item: secTopB.querySelector('[data="title"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["translateZero", "opacityOff"]
};
let cardsSecTopB = {
    item: null,
    itens: null,
    itensEx: () => {
        slideOneByOneAnimation(secTopB);
    },
    actionsAboutClass: []
};
const secTalkToUs = document.querySelector('[data="secTalkToUs"]');
let secTalkToUsC = {
    item: secTalkToUs,
    itens: null,
    itensEx: null,
    actionsAboutClass: ["ZIndexUp"]
};
let cardsSecTalkToUsC = {
    item: null,
    itens: secTalkToUs.querySelectorAll('[dara="secTalkToUs__card"]'),
    itensEx: null,
    actionsAboutClass: ["translateZero"]
};
let footerSecTalkToUsC = {
    item: secTalkToUs.querySelector('[data="secTalkToUs__footer"]'),
    itens: null,
    itensEx: null,
    actionsAboutClass: ["translateZero"]
};
let sectionPoint = 0;
//Cada item de sections representa uma secton da pagina onde contain objs representando os elementos(imgs, divs, etc..) da pagina.
const sections = [[secHomeC, imgsSecHome, logoNavBarSecHome],
    [secTopAC, lineSecTopA, titleSecTopA, cardsSecTopA, imgsSecTopA],
    [secReviewsC, lineSecReviews, titleSecReviews, sliderSecReviews, imgsSecReviews, imgsSecReviews2],
    [secTopBC, lineSecTopB, titleSecTopB, cardsSecTopB],
    [secTalkToUsC, cardsSecTalkToUsC, footerSecTalkToUsC]];
let scrollControl = {
    active: false
};
document.addEventListener('wheel', event => {
    if (!scrollControl.active)
        return;
    scrollControl.active = false;
    const scrollValue = event.deltaY;
    const scrollYDirection = scrollValue == 100 ? 1 : -1;
    executeAnimetionActions(null);
    if (scrollYDirection == 1) {
        sectionPoint < sections.length - 1 ? sectionPoint++ : sectionPoint = 0;
    }
    else {
        sectionPoint > 0 ? sectionPoint-- : sectionPoint = sections.length - 1;
    }
    setTimeout(() => executeAnimetionActions(null), 1000);
    setTimeout(() => scrollControl.active = true, 2500);
    activateReturnToTopBnt();
});
const executeAnimetionActions = (value) => {
    value != null ? sectionPoint = value : 0;
    if (sectionPoint > sections.length - 1 || sectionPoint < 0)
        sectionPoint = 0;
    const currentSection = sections[sectionPoint];
    currentSection.forEach(e => {
        if (e.item != null) {
            e.actionsAboutClass.forEach(c => {
                e.item.classList.toggle(c);
            });
            return;
        }
        if (e.itens != null) {
            e.itens.forEach(i => {
                e.actionsAboutClass.forEach(c => {
                    i.classList.toggle(c);
                });
            });
            return;
        }
        if (e.itensEx != null) {
            e.itensEx();
        }
    });
};
let d = 1;
const slideOneByOneAnimation = (section) => {
    const cards = section.querySelectorAll('[data="card"]');
    let count;
    d > 0 ? count = 0 : count = cards.length - 1;
    cards.forEach(e => {
        setTimeout(() => {
            e.classList.toggle('translateZero');
        }, 100 * count);
        count += d;
    });
    d = d * -1;
};
const getCurrentSection = () => {
    return sectionPoint;
};
executeAnimetionActions(null);
setTimeout(() => scrollControl.active = true, 1000);

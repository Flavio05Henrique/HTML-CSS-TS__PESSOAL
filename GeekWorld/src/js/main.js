"use strict";
const secHome = document.querySelector('[data="secHome"]');
let secHomeM = {
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
let secToAM = {
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
let d = 1;
let cardsSecTopA = {
    item: null,
    itens: null,
    itensEx: () => {
        const cards = secTopA.querySelectorAll('[data="card"]');
        let count;
        d > 0 ? count = 0 : count = cards.length - 1;
        cards.forEach(e => {
            setTimeout(() => {
                e.classList.toggle('translateZero');
            }, 100 * count);
            count += d;
        });
        d = d * -1;
    },
    actionsAboutClass: []
};
let imgsSecTopA = {
    item: null,
    itens: secTopA.querySelectorAll('[data="secHome__imgStatic"]'),
    itensEx: null,
    actionsAboutClass: ['translateZero']
};
let sectionPoint = 0;
//Cada item de sections representa uma secton da pagina onde contain objs representando os elementos(imgs, divs, etc..) da pagina.
const sections = [[secHomeM, imgsSecHome, logoNavBarSecHome],
    [secToAM, lineSecTopA, titleSecTopA, cardsSecTopA, imgsSecTopA]];
let scrollControl = {
    active: false
};
document.addEventListener('wheel', event => {
    if (!scrollControl.active)
        return;
    scrollControl.active = false;
    executeActions();
    sectionPoint < sections.length - 1 ? sectionPoint++ : sectionPoint = 0;
    console.log(sectionPoint);
    setTimeout(() => executeActions(), 1000);
    setTimeout(() => scrollControl.active = true, 3000);
});
const executeActions = () => {
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
executeActions();
setTimeout(() => scrollControl.active = true, 1000);

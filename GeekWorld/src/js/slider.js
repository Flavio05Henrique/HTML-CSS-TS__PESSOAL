"use strict";
const slider = document.querySelector('[data="slider"]');
const sliderItens = slider.querySelectorAll('[data="secReviews__card"]');
const sliderbuttons = slider.querySelectorAll('[data="sliderBnts"]');
const sliderPoits = [0, 1, 2];
const actions = ["translateZero", "filterZero"];
let sliderStop = false;
sliderbuttons[0].addEventListener('click', event => {
    if (!sliderStop) {
        sliderNext();
        sliderStop = true;
        setTimeout(() => sliderStop = false, 500);
    }
});
sliderbuttons[1].addEventListener('click', event => {
    if (!sliderStop) {
        sliderPrevious();
        sliderStop = true;
        setTimeout(() => sliderStop = false, 500);
    }
});
const sliderNext = () => {
    if (sliderItens.length < 2)
        return;
    actions.forEach(action => {
        sliderItens[sliderPoits[0]].classList.toggle(action);
        sliderItens[sliderPoits[1]].classList.toggle(action);
    });
    sliderItens.forEach(item => {
        item.style.zIndex = '0';
    });
    sliderItens[sliderPoits[0]].style.zIndex = '10';
    sliderItens[sliderPoits[1]].style.zIndex = '5';
    sliderItens[sliderPoits[2]].style.zIndex = '5';
    sliderItens[sliderPoits[0]].style.left = 'calc(50% - var(--cardWidth) / 2)';
    sliderItens[sliderPoits[1]].style.left = 'calc(75% - var(--cardWidth) / 2)';
    sliderItens[sliderPoits[2]].style.left = 'calc(90% - var(--cardWidth) / 2)';
    let itemReference = sliderItens[sliderPoits[2]];
    setTimeout(() => itemReference.classList.add('displayNone'), 250);
    sliderPoits[2] = sliderPoits[1];
    sliderPoits[1] = sliderPoits[0];
    sliderPoits[0] = sliderPoits[0] == 0 ? sliderPoits[0] = sliderItens.length - 1 : sliderPoits[0] -= 1;
    sliderItens[sliderPoits[0]].style.left = 'calc(10% - var(--cardWidth) / 2)';
    sliderItens[sliderPoits[0]].classList.remove('displayNone');
    setInterval(() => {
        sliderItens[sliderPoits[0]].style.left = 'calc(25% - var(--cardWidth) / 2)';
    }, 100);
};
const sliderPrevious = () => {
    if (sliderItens.length < 2)
        return;
    actions.forEach(action => {
        sliderItens[sliderPoits[1]].classList.toggle(action);
        sliderItens[sliderPoits[2]].classList.toggle(action);
    });
    sliderItens.forEach(item => {
        item.style.zIndex = '0';
    });
    sliderItens[sliderPoits[0]].style.zIndex = '5';
    sliderItens[sliderPoits[1]].style.zIndex = '5';
    sliderItens[sliderPoits[2]].style.zIndex = '10';
    sliderItens[sliderPoits[0]].style.left = 'calc(20% - var(--cardWidth) / 2)';
    sliderItens[sliderPoits[1]].style.left = 'calc(25% - var(--cardWidth) / 2)';
    sliderItens[sliderPoits[2]].style.left = 'calc(50% - var(--cardWidth) / 2)';
    let itemReference = sliderItens[sliderPoits[0]];
    itemReference.style.left = 'calc(20% - var(--cardWidth) / 2)';
    setTimeout(() => itemReference.classList.add('displayNone'), 250);
    sliderPoits[0] = sliderPoits[1];
    sliderPoits[1] = sliderPoits[2];
    sliderPoits[2] = sliderPoits[2] == sliderItens.length - 1 ? sliderPoits[2] = 0 : sliderPoits[2] += 1;
    sliderItens[sliderPoits[2]].style.left = 'calc(90% - var(--cardWidth) / 2)';
    sliderItens[sliderPoits[2]].classList.remove('displayNone');
    setInterval(() => {
        sliderItens[sliderPoits[2]].style.left = 'calc(75% - var(--cardWidth) / 2)';
    }, 100);
};

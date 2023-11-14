"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let slider;
let sliderItens;
let sliderbuttons;
const startSlider = () => {
    slider = document.querySelector('[data="slider"]');
    sliderItens = slider.querySelectorAll('[data="secReviews__card"]');
    sliderbuttons = slider.querySelector('[data="sliderBnts"]');
};
exports.default = startSlider;

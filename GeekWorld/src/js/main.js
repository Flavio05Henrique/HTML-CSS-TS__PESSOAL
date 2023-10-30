"use strict";
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
console.log("H: " + windowHeight + " W: " + windowWidth);
const imgsSec1 = document.querySelectorAll('[data="secHome__imgStatic"]');
const homeComponents = document.querySelectorAll('[data="secHome"]');
console.log(imgsSec1);
document.addEventListener('click', event => {
    imgsSec1.forEach(img => {
        img.classList.toggle('translateZero');
    });
    homeComponents.forEach(comp => {
        comp.classList.toggle('opacityOff');
    });
});

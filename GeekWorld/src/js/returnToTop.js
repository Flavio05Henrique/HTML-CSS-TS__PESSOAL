"use strict";
const returnToTopBnt = document.querySelector('[data="bntReturnToTop"]');
let returnToTopBntActive = false;
returnToTopBnt.addEventListener('click', event => {
    if (returnToTopBntActive) {
        executeAnimetionActions(null);
        setTimeout(() => {
            executeAnimetionActions(0);
            activateReturnToTopBnt();
        }, 1000);
    }
});
const activateReturnToTopBnt = () => {
    if (getCurrentSection() > 0 && !returnToTopBntActive) {
        ReturnToTopBntChangeState();
    }
    if (getCurrentSection() == 0) {
        ReturnToTopBntChangeState();
    }
};
const ReturnToTopBntChangeState = () => {
    returnToTopBntActive = !returnToTopBntActive;
    returnToTopBnt.classList.toggle('displayNone');
};
const returnToTopBntState = () => {
    return returnToTopBntActive;
};

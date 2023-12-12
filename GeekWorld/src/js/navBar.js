"use strict";
const navBar = document.querySelector('[data="secHome__navBar"]');
navBar.addEventListener('click', event => {
    const elementClicked = event.target;
    const elementClickedTag = elementClicked.tagName;
    if (elementClickedTag == "BUTTON") {
        executeAnimetionActions(null);
        executeAnimetionActions(parseInt(elementClicked.id));
        activateReturnToTopBnt();
    }
});

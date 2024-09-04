import { slideOne } from "./slideToSection.js";
let scrollActive = true;
export const activateScrollControl = () => {
    document.addEventListener('wheel', event => {
        if (!scrollActive)
            return;
        const scrollValue = event.deltaY;
        const scrollYDirection = scrollValue == 100 ? 1 : -1;
        slideOne(scrollYDirection);
        scrollActive = false;
        setTimeout(() => scrollActive = true, 500);
    });
};

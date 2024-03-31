const navBar = document.querySelector('[data="navBar"]');
const navBarPointer = navBar.querySelector('[data="navBar__pointer"]');
const sections = document.querySelectorAll('[data="section"]');
let firstInteraction = false;
const navBarPointerColors = ["var(--cor_1)", "var(--cor_2)"];
export const navBarActivateFunctions = () => {
    setTimeout(() => navBar.style.animation = "bgAnimated 5s infinite", 1000);
    navBar.addEventListener('click', event => {
        const elementClicked = event.target;
        if (elementClicked.tagName == "BUTTON") {
            setPointerPosition(elementClicked);
            slideToSection(elementClicked);
        }
    });
};
const resetSecSkillsBg = () => {
    const bg = document.querySelector('[data="secSkills__bg"]');
    bg.classList.add('U-reset_transform');
};
const setPointerPosition = (elementClicked) => {
    const elementClickedValues = elementClicked.getClientRects()[0];
    const elementClickedPositionY = elementClickedValues.y;
    const elementClickedHeight = elementClickedValues.height;
    const navBarPointerPosition = elementClickedPositionY + (elementClickedHeight / 2);
    navBarPointer.style.top = navBarPointerPosition + "px";
};
const slideToSection = (elementClicked) => {
    const elementClickedAsButton = elementClicked;
    const index = parseInt(elementClickedAsButton.value);
    sections[index].click();
    setPointerColor(index);
    if (!firstInteraction && elementClickedAsButton.value == '1') {
        firstInteraction = true;
        resetSecSkillsBg();
    }
};
const setPointerColor = (number) => {
    navBarPointer.style.borderRight = `15px solid ${navBarPointerColors[number]}`;
};

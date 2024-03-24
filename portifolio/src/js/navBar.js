const navBar = document.querySelector('[data="navBar"]');
const navBarPointer = navBar.querySelector('[data="navBar__pointer"]');
const sections = document.querySelectorAll('[data="section"]');
let firstInteraction = false;
export const navBarActivateFunctions = () => {
    console.log(sections);
    setTimeout(() => navBar.style.animation = "bgAnimated 5s infinite", 1000);
    navBar.addEventListener('click', event => {
        const elementClicked = event.target;
        if (elementClicked.tagName == "BUTTON") {
            const elementClickedAsButton = elementClicked;
            const elementClickedValues = elementClicked.getClientRects()[0];
            const elementClickedPositionY = elementClickedValues.y;
            const elementClickedHeight = elementClickedValues.height;
            const navBarPointerPosition = elementClickedPositionY + (elementClickedHeight / 2);
            navBarPointer.style.top = navBarPointerPosition + "px";
            const index = parseInt(elementClickedAsButton.value);
            sections[index].click();
            if (!firstInteraction && elementClickedAsButton.value == '1') {
                firstInteraction = true;
                resetSecSkillsBg();
            }
        }
    });
};
const resetSecSkillsBg = () => {
    const bg = document.querySelector('[data="secSkills__bg"]');
    bg.classList.add('U-reset_transform');
};

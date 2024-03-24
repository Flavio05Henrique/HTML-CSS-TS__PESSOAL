const modeControlButtons = document.querySelectorAll('[data="modeControl__bnt"]');
const html = document.querySelector('[data="html"]');
export const modeControlActivateFunctions = () => {
    console.log(document);
    modeControlButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            button.classList.toggle('U-reset_transform');
            if (index == modeControlButtons.length - 1) {
                modeControlButtons[0].classList.toggle('U-reset_transform');
                html.classList.toggle('modeDark');
            }
            else {
                modeControlButtons[index + 1].classList.toggle('U-reset_transform');
                html.classList.toggle('modeDark');
            }
        });
    });
};

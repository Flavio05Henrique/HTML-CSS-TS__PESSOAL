let Hero;
const screen = document.querySelector('[data="screen"]');
const updateScreen = (hero) => {
    Hero = hero;
    setInterval(update, 30);
};
const update = () => {
    const hero = `<div class="hero" data="hero" style="left: ${Hero.x}px; top: ${Hero.y}px"></div>`;
    screen.innerHTML = hero;
};
export default { updateScreen };

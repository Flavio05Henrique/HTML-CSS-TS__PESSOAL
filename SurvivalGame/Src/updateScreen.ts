type hero = {
    "y" : number,
    "x" : number,
    speed: number
}

let Hero : hero
const screen = document.querySelector('[data="screen"]') as HTMLDivElement

const updateScreen = (hero : any) => {
    Hero = hero
    setInterval(update, 30);
}

const update = () => {
    const hero = `<div class="hero" data="hero" style="left: ${Hero.x}px; top: ${Hero.y}px"></div>`
    screen.innerHTML = hero
}

export default {updateScreen}
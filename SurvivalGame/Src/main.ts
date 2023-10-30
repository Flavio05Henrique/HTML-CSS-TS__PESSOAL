import moveHero from './moveHero.js';
import updateScreen from './updateScreen.js';

const entities : object[] = []

let hero = {
    "y" : 0,
    "x" : 0,
    speed: 15
}

moveHero.readKeys(hero)


updateScreen.updateScreen(hero)
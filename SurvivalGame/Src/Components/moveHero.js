let hero;
const readKeys = (hero) => {
    const validKeys = new Map([
        ["w", { "val": -1, "direction": "y" }],
        ["s", { "val": 1, "direction": "y" }],
        ["d", { "val": 1, "direction": "x" }],
        ["a", { "val": -1, "direction": "x" }]
    ]);
    document.addEventListener('keypress', event => {
        if (validKeys.has(event.key)) {
            const val = validKeys.get(event.key);
            moveHero(val, hero);
        }
    });
};
const moveHero = (val, hero) => {
    console.log(val.val, val.direction);
    if (val.direction == "x")
        hero.x = hero.x + hero.speed * val.val;
    if (val.direction == "y")
        hero.y = hero.y + hero.speed * val.val;
    console.log(hero);
};
export default { readKeys };

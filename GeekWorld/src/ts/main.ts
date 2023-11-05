const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log("H: " + windowHeight + " W: " + windowWidth)

const imgsSec1: NodeListOf<HTMLImageElement> = document.querySelectorAll('[data="secHome__imgStatic"]')
const homeComponents = document.querySelectorAll('[data="secHome"]')

const sec2 = document.querySelector('[data="secTopA"]') as HTMLDivElement
const sec2ComponentsCards = sec2.querySelectorAll('[data="card"]') as NodeListOf<HTMLDivElement>

console.log(sec2ComponentsCards)

document.addEventListener('click', event => {
    // imgsSec1.forEach(img => {
    //     img.classList.toggle('translateZero')
    // })

    // homeComponents.forEach(comp => {
    //     comp.classList.toggle('opacityOff')
    // })
    let count = 0 
    sec2ComponentsCards.forEach( e => {
        setTimeout(() => {
            e.classList.toggle('translateZero')
        }, 100 * count);
        count++
    })
})
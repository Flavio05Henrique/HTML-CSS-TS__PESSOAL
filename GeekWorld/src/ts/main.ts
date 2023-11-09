type Section = HTMLDivElement

type itemMove = {
    item : HTMLElement | null,
    itens : NodeListOf<HTMLElement> | null,
    actionsAboutClass : string[]
}

type itemMoveEx = itemMove & {
    itensEx : NodeListOf<HTMLElement> | null,
    isEx : boolean
}

const secHome = document.querySelector('[data="secHome"]') as Section

let imgsSecHome : itemMove = { 
    item : null,
    itens : secHome.querySelectorAll('[data="secHome__imgStatic"]') as NodeListOf<HTMLImageElement>,
    actionsAboutClass :  ["translateZero"]
}

let logoNavBarSecHome : itemMove = {
    item : null,
    itens : secHome.querySelectorAll('[data="secHome__into"]') as NodeListOf<HTMLDivElement>,
    actionsAboutClass : ["opacityOff"]
}

const secTopA = document.querySelector('[data="secTopA"]') as Section

let lineSecTopA : itemMove = {
    item : secTopA.querySelector('[data="line"]') as HTMLDivElement,
    itens : null,
    actionsAboutClass : ["widthZero"]
}

let titleSecTopA : itemMove = {
    item : secTopA.querySelector('[data="title"]') as HTMLTitleElement,
    itens : null,
    actionsAboutClass : ["translateZero", "opacityOff"]
}

let sectionPoint = 0
const sections = [[imgsSecHome, logoNavBarSecHome], [lineSecTopA, titleSecTopA]] as itemMove[][] | itemMoveEx[][]

// const sec2ComponentsCards = sec2.querySelectorAll('[data="card"]') as NodeListOf<HTMLDivElement>
// const sec2TitleLine = sec2.querySelector('[data="line"]') as HTMLDivElement
// const sec2Title = sec2.querySelector('[data="title"]') as HTMLTitleElement

let scrollControl = {
    active: false
}

let d = 1

document.addEventListener('wheel', event => {
    if (!scrollControl.active) return

    scrollControl.active = false

    const currentSection = sections[sectionPoint]

    currentSection.forEach(e => {
        if (e.item != null) {
            e.actionsAboutClass.forEach(c => {
                e.item!.classList.toggle(c)
            })
            return
        }
        if (e.itens != null) {
           e.itens.forEach(i => {
                e.actionsAboutClass.forEach(c => {
                    i.classList.toggle(c)
                })
           })
           return
        }
        if (e.)
    })

    // let count : number
    // d > 0 ? count = 0 : count = sec2ComponentsCards.length -1
    // sec2ComponentsCards.forEach( e => {
    //     setTimeout(() => {
    //         e.classList.toggle('translateZero')
    //     }, 100 * count);
    //     count += d
    // })
    // d = d * -1
    setTimeout(() => scrollControl.active = true, 3000)
})

setTimeout(() => scrollControl.active = true, 1000)
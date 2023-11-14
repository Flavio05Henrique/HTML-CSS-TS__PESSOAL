type Section = HTMLDivElement

type itemMove = {
    item : HTMLElement | null,
    itens : NodeListOf<HTMLElement> | null,
    itensEx : Function | null,
    actionsAboutClass : string[]
}

const secHome = document.querySelector('[data="secHome"]') as Section

let secHomeC : itemMove = {
    item : secHome,
    itens : null,
    itensEx : null,
    actionsAboutClass :  ["ZIndexUp"]
}

let imgsSecHome : itemMove = { 
    item : null,
    itens : secHome.querySelectorAll('[data="secHome__imgStatic"]') as NodeListOf<HTMLImageElement>,
    itensEx : null,
    actionsAboutClass :  ["translateZero"]
}

let logoNavBarSecHome : itemMove = {
    item : null,
    itens : secHome.querySelectorAll('[data="secHome__into"]') as NodeListOf<HTMLDivElement>,
    itensEx : null,
    actionsAboutClass : ["opacityOff"]
}

const secTopA = document.querySelector('[data="secTopA"]') as Section

let secTopAC : itemMove = {
    item : secTopA,
    itens : null,
    itensEx : null,
    actionsAboutClass :  ["ZIndexUp"]
}

let lineSecTopA : itemMove = {
    item : secTopA.querySelector('[data="line"]') as HTMLDivElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["widthZero"]
}

let titleSecTopA : itemMove = {
    item : secTopA.querySelector('[data="title"]') as HTMLTitleElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["translateZero", "opacityOff"]
}

let d = 1

let cardsSecTopA : itemMove = {
    item : null,
    itens : null,
    itensEx : () => {
        const cards = secTopA.querySelectorAll('[data="card"]')
        let count : number
        d > 0 ? count = 0 : count = cards.length -1
        cards.forEach( e => {
            setTimeout(() => {
                e.classList.toggle('translateZero')
            }, 100 * count);
            count += d
        })
        d = d * -1
    },
    actionsAboutClass : []
}

let imgsSecTopA : itemMove = {
    item : null,
    itens : secTopA.querySelectorAll('[data="secHome__imgStatic"]'),
    itensEx : null,
    actionsAboutClass : ['translateZero']
}

const secReviews = document.querySelector('[data="secReviews"]') as Section

let secReviewsC : itemMove = {
    item : secReviews,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["ZIndexUp"]
}

let lineSecReviews : itemMove = {
    item : secReviews.querySelector('[data="line"]') as HTMLDivElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["widthZero"]
}

let titleSecReviews : itemMove = {
    item : secReviews.querySelector('[data="title"]') as HTMLTitleElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["translateZero", "opacityOff"]
}


let sectionPoint = 2
//Cada item de sections representa uma secton da pagina onde contain objs representando os elementos(imgs, divs, etc..) da pagina.
const sections = [[secHomeC, imgsSecHome, logoNavBarSecHome], 
                  [secTopAC, lineSecTopA, titleSecTopA, cardsSecTopA, imgsSecTopA],
                  [secReviewsC, lineSecReviews, titleSecReviews,]] as itemMove[][]

let scrollControl = {
    active: false
}

document.addEventListener('wheel', event => {
    if (!scrollControl.active) return

    scrollControl.active = false

    executeActions()

    // sectionPoint < sections.length -1 ? sectionPoint++ : sectionPoint = 0

    // setTimeout(() => executeActions(), 1000)

    setTimeout(() => scrollControl.active = true, 3000)
})

const executeActions = () => {
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
        if (e.itensEx != null) {
            e.itensEx()
        }
    })
}

executeActions()
setTimeout(() => scrollControl.active = true, 1000)
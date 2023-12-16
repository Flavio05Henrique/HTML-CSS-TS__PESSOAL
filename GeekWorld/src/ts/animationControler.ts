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

let cardsSecTopA : itemMove = {
    item : null,
    itens : null,
    itensEx : () => {
        slideOneByOneAnimation(secTopA)
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

let sliderSecReviews : itemMove = {
    item : secReviews.querySelector('[data="slider"]') as HTMLTitleElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["translateZero", "widthZero"]
}

let imgsSecReviews : itemMove = {
    item : null,
    itens : secReviews.querySelectorAll('[data="secReviews__imgStatic"]'),
    itensEx : null,
    actionsAboutClass : ["translateZero"]
}

let imgsSecReviews2 : itemMove = {
    item : null,
    itens : secReviews.querySelectorAll('[data="secReviews__imgStatic2"]'),
    itensEx : null,
    actionsAboutClass : ["secReviews__imgSplash"]
}

const secTopB = document.querySelector('[data="secTopB"]') as Section

let secTopBC : itemMove = {
    item : secTopB,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["ZIndexUp"]
}

let lineSecTopB : itemMove = {
    item : secTopB.querySelector('[data="line"]') as HTMLDivElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["widthZero"]
}

let titleSecTopB : itemMove = {
    item : secTopB.querySelector('[data="title"]') as HTMLTitleElement,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["translateZero", "opacityOff"]
}

let cardsSecTopB : itemMove = {
    item : null,
    itens : null,
    itensEx : () => {
        slideOneByOneAnimation(secTopB)
    },
    actionsAboutClass : []
}

const secTalkToUs = document.querySelector('[data="secTalkToUs"]') as Section

let secTalkToUsC : itemMove = {
    item : secTalkToUs,
    itens : null,
    itensEx : null,
    actionsAboutClass : ["ZIndexUp"]
}

let cardsSecTalkToUsC : itemMove = {
    item : null,
    itens : secTalkToUs.querySelectorAll('[dara="secTalkToUs__card"]'),
    itensEx : null,
    actionsAboutClass : ["translateZero"]
}

let footerSecTalkToUsC : itemMove = {
    item : secTalkToUs.querySelector('[data="secTalkToUs__footer"]'),
    itens : null,
    itensEx : null,
    actionsAboutClass : ["translateZero"]
}

let sectionPoint = 0
//Cada item de sections representa uma secton da pagina onde contain objs representando os elementos(imgs, divs, etc..) da pagina.
const sections = [[secHomeC, imgsSecHome, logoNavBarSecHome], 
                  [secTopAC, lineSecTopA, titleSecTopA, cardsSecTopA, imgsSecTopA],
                  [secReviewsC, lineSecReviews, titleSecReviews, sliderSecReviews, imgsSecReviews, imgsSecReviews2],
                  [secTopBC, lineSecTopB, titleSecTopB, cardsSecTopB],
                  [secTalkToUsC, cardsSecTalkToUsC, footerSecTalkToUsC]] as itemMove[][]

let scrollControl = {
    active: false
}

document.addEventListener('wheel', event => {
    if (!scrollControl.active) return

    scrollControl.active = false
    const scrollValue : number = event.deltaY
    const scrollYDirection : number = scrollValue == 100 ? 1 : -1

    executeAnimetionActions(null)

    if (scrollYDirection == 1) {
        sectionPoint < sections.length -1 ? sectionPoint ++ : sectionPoint = 0
    } else {
        sectionPoint > 0 ? sectionPoint-- : sectionPoint = sections.length - 1
    }

    setTimeout(() => executeAnimetionActions(null), 1000)

    setTimeout(() => scrollControl.active = true, 2500)
    
    activateReturnToTopBnt()
})

const executeAnimetionActions = (value : number | null) => {

    value != null ? sectionPoint = value : 0

    if(sectionPoint > sections.length -1 || sectionPoint < 0) sectionPoint = 0

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

let d = 1

const slideOneByOneAnimation = (section : Section) => {
    const cards = section.querySelectorAll('[data="card"]')
        let count : number
        d > 0 ? count = 0 : count = cards.length -1
        cards.forEach( e => {
            setTimeout(() => {
                e.classList.toggle('translateZero')
            }, 100 * count);
            count += d
        })
        d = d * -1
}

const getCurrentSection =  () : number => {
    return sectionPoint
}

executeAnimetionActions(null)
setTimeout(() => scrollControl.active = true, 1000)
import { slideOne } from "./slideToSection.js"

let scrollActive = true

export const activateScrollControl = (): void => {
    document.addEventListener('wheel', event => {
        if(!scrollActive) return
         
        const scrollValue : number = event.deltaY
        const scrollYDirection : number = scrollValue == 100 ? 1 : -1

        slideOne(scrollYDirection)

        scrollActive = false
        setTimeout(() => scrollActive = true, 500)
    })
}
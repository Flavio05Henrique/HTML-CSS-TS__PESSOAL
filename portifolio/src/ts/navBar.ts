import { slideToSection } from "./slideToSection.js"

const navBar = document.querySelector('[data="navBar"]') as HTMLDivElement
const navBarPointer = navBar.querySelector('[data="navBar__pointer"]') as HTMLDivElement
const navBarPointerColors: string[] = ["--cor_1", "--cor_2", "--cor_2", "--bg_contact"]

export const navBarActivateFunctions = () => {
    setTimeout(() => navBar.style.animation = "bgAnimated 5s infinite", 1000)
    
    navBar.addEventListener('click', event => {
        const elementClicked = event.target as HTMLElement

        if(elementClicked.tagName == "BUTTON") {
            const elementClickedAsButton = elementClicked as HTMLButtonElement
            const elementClickedGetId = parseInt(elementClickedAsButton.value)

            setPointerPosition(elementClicked)
            slideToSection(elementClickedGetId)
            setPointerColor(elementClickedGetId)
        }
    })
}

const resetSecSkillsBg = ():void => {
    const bg = document.querySelector('[data="secSkills__bg"]') as HTMLDivElement
    bg.classList.add('U-reset_transform')
}

const setPointerPosition = (elementClicked: HTMLElement): void => {
    const elementClickedValues = elementClicked.getClientRects()[0]
    const elementClickedPositionY = elementClickedValues.y
    const elementClickedHeight = elementClickedValues.height
    const navBarPointerPosition =  elementClickedPositionY + (elementClickedHeight / 2)

    navBarPointer.style.top = navBarPointerPosition + "px"
}

const setPointerColor = (number: number):void => {
    navBarPointer.style.borderRight = `15px solid var(${navBarPointerColors[number]})`
}


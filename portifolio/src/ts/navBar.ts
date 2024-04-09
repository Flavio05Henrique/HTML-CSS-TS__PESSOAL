const navBar = document.querySelector('[data="navBar"]') as HTMLDivElement
const navBarPointer = navBar.querySelector('[data="navBar__pointer"]') as HTMLDivElement
const sections = document.querySelectorAll('[data="section"]') as NodeListOf<HTMLDivElement>
let firstInteraction = false
const navBarPointerColors: string[] = ["var(--cor_1)", "var(--cor_2)", "var(--cor_2)"]

export const navBarActivateFunctions = () => {
    setTimeout(() => navBar.style.animation = "bgAnimated 5s infinite", 1000)
    
    navBar.addEventListener('click', event => {
        const elementClicked = event.target as HTMLElement

        if(elementClicked.tagName == "BUTTON") {
            setPointerPosition(elementClicked)
            slideToSection(elementClicked)
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

const slideToSection = (elementClicked: HTMLElement): void => {    
    const elementClickedAsButton = elementClicked as HTMLButtonElement
    const index: number = parseInt(elementClickedAsButton.value )

    sections[index].click()
    setPointerColor(index)

    if(!firstInteraction && elementClickedAsButton.value == '1') {
        firstInteraction = true
        resetSecSkillsBg()
    }
}

const setPointerColor = (number: number):void => {
    navBarPointer.style.borderRight = `15px solid ${navBarPointerColors[number]}`
}


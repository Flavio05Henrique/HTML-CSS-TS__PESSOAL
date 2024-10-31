import { createDraggableItem } from "./draggableItem.js"
import { containerInteractions } from "./draggableItensContainer.js"
import { draggableItemList } from "./draggableItensList.js"
import { htmlElementItemMove, htmlElementItemMoveShadow } from "./htmlELements.js"
import { mouseDownEvents } from "./mouseDownEvents.js"
import { mouseMoveEvents } from "./mouseMoveEvents.js"
import { mouseUpEvents } from "./mouseUpEvents.js"
import { moveDraggableItem } from "./moveDraggableItem.js"
import { showInfos } from "./Test/allCurrentInfo.js"
import { getHtmlElementPosition, setElementStyle } from "./utilities.js"

export const mouseInfo: IMouseInfo = {
    'positionX': 0,
    'positionY': 0,
    'positionStartedX': 0,
    'positionStartedY': 0,
    'movimenteRelativePositionStartedX': 0,
    'movimenteRelativePositionStartedY': 0,
    'pressed': false,
    'stepsUp': 60,
    'stepsDown': -60,
    'draggableItem': createDraggableItem()
}

const init = () => {  
    const draggableItem = mouseInfo.draggableItem
    const containerAuxiliary = containerInteractions.containerAuxiliary
    const containerPosition = containerInteractions.position

    containerAuxiliary.addEventListener('mousedown', event => {
        const elementClicked = event.target as HTMLElement
        const mousePositionX = event.clientX
        const mousePositionY = event.clientY

        if(elementClicked.className == "container") return

        setMousePositionStarted(mousePositionX, mousePositionY)
        setMousePosition(mousePositionX, mousePositionY)
        setDraggableItem(elementClicked)
        mouseDownEvents()
        // showInfos(mouseInfo)
        mouseInfo.pressed = true
    })

    containerAuxiliary.addEventListener('mouseup', event => {
        mouseUpEvents()
    })
    
    containerAuxiliary.addEventListener('mousemove', event => {
        const mousePositionX = event.clientX
        const mousePositionY = event.clientY
        const mousePositionXPrevious = mouseInfo.positionX
        const mousePositionYPrevious = mouseInfo.positionY
        
        if(draggableItem.mySelf && mouseInfo.pressed) {
            setMousePosition(mousePositionX, mousePositionY)
            setHtmlElementItemPosition()

            const mouseMovementX = mouseInfo.movimenteRelativePositionStartedX += mouseInfo.positionX - mousePositionXPrevious
            const mouseMovementY = mouseInfo.movimenteRelativePositionStartedY += mouseInfo.positionY - mousePositionYPrevious
            
            if(mouseMovementY >= mouseInfo.stepsUp || mouseMovementY <= mouseInfo.stepsDown) mouseMoveEvents(mousePositionX, mousePositionY)
            if(mouseMovementX >= mouseInfo.stepsUp || mouseMovementX <= mouseInfo.stepsDown) mouseMoveEvents(mousePositionX, mousePositionY)
            // showInfos(mouseInfo)
        }     
    })

    const setMousePosition = (x: number, y: number): void => {
        mouseInfo.positionX = x 
        mouseInfo.positionY = y 
    }

    const setMousePositionStarted = (x: number, y: number): void => {
        mouseInfo.positionStartedX = x 
        mouseInfo.positionStartedY = y 
    }

    const setHtmlElementItemPosition = (): void => {
        moveDraggableItem(draggableItem)
    }

    const setDraggableItem = (item: HTMLElement): void => {
        mouseInfo.draggableItem.mySelf = item
    }
}

export const draggableApp = () => {
    const app = {
        'init': init
    }

    return app
}
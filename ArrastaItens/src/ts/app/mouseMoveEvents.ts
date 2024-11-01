import { mouseInfo } from "./mouseInfo.js"
import { draggableItemList } from "./draggableItensList.js"
import { htmlElementItemMoveShadow } from "./htmlELements.js"
import { searchElementMovable } from "./utilities.js"

export const mouseMoveEvents = (mousePositionX: number, mousePositionY: number): void => {
    mouseInfo.movimenteRelativePositionStartedY = 0
    mouseInfo.movimenteRelativePositionStartedX = 0

    const getHoverElement = document.elementFromPoint(mousePositionX, mousePositionY) as HTMLElement
    const hoverElement = searchElementMovable(getHoverElement) as HTMLElement

    if(hoverElement == null) return
    
    const hoverElementId = parseInt(hoverElement.id)
    const currentDraggableItemId = mouseInfo.draggableItem.currentPositionInArray
    
    draggableItemList.replace(htmlElementItemMoveShadow(hoverElementId), hoverElementId)
    hoverElement.id = currentDraggableItemId + ''
    draggableItemList.replace(hoverElement.outerHTML, currentDraggableItemId)
    mouseInfo.draggableItem.currentPositionInArray = hoverElementId
}
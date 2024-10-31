import { mouseInfo } from "./draggableApp.js"
import { containerInteractions } from "./draggableItensContainer.js"
import { draggableItemList } from "./draggableItensList.js"

export const mouseUpEvents = (): void => {
    const draggableItem = mouseInfo.draggableItem.mySelf

    draggableItem.removeAttribute('style')
    draggableItem.id = mouseInfo.draggableItem.currentPositionInArray + ''
    draggableItemList.replace(draggableItem.outerHTML, mouseInfo.draggableItem.currentPositionInArray)
    containerInteractions.containerAuxiliary.removeChild(draggableItem)

    mouseInfo.pressed = false
}
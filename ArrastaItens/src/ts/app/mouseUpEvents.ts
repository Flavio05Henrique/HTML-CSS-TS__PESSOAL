import { mouseInfo } from "./mouseInfo.js"
import { containerInteractions } from "./draggableItensContainer.js"
import { draggableItemList } from "./draggableItensList.js"

export const mouseUpEvents = (): void => {
    const draggableItem = mouseInfo.draggableItem.mySelf

    draggableItem.removeAttribute('style')
    draggableItem.id = mouseInfo.draggableItem.currentPositionInArray + ''
    draggableItemList.replace(draggableItem.outerHTML, mouseInfo.draggableItem.currentPositionInArray)

    if(containerInteractions.containerAuxiliary.contains(draggableItem)) containerInteractions.containerAuxiliary.removeChild(draggableItem)

    mouseInfo.pressed = false
}
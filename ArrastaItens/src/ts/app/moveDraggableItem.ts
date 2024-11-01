import { mouseInfo } from "./mouseInfo.js";
import { containerInteractions } from "./draggableItensContainer.js";
import { setElementStyle } from "./utilities.js";

// const draggableItem = createDraggableItem()

export const moveDraggableItem = (draggableItem: IDraggableItem, containerPosition: IHtmlPosition): void => {
    draggableItem.mySelf.style.top = (draggableItem.position.y - containerPosition.y) + (mouseInfo.positionY - mouseInfo.positionStartedY) + "px"
    draggableItem.mySelf.style.left = (draggableItem.position.x - containerPosition.x) + (mouseInfo.positionX - mouseInfo.positionStartedX) + "px"
}

export const makeItMovable = (draggableItem: IDraggableItem): void => {
    setElementStyle(draggableItem.mySelf, "position: absolute; pointer-events: none")
}
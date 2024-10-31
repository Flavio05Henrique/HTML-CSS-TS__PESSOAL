import { mouseInfo } from "./draggableApp.js";
import { createDraggableItem } from "./draggableItem.js";
import { containerInteractions } from "./draggableItensContainer.js";
import { setElementStyle } from "./utilities.js";

// const draggableItem = createDraggableItem()

const containerPosition = containerInteractions.position

export const moveDraggableItem = (draggableItem: IDraggableItem): void => {
    draggableItem.mySelf.style.top = (draggableItem.position.y - containerPosition.y) + (mouseInfo.positionY - mouseInfo.positionStartedY) + "px"
    draggableItem.mySelf.style.left = (draggableItem.position.x - containerPosition.x) + (mouseInfo.positionX - mouseInfo.positionStartedX) + "px"
}

export const makeItMovable = (draggableItem: IDraggableItem): void => {
    setElementStyle(draggableItem.mySelf, "position: absolute; pointer-events: none")
}
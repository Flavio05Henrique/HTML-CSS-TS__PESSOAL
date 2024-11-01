import { mouseInfo } from "./mouseInfo.js";
import { setElementStyle } from "./utilities.js";
// const draggableItem = createDraggableItem()
export const moveDraggableItem = (draggableItem, containerPosition) => {
    draggableItem.mySelf.style.top = (draggableItem.position.y - containerPosition.y) + (mouseInfo.positionY - mouseInfo.positionStartedY) + "px";
    draggableItem.mySelf.style.left = (draggableItem.position.x - containerPosition.x) + (mouseInfo.positionX - mouseInfo.positionStartedX) + "px";
};
export const makeItMovable = (draggableItem) => {
    setElementStyle(draggableItem.mySelf, "position: absolute; pointer-events: none");
};

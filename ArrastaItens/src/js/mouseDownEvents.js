import { mouseInfo } from "./draggableApp.js";
import { containerInteractions } from "./draggableItensContainer.js";
import { htmlElementItemMoveShadow } from "./htmlELements.js";
import { moveDraggableItem, makeItMovable } from "./moveDraggableItem.js";
import { getHtmlElementPosition, setElementStyle } from "./utilities.js";
import { draggableItemList } from "./draggableItensList.js";
// const draggableItem = mouseInfo.draggableItem
export const mouseDownEvents = () => {
    const draggableItem = mouseInfo.draggableItem.mySelf;
    const draggableItemId = parseInt(draggableItem.id);
    const container = containerInteractions.container;
    const containerAuxiliary = containerInteractions.containerAuxiliary;
    mouseInfo.draggableItem.position = getHtmlElementPosition(draggableItem);
    setElementStyle(container, "user-select: none");
    makeItMovable(mouseInfo.draggableItem);
    containerAuxiliary.appendChild(draggableItem);
    moveDraggableItem(mouseInfo.draggableItem);
    draggableItemList.replace(htmlElementItemMoveShadow(draggableItemId), draggableItemId);
    mouseInfo.draggableItem.currentPositionInArray = draggableItemId;
};

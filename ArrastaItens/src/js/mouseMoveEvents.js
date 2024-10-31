import { mouseInfo } from "./draggableApp.js";
import { draggableItemList } from "./draggableItensList.js";
import { htmlElementItemMoveShadow } from "./htmlELements.js";
export const mouseMoveEvents = (mousePositionX, mousePositionY) => {
    const hoverElement = document.elementFromPoint(mousePositionX, mousePositionY);
    const hoverElementId = parseInt(hoverElement.id);
    const currentDraggableItemId = mouseInfo.draggableItem.currentPositionInArray;
    mouseInfo.movimenteRelativePositionStartedY = 0;
    mouseInfo.movimenteRelativePositionStartedX = 0;
    if (hoverElement.getAttribute('data') !== 'interactive_item_')
        return;
    draggableItemList.replace(htmlElementItemMoveShadow(hoverElementId), hoverElementId);
    hoverElement.id = currentDraggableItemId + '';
    draggableItemList.replace(hoverElement.outerHTML, currentDraggableItemId);
    mouseInfo.draggableItem.currentPositionInArray = hoverElementId;
};

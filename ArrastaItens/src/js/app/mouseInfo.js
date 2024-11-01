import { containerInteractions } from "./draggableItensContainer.js";
import { mouseDownEvents } from "./mouseDownEvents.js";
import { mouseMoveEvents } from "./mouseMoveEvents.js";
import { mouseUpEvents } from "./mouseUpEvents.js";
import { moveDraggableItem } from "./moveDraggableItem.js";
import { createDraggableItem, searchElementMovable } from "./utilities.js";
export const mouseInfo = {
    'positionX': 0,
    'positionY': 0,
    'positionStartedX': 0,
    'positionStartedY': 0,
    'movimenteRelativePositionStartedX': 0,
    'movimenteRelativePositionStartedY': 0,
    'pressed': false,
    'stepsUp': 80,
    'stepsDown': -80,
    'draggableItem': createDraggableItem()
};
const init = () => {
    const draggableItem = mouseInfo.draggableItem;
    const containerAuxiliary = containerInteractions.containerAuxiliary;
    containerAuxiliary.addEventListener('mousedown', event => {
        const elementClicked = event.target;
        const mousePositionX = event.clientX;
        const mousePositionY = event.clientY;
        setMousePositionStarted(mousePositionX, mousePositionY);
        setMousePosition(mousePositionX, mousePositionY);
        if (elementClicked.getAttribute('data-i') == null)
            return;
        setDraggableItem(elementClicked);
        if (mouseInfo.draggableItem.mySelf == null)
            return;
        mouseDownEvents();
        mouseInfo.pressed = true;
        // showInfos(mouseInfo)
    });
    containerAuxiliary.addEventListener('mouseup', event => {
        if (mouseInfo.draggableItem.mySelf == null)
            return;
        mouseUpEvents();
    });
    containerAuxiliary.addEventListener('mousemove', event => {
        const mousePositionX = event.clientX;
        const mousePositionY = event.clientY;
        const mousePositionXPrevious = mouseInfo.positionX;
        const mousePositionYPrevious = mouseInfo.positionY;
        if (draggableItem.mySelf != null && mouseInfo.pressed) {
            setMousePosition(mousePositionX, mousePositionY);
            moveDraggableItem(mouseInfo.draggableItem, containerInteractions.position);
            const mouseMovementX = mouseInfo.movimenteRelativePositionStartedX += mouseInfo.positionX - mousePositionXPrevious;
            const mouseMovementY = mouseInfo.movimenteRelativePositionStartedY += mouseInfo.positionY - mousePositionYPrevious;
            if (mouseMovementY >= mouseInfo.stepsUp || mouseMovementY <= mouseInfo.stepsDown)
                mouseMoveEvents(mousePositionX, mousePositionY);
            if (mouseMovementX >= mouseInfo.stepsUp || mouseMovementX <= mouseInfo.stepsDown)
                mouseMoveEvents(mousePositionX, mousePositionY);
        }
    });
    const setMousePosition = (x, y) => {
        mouseInfo.positionX = x;
        mouseInfo.positionY = y;
    };
    const setMousePositionStarted = (x, y) => {
        mouseInfo.positionStartedX = x;
        mouseInfo.positionStartedY = y;
    };
    const setDraggableItem = (item) => {
        const element = searchElementMovable(item);
        mouseInfo.draggableItem.mySelf = element;
    };
    const checkIfIsDraggableItem = (elementClicked) => {
        return (elementClicked.getAttribute('data-i') == "interactive_item_draggable");
    };
};
export const mouseInfoFunc = () => {
    const app = {
        'init': init
    };
    return app;
};

import { createDraggableItem, DraggableItemList } from "./draggableItem.js";
import { htmlElementItemMove, htmlElementItemMoveShadow } from "./htmlELements.js";
import { getHtmlElementPosition } from "./utilities.js";
const container = document.querySelector('.container');
const containerAuxiliary = document.querySelector('.container__auxiliary');
const mouseInfo = {
    'positionX': 0,
    'positionY': 0,
    'positionStartedX': 0,
    'positionStartedY': 0,
    'movimenteRelativePositionStartedX': 0,
    'movimenteRelativePositionStartedY': 0,
    'pressed': false,
    'stepsUp': 60,
    'stepsDown': -60
};
let draggableItem = createDraggableItem();
let draggableItemsList = DraggableItemList;
let containerPosition;
const initialize = () => {
    containerPosition = getHtmlElementPosition(containerAuxiliary);
};
const createElements = (numOfItens) => {
    let i;
    const list = [];
    container.innerHTML = "";
    for (i = 0; i <= numOfItens; i++) {
        container.innerHTML += htmlElementItemMove(i, i);
        list.push(htmlElementItemMove(i, i));
    }
    draggableItemsList.setList(list);
};
containerAuxiliary.addEventListener('mousedown', event => {
    const elementClicked = event.target;
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    if (elementClicked.className == "container")
        return;
    mouseDownEvents(elementClicked, mousePositionX, mousePositionY);
});
const mouseDownEvents = (elementClicked, mousePositionX, mousePositionY) => {
    draggableItem.position = getHtmlElementPosition(elementClicked);
    elementClicked.style.position = "absolute";
    elementClicked.style.pointerEvents = "none";
    container.style.userSelect = "none";
    containerAuxiliary.appendChild(elementClicked);
    draggableItem.mySelf = elementClicked;
    setMousePositionStarted(mousePositionX, mousePositionY);
    setMousePosition(mousePositionX, mousePositionY);
    setHtmlElementItemPosition();
    injectDraggableShadowItemInArray(parseInt(elementClicked.id));
    mouseInfo.pressed = true;
};
const injectDraggableShadowItemInArray = (id) => {
    draggableItemsList.replace(htmlElementItemMoveShadow(id), id);
    draggableItem.currentPositionInArray = id;
    updateContainerItems();
};
containerAuxiliary.addEventListener('mouseup', event => {
    mouseUpEvents();
});
const mouseUpEvents = () => {
    draggableItem.mySelf.removeAttribute('style');
    draggableItem.mySelf.id = draggableItem.currentPositionInArray + '';
    draggableItemsList.replace(draggableItem.mySelf.outerHTML, draggableItem.currentPositionInArray);
    containerAuxiliary.removeChild(draggableItem.mySelf);
    updateContainerItems();
    mouseInfo.pressed = false;
};
containerAuxiliary.addEventListener('mousemove', event => {
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    const mousePositionXPrevious = mouseInfo.positionX;
    const mousePositionYPrevious = mouseInfo.positionY;
    if (draggableItem.mySelf && mouseInfo.pressed) {
        setMousePosition(mousePositionX, mousePositionY);
        const mouseMovementX = mouseInfo.movimenteRelativePositionStartedX += mouseInfo.positionX - mousePositionXPrevious;
        const mouseMovementY = mouseInfo.movimenteRelativePositionStartedY += mouseInfo.positionY - mousePositionYPrevious;
        if (mouseMovementY >= mouseInfo.stepsUp || mouseMovementY <= mouseInfo.stepsDown)
            changeDraggableElements(mousePositionX, mousePositionY);
        if (mouseMovementX >= mouseInfo.stepsUp || mouseMovementX <= mouseInfo.stepsDown)
            changeDraggableElements(mousePositionX, mousePositionY);
        setHtmlElementItemPosition();
    }
});
const changeDraggableElements = (mousePositionX, mousePositionY) => {
    const hoverElement = document.elementFromPoint(mousePositionX, mousePositionY);
    const hoverElementId = parseInt(hoverElement.id);
    const currentDraggableItemId = draggableItem.currentPositionInArray;
    mouseInfo.movimenteRelativePositionStartedY = 0;
    if (hoverElement.getAttribute('data') !== 'interactive_item_')
        return;
    draggableItemsList.replace(htmlElementItemMoveShadow(hoverElementId), hoverElementId);
    hoverElement.id = currentDraggableItemId + '';
    draggableItemsList.replace(hoverElement.outerHTML, currentDraggableItemId);
    draggableItem.currentPositionInArray = hoverElementId;
    updateContainerItems();
};
const setMousePosition = (x, y) => {
    mouseInfo.positionX = x - mouseInfo.positionStartedX + (draggableItem.position.x - containerPosition.x);
    mouseInfo.positionY = y - mouseInfo.positionStartedY + (draggableItem.position.y - containerPosition.y);
};
const setMousePositionStarted = (x, y) => {
    mouseInfo.positionStartedX = x;
    mouseInfo.positionStartedY = y;
};
const setHtmlElementItemPosition = () => {
    draggableItem.mySelf.style.top = mouseInfo.positionY + "px";
    draggableItem.mySelf.style.left = mouseInfo.positionX + "px";
};
const updateContainerItems = () => {
    container.innerHTML = draggableItemsList.getList().join('');
};
createElements(6);
initialize();
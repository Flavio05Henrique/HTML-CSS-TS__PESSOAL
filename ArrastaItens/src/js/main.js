import { htmlElementItemMove, htmlElementItemMoveShadow } from "./htmlELements.js";
const container = document.querySelector('.container');
const containerAuxiliary = document.querySelector('.container__auxiliary');
const mouseInfo = {
    'positionX': 0,
    'positionY': 0,
    'positionStartedX': 0,
    'positionStartedY': 0,
    'pressed': false,
};
let mouseMovementY = 0;
let mouseMovementX = 0;
let elementClickedCopy;
let counter = 0;
let containerPosition;
let elementDraggablePosition;
let draggableElementHtmlDimensions;
let draggableElementCurrentPositionInArray;
let draggableElementInitPositionInArray;
let draggableItemsList = [];
const initialize = () => {
    containerPosition = getHtmlElementPosition(containerAuxiliary);
    const exampleElement = container.querySelector('[data="interactive_item_"]');
    draggableElementHtmlDimensions = getHtmlElementPosition(exampleElement);
};
const createList = (list) => {
    draggableItemsList = list;
};
const createElements = (numOfItens) => {
    let i;
    const list = [];
    container.innerHTML = "";
    for (i = 0; i <= numOfItens; i++) {
        container.innerHTML += htmlElementItemMove(i, i);
        list.push(htmlElementItemMove(i, i));
    }
    createList(list);
};
containerAuxiliary.addEventListener('mousedown', event => {
    const elementClicked = event.target;
    if (elementClicked.className == "container")
        return;
    elementClicked.style.position = "absolute";
    elementClicked.style.pointerEvents = "none";
    elementDraggablePosition = getHtmlElementPosition(elementClicked);
    containerAuxiliary.appendChild(elementClicked);
    elementClickedCopy = elementClicked;
    setMousePositionInit(event.clientX, event.clientY);
    setMousePosition(event.clientX, event.clientY);
    setHtmlElementItemPosition();
    const id = parseInt(elementClicked.id);
    draggableItemsList[id] = htmlElementItemMoveShadow(elementClicked.id);
    draggableElementCurrentPositionInArray = id;
    draggableElementInitPositionInArray = id;
    updateContainerItems();
    mouseInfo.pressed = true;
});
containerAuxiliary.addEventListener('mouseup', event => {
    elementClickedCopy.removeAttribute('style');
    elementClickedCopy.id = draggableElementCurrentPositionInArray + '';
    draggableItemsList[draggableElementCurrentPositionInArray] = elementClickedCopy.outerHTML;
    containerAuxiliary.removeChild(elementClickedCopy);
    updateContainerItems();
    mouseInfo.pressed = false;
});
containerAuxiliary.addEventListener('mousemove', event => {
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    const stepsUp = 60;
    const stepsDown = -60;
    const mousePositionXPrevious = mouseInfo.positionX;
    const mousePositionYPrevious = mouseInfo.positionY;
    let mouseDirectionX = 0;
    let mouseDirectionY = 0;
    if (elementClickedCopy && mouseInfo.pressed) {
        setMousePosition(mousePositionX, mousePositionY);
        mouseDirectionX = mouseInfo.positionX > mousePositionXPrevious ? 1 : -1;
        mouseDirectionY = mouseInfo.positionY > mousePositionYPrevious ? 1 : -1;
        mouseMovementX += mouseDirectionX;
        mouseMovementY += mouseInfo.positionY - mousePositionYPrevious;
        if (mouseMovementY >= stepsUp || mouseMovementY <= stepsDown) {
            const hoverElement = document.elementFromPoint(mousePositionX, mousePositionY);
            const hoverElementId = parseInt(hoverElement.id);
            const id = draggableElementCurrentPositionInArray;
            const initId = parseInt(elementClickedCopy.id);
            mouseMovementY = 0;
            if (hoverElement.getAttribute('data') !== 'interactive_item_')
                return;
            draggableItemsList[hoverElementId] = htmlElementItemMoveShadow(hoverElementId);
            hoverElement.id = id + '';
            draggableItemsList[id] = hoverElement.outerHTML;
            draggableElementCurrentPositionInArray = hoverElementId;
            updateContainerItems();
            console.log('counter');
        }
        setHtmlElementItemPosition();
    }
});
const setMousePosition = (x, y) => {
    mouseInfo.positionX = x - mouseInfo.positionStartedX + (elementDraggablePosition.x - containerPosition.x);
    mouseInfo.positionY = y - mouseInfo.positionStartedY + (elementDraggablePosition.y - containerPosition.y);
};
const setMousePositionInit = (x, y) => {
    mouseInfo.positionStartedX = x;
    mouseInfo.positionStartedY = y;
};
const setHtmlElementItemPosition = () => {
    elementClickedCopy.style.top = mouseInfo.positionY + "px";
    elementClickedCopy.style.left = mouseInfo.positionX + "px";
};
const updateContainerItems = () => {
    container.innerHTML = draggableItemsList.join('');
};
const getHtmlElementHtmlDimensions = (element) => {
    const HtmlDimensions = {
        'width': element.clientWidth,
        'heigh': element.clientHeight
    };
    return HtmlDimensions;
};
const getHtmlElementPosition = (element) => {
    const HtmlPosition = {
        'x': element.getBoundingClientRect().left,
        'y': element.getBoundingClientRect().top
    };
    return HtmlPosition;
};
createElements(3);
initialize();
console.log(draggableItemsList);

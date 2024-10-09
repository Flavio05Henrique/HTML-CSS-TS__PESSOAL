import { htmlElementItemMove } from "./htmlELements.js";
const container = document.querySelector('.container');
const containerAuxiliary = document.querySelector('.container__auxiliary');
let mousePointX = 0;
let mousePointY = 0;
let mousePointInitX = 0;
let mousePointInitY = 0;
let mouseMovementY = 0;
let mouseMovementX = 0;
let clickOn = false;
let elementClickedCopy;
let positionAdjustmentX;
let positionAdjustmentY;
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
    positionAdjustmentX = draggableElementHtmlDimensions.x;
    positionAdjustmentY = draggableElementHtmlDimensions.y;
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
    setElementItemPosition();
    const id = parseInt(elementClicked.id);
    draggableItemsList[id] = `
        <div class="item item__shadow" id="${elementClicked.id}">
        </div>
    `;
    draggableElementCurrentPositionInArray = id;
    draggableElementInitPositionInArray = id;
    updateDraggableItems();
    clickOn = true;
});
containerAuxiliary.addEventListener('mouseup', event => {
    // elementClicked.style.position = "static" 
    containerAuxiliary.removeChild(elementClickedCopy);
    clickOn = false;
});
containerAuxiliary.addEventListener('mousemove', event => {
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    const stepsUp = 100;
    const stepsDown = -100;
    const mousePositionXPrevious = mousePointX;
    const mousePositionYPrevious = mousePointY;
    let mouseDirectionX = 0;
    let mouseDirectionY = 0;
    // console.log("x: ", mousePointX, "y: ", mousePointY)
    if (elementClickedCopy && clickOn) {
        setMousePosition(mousePositionX, mousePositionY);
        mouseDirectionX = mousePointX > mousePositionXPrevious ? 1 : -1;
        mouseDirectionY = mousePointY > mousePositionYPrevious ? 1 : -1;
        mouseMovementX += mouseDirectionX;
        mouseMovementY += mousePointY - mousePositionYPrevious;
        if (mouseMovementY >= stepsUp || mouseMovementY <= stepsDown) {
            const hoverElement = document.elementFromPoint(mousePositionX, mousePositionY);
            const hoverElementId = parseInt(hoverElement.id);
            const id = draggableElementCurrentPositionInArray;
            const initId = draggableElementInitPositionInArray;
            console.log('andou');
            mouseMovementY = 0;
            // console.log(htmlElementItemMove(id))
            if (hoverElementId == id)
                return;
            draggableItemsList[hoverElementId] = htmlElementItemMove(initId, hoverElementId);
            draggableItemsList[id] = htmlElementItemMove(hoverElementId, id);
            draggableElementCurrentPositionInArray = hoverElementId;
            console.log(draggableElementCurrentPositionInArray);
            // console.log(draggableElementPositionInArray)
        }
        // console.log(mouseMovementY)
        // console.log('mouse')
        // console.log(mousePositionX - mousePointInitX)
        // console.log(mousePointX - mousePointInitX)
        updateDraggableItems();
        setElementItemPosition();
    }
});
const setMousePosition = (x, y) => {
    mousePointX = x - mousePointInitX + (elementDraggablePosition.x - containerPosition.x);
    mousePointY = y - mousePointInitY + (elementDraggablePosition.y - containerPosition.y);
};
const setMousePositionInit = (x, y) => {
    mousePointInitX = x;
    mousePointInitY = y;
};
const setElementItemPosition = () => {
    elementClickedCopy.style.top = mousePointY + "px";
    elementClickedCopy.style.left = mousePointX + "px";
};
const updateDraggableItems = () => {
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
    const position = {
        'x': element.getBoundingClientRect().left,
        'y': element.getBoundingClientRect().top
    };
    return position;
};
createElements(3);
initialize();
console.log(draggableItemsList);

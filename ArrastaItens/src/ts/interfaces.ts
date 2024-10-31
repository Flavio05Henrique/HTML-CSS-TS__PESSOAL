interface IHtmlDimensions {
    'width': any,
    'heigh': any
}

interface IHtmlPosition {
    'x': number,
    'y': number
}

interface IMouseInfo {
    'positionX': number,
    'positionY': number,
    'positionStartedX': number,
    'positionStartedY': number,
    'movimenteRelativePositionStartedX': number,
    'movimenteRelativePositionStartedY': number,
    'pressed': boolean,
    'stepsUp': number,
    'stepsDown': number,
    'draggableItem': IDraggableItem
}

interface IDraggableItem {
    'mySelf': HTMLElement,
    'position': IHtmlPosition,
    'currentPositionInArray': number
}
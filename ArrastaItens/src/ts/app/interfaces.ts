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
    'interactivePart': HTMLElement
    'position': IHtmlPosition,
    'currentPositionInArray': number
}

interface IContainer {
    'container': HTMLElement,
    'containerAuxiliary': HTMLElement,
    'position': IHtmlPosition,
    'update': () => void
}

interface IForInicialize {
    'container': HTMLElement,
    'containerAuxiliary': HTMLElement,
    'list': string[]
}


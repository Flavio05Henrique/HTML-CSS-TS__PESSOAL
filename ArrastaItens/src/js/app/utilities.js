export const getHtmlElementPosition = (element) => {
    const HtmlPosition = {
        'x': element.getBoundingClientRect().left,
        'y': element.getBoundingClientRect().top
    };
    return HtmlPosition;
};
export const setElementStyle = (element, style) => {
    element.setAttribute('style', style);
};
export const clearElementStyle = (element) => {
    element.removeAttribute('style');
};
export const createDraggableItem = () => {
    const draggableItem = {
        'mySelf': document.createElement('div'),
        'interactivePart': document.createElement('div'),
        'position': { 'x': 0, 'y': 0 },
        'currentPositionInArray': 0
    };
    return draggableItem;
};
export const searchElementMovable = (element) => {
    if (element) {
        if (element.getAttribute('data-c') != "container") {
            if (element.getAttribute('data-m') == "interactive_item_draggable")
                return element;
            return searchElementMovable(element.parentNode);
        }
    }
    return null;
};

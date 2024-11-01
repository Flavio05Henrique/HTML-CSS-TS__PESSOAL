export const getHtmlElementPosition = (element: HTMLElement): IHtmlPosition => {
    const HtmlPosition = {
        'x': element.getBoundingClientRect().left,
        'y': element.getBoundingClientRect().top
    }

    return HtmlPosition
}

export const setElementStyle = (element: HTMLElement, style: string): void =>  {
    element.setAttribute('style', style)
}

export const clearElementStyle = (element: HTMLElement): void => {
    element.removeAttribute('style')
}

export const createDraggableItem = (): IDraggableItem => {
    const draggableItem: IDraggableItem = {
        'mySelf': document.createElement('div'),
        'interactivePart': document.createElement('div'),
        'position': {'x': 0, 'y': 0},
        'currentPositionInArray': 0
    }

    return draggableItem
}

export const searchElementMovable = (element: HTMLElement | null): HTMLElement | null => {
    if(element){
        if(element.getAttribute('data-c') != "container") {
            if(element.getAttribute('data-m') == "interactive_item_draggable") return element
            return searchElementMovable(element.parentNode as HTMLElement)
        }
    }
    return null
}

 
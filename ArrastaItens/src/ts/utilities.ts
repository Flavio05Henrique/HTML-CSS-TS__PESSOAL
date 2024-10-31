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
 
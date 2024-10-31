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

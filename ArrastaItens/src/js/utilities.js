export const getHtmlElementPosition = (element) => {
    const HtmlPosition = {
        'x': element.getBoundingClientRect().left,
        'y': element.getBoundingClientRect().top
    };
    return HtmlPosition;
};
// const getHtmlElementHtmlDimensions = (element: HTMLElement): IHtmlDimensions => {
//     const HtmlDimensions = {
//          'width': element.clientWidth,
//          'heigh': element.clientHeight
//      }
//      return HtmlDimensions
//  }

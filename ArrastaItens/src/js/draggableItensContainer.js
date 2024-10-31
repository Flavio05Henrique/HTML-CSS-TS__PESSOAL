import { draggableItemList } from "./draggableItensList.js";
import { getHtmlElementPosition } from "./utilities.js";
const container = document.querySelector('[data="container"]');
const containerAuxiliary = document.querySelector('[data="container__auxiliary"]');
const upDate = () => {
    container.innerHTML = draggableItemList.getList().join("");
};
export const containerInteractions = {
    'container': container,
    'containerAuxiliary': containerAuxiliary,
    'position': getHtmlElementPosition(container),
    'update': upDate
};

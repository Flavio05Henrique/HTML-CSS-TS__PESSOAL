import { draggableItemList } from "./draggableItensList.js";
import { getHtmlElementPosition } from "./utilities.js";
export let containerInteractions;
export const setContainerInteractions = (container, containerAuxiliary) => {
    const upDate = () => {
        container.innerHTML = draggableItemList.getList().join("");
    };
    containerInteractions = {
        'container': container,
        'containerAuxiliary': containerAuxiliary,
        'position': getHtmlElementPosition(container),
        'update': upDate
    };
    console.log(containerInteractions);
};

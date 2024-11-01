import { draggableItemList } from "./draggableItensList.js"
import { getHtmlElementPosition } from "./utilities.js"

export let containerInteractions: IContainer

export const setContainerInteractions = (container: HTMLElement, containerAuxiliary: HTMLElement) => {  
    const upDate = (): void => {
        container.innerHTML = draggableItemList.getList().join("")
    }

    containerInteractions = {
        'container': container,
        'containerAuxiliary': containerAuxiliary,
        'position': getHtmlElementPosition(container),
        'update': upDate
    }
    console.log(containerInteractions)
}
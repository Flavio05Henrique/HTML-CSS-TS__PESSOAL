import { draggableItemList } from "./draggableItensList.js"
import { getHtmlElementPosition } from "./utilities.js"

const container =  document.querySelector('[data="container"]') as HTMLDivElement
const containerAuxiliary = document.querySelector('[data="container__auxiliary"]') as HTMLElement


const upDate = (): void => {
    container.innerHTML = draggableItemList.getList().join("")
}

export const containerInteractions = {
    'container': container,
    'containerAuxiliary': containerAuxiliary,
    'position': getHtmlElementPosition(container),
    'update': upDate
}
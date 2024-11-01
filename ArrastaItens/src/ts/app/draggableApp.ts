import { setContainerInteractions } from "./draggableItensContainer.js"
import { draggableItemList } from "./draggableItensList.js"
import {mouseInfoFunc } from "./mouseInfo.js"

const initSimple = (item: IForInicialize): void => {
    setContainerInteractions(item.container, item.containerAuxiliary)
    draggableItemList.setList(item.list)
    mouseInfoFunc().init()
}

const initComplex = (item: IForInicialize): void => {
    setContainerInteractions(item.container, item.containerAuxiliary)
    draggableItemList.setList(item.list)
    mouseInfoFunc().init()
}

export const draggableApp = {
    'init': initSimple
}
import { draggableApp } from "./app/draggableApp.js";
import { containerInteractions } from "./app/draggableItensContainer.js";
import { draggableItemList } from "./app/draggableItensList.js";
import { htmlElementItemMove } from "./app/htmlELements.js";


const container =  document.querySelector('[data-c="container"]') as HTMLDivElement
const containerAuxiliary = document.querySelector('[data="container__auxiliary"]') as HTMLElement

const createElements = (numOfItens: number) : string[] => {
    let i
    const list = []
    
    container.innerHTML = ""
    for(i = 0; i <= numOfItens; i++) {
        container.innerHTML += htmlElementItemMove(i, i)
        list.push(htmlElementItemMove(i, i))
    }
    return list
}

const init: IForInicialize = {
    'container': container,
    'containerAuxiliary': containerAuxiliary,
    'list': createElements(5)
}

draggableApp.init(init)
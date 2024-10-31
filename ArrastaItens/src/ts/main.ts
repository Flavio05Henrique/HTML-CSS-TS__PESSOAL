import { draggableApp } from "./draggableApp.js";
import { containerInteractions } from "./draggableItensContainer.js";
import { draggableItemList } from "./draggableItensList.js";
import { htmlElementItemMove } from "./htmlELements.js";
import { showInfos } from "./Test/allCurrentInfo.js";

const createElements = (numOfItens: number) :void => {
    let i
    const list = []
    const container = containerInteractions.container
    
    container.innerHTML = ""
    for(i = 0; i <= numOfItens; i++) {
        container.innerHTML += htmlElementItemMove(i, i)
        list.push(htmlElementItemMove(i, i))
    }
    draggableItemList.setList(list)
}

createElements(5)

draggableApp().init()
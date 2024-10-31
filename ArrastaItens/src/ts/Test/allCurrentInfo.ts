import { mouseInfo } from "../draggableApp.js";
import { containerInteractions } from "../draggableItensContainer.js";



export const showInfos = (mouseInfo: IMouseInfo): void => {
    const info = {
        'mouse': mouseInfo,
        'element': mouseInfo.draggableItem
    }
    console.clear()
    for(const chave in info.mouse){
        const c = chave as keyof IMouseInfo
        console.log(chave + " " + info.mouse[c])
    }
    console.log('Elemento posição')
    for(const chave in info.element.position){
        const c = chave as keyof IHtmlPosition
        console.log(chave + " " + info.mouse.draggableItem.position[c])
    }
    console.log("COntainer")
    console.log(containerInteractions.position)
}
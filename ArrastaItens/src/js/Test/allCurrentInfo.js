import { containerInteractions } from "../app/draggableItensContainer.js";
export const showInfos = (mouseInfo) => {
    const info = {
        'mouse': mouseInfo,
        'element': mouseInfo.draggableItem
    };
    console.clear();
    for (const chave in info.mouse) {
        const c = chave;
        console.log(chave + " " + info.mouse[c]);
    }
    console.log('Elemento posição');
    for (const chave in info.element.position) {
        const c = chave;
        console.log(chave + " " + info.mouse.draggableItem.position[c]);
    }
    console.log("COntainer");
    console.log(containerInteractions.position);
};

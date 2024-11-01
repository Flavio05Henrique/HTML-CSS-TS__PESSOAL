import { containerInteractions } from "./draggableItensContainer.js";
let draggableItensList = [];
export const draggableItemList = {
    'getList': () => {
        return [...draggableItensList];
    },
    'setList': (list) => {
        draggableItensList = list;
        containerInteractions.update();
    },
    'setItem': (item) => {
        draggableItensList.push(item);
        containerInteractions.update();
    },
    'replace': (item, id) => {
        draggableItensList[id] = item;
        containerInteractions.update();
    }
};

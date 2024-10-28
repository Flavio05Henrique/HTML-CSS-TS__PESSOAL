export const createDraggableItem = () => {
    const draggableItem = {
        'mySelf': document.createElement('div'),
        'position': { 'x': 0, 'y': 0 },
        'currentPositionInArray': 0
    };
    return draggableItem;
};
let draggableItensList = [];
export const DraggableItemList = {
    'getList': () => {
        return [...draggableItensList];
    },
    'setList': (list) => {
        draggableItensList = list;
    },
    'setItem': (item) => {
        draggableItensList.push(item);
    },
    'replace': (item, id) => {
        draggableItensList[id] = item;
    }
};

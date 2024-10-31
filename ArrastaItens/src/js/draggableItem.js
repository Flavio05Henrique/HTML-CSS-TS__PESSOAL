export const createDraggableItem = () => {
    const draggableItem = {
        'mySelf': document.createElement('div'),
        'position': { 'x': 0, 'y': 0 },
        'currentPositionInArray': 0
    };
    return draggableItem;
};

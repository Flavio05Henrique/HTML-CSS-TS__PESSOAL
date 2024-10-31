export const createDraggableItem = (): IDraggableItem => {
    const draggableItem: IDraggableItem = {
        'mySelf': document.createElement('div'),
        'position': {'x': 0, 'y': 0},
        'currentPositionInArray': 0
    }

    return draggableItem
}

export const createDraggableItem = (): IDraggableItem => {
    const draggableItem: IDraggableItem = {
        'mySelf': document.createElement('div'),
        'position': {'x': 0, 'y': 0},
        'currentPositionInArray': 0
    }

    return draggableItem
}

let draggableItensList:string[] = []

export const DraggableItemList = {
    'getList': (): string[] => {
        return [...draggableItensList]
    },
    'setList': (list: string[]) => {
        draggableItensList = list
    },
    'setItem': (item: string) => {
        draggableItensList.push(item)
    },
    'replace': (item: string, id: number) => {
        draggableItensList[id] = item
    }
}


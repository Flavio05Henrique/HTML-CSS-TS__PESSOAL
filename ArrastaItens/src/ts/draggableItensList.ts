import { containerInteractions } from "./draggableItensContainer.js"

let draggableItensList:string[] = []

export const draggableItemList = {
    'getList': (): string[] => {
        return [...draggableItensList]
    },
    'setList': (list: string[]) => {
        draggableItensList = list
        containerInteractions.update()
    },
    'setItem': (item: string) => {
        draggableItensList.push(item)
        containerInteractions.update()
    },
    'replace': (item: string, id: number) => {
        draggableItensList[id] = item
        containerInteractions.update()
    }
}

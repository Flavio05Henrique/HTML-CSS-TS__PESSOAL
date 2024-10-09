export const htmlElementItemMove = (num : number = 0, id: number) :string => {
    return `<div class="item" data="interactive_item_" id="${id}">
                ${num}
            </div>`
}
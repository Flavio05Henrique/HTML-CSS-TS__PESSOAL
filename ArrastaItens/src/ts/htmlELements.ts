// export const htmlElementItemMove = (num : number = 0, id: number) :string => {
//     return `<div class="item" data="interactive_item_" id="${id}">
//                 ${num}
//             </div>`
// }

// export const htmlElementItemMoveShadow = (id: number|string): string => {
//     return `<div class="item item__shadow" id="${id}">
//             </div>`
// }

export const htmlElementItemMove = (num : number = 0, id: number) :string => {
    return `<div class="itemGrid" data="interactive_item_" id="${id}">
                ${num}
            </div>`
}

export const htmlElementItemMoveShadow = (id: number|string): string => {
    return `<div class="itemGrid itemGrid__shadow" id="${id}">
            </div>`
}
export const htmlElementItemMove = (num = 0, id) => {
    return `<div class="item"  data-m="interactive_item_draggable"   data-i="interactive_item_draggable" id="${id}">
                ${num}
                <button class="item__draggable__bnt" ><button class="item__draggable__bnt2"  >${id}</button></button>
            </div>`;
};
export const htmlElementItemMoveShadow = (id) => {
    return `<div class="item item__shadow" id="${id}">
            </div>`;
};
// export const htmlElementItemMove = (num : number = 0, id: number) :string => {
//     return `<div class="itemGrid" data="interactive_item_draggable" id="${id}">
//                 ${num}
//             </div>`
// }
// export const htmlElementItemMoveShadow = (id: number|string): string => {
//     return `<div class="itemGrid itemGrid__shadow" id="${id}">
//             </div>`
// }

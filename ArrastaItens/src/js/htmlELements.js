export const htmlElementItemMove = (num = 0, id) => {
    return `<div class="item" data="interactive_item_" id="${id}">
                ${num}
            </div>`;
};
export const htmlElementItemMoveShadow = (id) => {
    return `<div class="item item__shadow" id="${id}">
            </div>`;
};

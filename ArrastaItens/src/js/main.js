import { draggableApp } from "./app/draggableApp.js";
import { htmlElementItemMove } from "./app/htmlELements.js";
const container = document.querySelector('[data-c="container"]');
const containerAuxiliary = document.querySelector('[data="container__auxiliary"]');
const createElements = (numOfItens) => {
    let i;
    const list = [];
    container.innerHTML = "";
    for (i = 0; i <= numOfItens; i++) {
        container.innerHTML += htmlElementItemMove(i, i);
        list.push(htmlElementItemMove(i, i));
    }
    return list;
};
const init = {
    'container': container,
    'containerAuxiliary': containerAuxiliary,
    'list': createElements(5)
};
draggableApp.init(init);

"use strict";
const formSearchName = document.querySelector('[data="formSearchName"]');
const inputSearchName = document.querySelector('[data="inputSearchName"]');
const resetSeartBnt = document.querySelector('[data="seach__reset"]');
const HTMLBody = document.querySelector('[data="body"]');
const seachFilterBnt = document.querySelector('[data="seachFilter"]');
formSearchName.addEventListener('submit', event => {
    event.preventDefault();
    searchNameInMyList(inputSearchName.value);
});
const searchNameInMyList = (name) => {
    const treatedName = name.toLocaleLowerCase().replaceAll(' ', '');
    const itemsFound = MyList.filter(item => item.searchName.includes(treatedName));
    loadMyListInDom(itemsFound);
};
resetSeartBnt.addEventListener('click', event => {
    inputSearchName.value = "";
    loadMyListInDom(MyList);
});
seachFilterBnt.addEventListener('click', event => {
    console.log(event.clientX);
    console.log(event.clientY);
    openSearchPopUp(event.clientX, event.clientY);
});
const openSearchPopUp = (x, y) => {
    HTMLBody.innerHTML += `
        <div class="searchPopUp__container" style="top: ${y + 15}px; left: ${x}px">
            <div>
                <h3 class="searchPopUp__title">Obra ativa :</h3>
                <input type="checkbox">
            </div>
            <div>
                <h3 class="searchPopUp__title">Nota :</h3>
                <select>
                
                </select>
            </div>
            <div>
                <h3 class="searchPopUp__title">Gênero :</h3>
                <select>
                
                </select>
            </div>
            <div>
                <h3 class="searchPopUp__title">Tipo :</h3>
                <select>
                </select>
            </div>
            <button class="searchPopUp__bnt">Filtrar</button>
        </div>
    `;
};

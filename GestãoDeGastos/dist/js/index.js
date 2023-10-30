"use strict";
const expenseList = document.querySelector('[data="expenseList"]');
let expenseListItens = [];
const totalProfil = document.querySelector('[data="expenseListCard__totalProfil"]');
const totalExpense = document.querySelector('[data="expenseListCard__totalExpense"]');
const totalGeneral = document.querySelector('[data="expenseListCard__total"]');
const validateExpenseForm = (expenseDescreption, priceExpense) => {
    const expenseDescreptionRegex = /^[a-zA-Z]+$/;
    const priceExpenseRegex = /^[+\-]\d{1,3}(?:\.\d{3})*(?:,\d{2})$/;
    if (expenseDescreptionRegex.test(expenseDescreption.value) || priceExpenseRegex.test(priceExpense.value)) {
        return true;
    }
    return false;
};
const createCardExpense = (expenseItem) => {
    const expenseOrProfit = expenseItem.val > 0 ? 'expenseListCard__item--green' : 'expenseListCard__item--red';
    expenseList.innerHTML += `
        <li class="expenseListCard__item ${expenseOrProfit}" id="${expenseItem.id}">
            ${expenseItemContent(expenseItem.desc, (expenseItem.val.toFixed(2) + '').replace('.', ','))}
        </li>
    `;
};
const expenseItemContent = (description, price) => {
    return `
        <p class="expenseListCard__description">${description}</p>
        <p class="expenseListCard__price">${price}</p>
        <button class="expenseListCard__bntEdit expenseListCard__bnt" value="edit"></button>
        <button class="expenseListCard__bntDelet expenseListCard__bnt" value="delet"></button>
    `;
};
const updateTotalProfil = () => {
    const calculateValue = expenseListItens
        .filter(element => element.val > 0)
        .reduce((acc, element) => acc + element.val, 0)
        .toFixed(2);
    return calculateValue;
};
const updateTotalExpense = () => {
    const calculateValue = expenseListItens
        .filter(element => element.val < 0)
        .reduce((acc, element) => acc + element.val, 0)
        .toFixed(2);
    return calculateValue;
};
const updateTotal = () => {
    const calculateValue = expenseListItens
        .reduce((acc, element) => acc + element.val, 0)
        .toFixed(2);
    return calculateValue;
};
const updateAllTotalValues = () => {
    totalProfil.innerHTML = updateTotalProfil() + '';
    totalGeneral.innerHTML = updateTotal() + '';
    totalExpense.innerHTML = updateTotalExpense() + '';
};
const getDeleteAndEditButtons = () => {
    expenseList.addEventListener('click', event => {
        const elementClicked = event.target;
        if (elementClicked.tagName == 'BUTTON') {
            const elementClickedButton = elementClicked;
            if (elementClickedButton.value == 'edit') {
                editExpenseCard(elementClicked);
            }
            if (elementClickedButton.value == 'delet') {
                deletExpenseItem(elementClicked);
                console.log('delet');
            }
        }
    });
};
const deletExpenseItem = (elementClicked) => {
    const itemTobeDeleted = elementClicked.parentNode;
    const deleteItemInArray = expenseListItens
        .filter(element => element.id != parseInt(itemTobeDeleted.id));
    expenseListItens = deleteItemInArray;
    updateAllTotalValues();
    itemTobeDeleted.remove();
};
const editExpenseCard = (elementClicked) => {
    const card = elementClicked.parentNode;
    const textDescription = card.querySelector('.expenseListCard__description')?.textContent;
    const textPrice = card.querySelector('.expenseListCard__price')?.textContent;
    const textPriceTrated = (parseInt(textPrice) > 0 ? '+' : '-') + textPrice;
    card.innerHTML =
        `
            ${activeEdit(textDescription, textPriceTrated, card.id)}
        `;
    const form = document.querySelector('[data="editForm"]');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const description = form.querySelector('#descricao');
        const price = form.querySelector('#preco');
        changeExpenseItemCard(card, description.value, price.value);
        saveChangesInExpenseList(card, description.value, price.value);
        updateAllTotalValues();
    });
};
const activeEdit = (textDescription, textPrice, id) => {
    return `
        <form class="editForm" data="editForm">
            <input 
                type="text" 
                name="descricao"
                id="descricao" 
                class="expenseListCard__description"
                maxlength="40" 
                required 
                placeholder="Descricao..." 
                pattern="^[a-zA-Z]+$"
                title="Apenas letras"
                value="${textDescription}"
            >
            <input 
                type="text" 
                name="preco"
                id="preco"
                class="expenseListCard__price" 
                pattern="^[+$\\-]\\d{1,3}(?:\\.\\d{3})*(?:,\\d{2})$" 
                title="formato : (+/-)1.000.000,00..." 
                required 
                placeholder="(+/-)1.000.999,00"
                value="${textPrice}"
            >
            <button class="comfirmEditBnt" type="submit" value="${id}"></button>
        </form>
    `;
};
const changeExpenseItemCard = (card, description, price) => {
    const classToAdd = parseInt(price) > 0 ? 'expenseListCard__item--green' : 'expenseListCard__item--red';
    const classToRemove = parseInt(price) < 0 ? 'expenseListCard__item--green' : 'expenseListCard__item--red';
    card.classList.remove(classToRemove);
    card.classList.add(classToAdd);
    card.innerHTML = `
        ${expenseItemContent(description, (parseFloat(price.replace(',', '.')).toFixed(2) + '').replace('.', ','))}
    `;
};
const saveChangesInExpenseList = (card, description, price) => {
    const id = parseInt(card.id);
    const findIndex = expenseListItens.findIndex(element => element.id == id);
    const priceExpenseTrated = price.replaceAll('.', '').replace(',', '.');
    expenseListItens[findIndex].desc = description;
    expenseListItens[findIndex].val = parseFloat(priceExpenseTrated);
    console.log(expenseListItens);
};
const getFormInputs = () => {
    const form = document.querySelector('[data="formCreatesExpenseItem"]');
    const clearFormBnt = document.querySelector('[data="clearForm"]');
    const expenseDescreption = form.querySelector('#descricao');
    const priceExpense = form.querySelector('#preco');
    clearFormBnt.addEventListener('click', event => {
        expenseDescreption.value = '';
        priceExpense.value = '';
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (validateExpenseForm(expenseDescreption, priceExpense)) {
            const priceExpenseTrated = priceExpense.value.replaceAll('.', '').replace(',', '.');
            const id = expenseListItens.length > 0 ? expenseListItens[expenseListItens.length - 1].id + 1 : 0;
            const expenseItem = {
                id: id,
                desc: expenseDescreption.value,
                val: parseFloat(priceExpenseTrated)
            };
            expenseListItens.push(expenseItem);
            createCardExpense(expenseItem);
            updateAllTotalValues();
            return;
        }
        alert('Campos invalidos!');
    });
};
getFormInputs();
getDeleteAndEditButtons();

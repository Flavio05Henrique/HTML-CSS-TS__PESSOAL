type expenseItem = {
    id: number,
    desc: string,
    val: number
}

const expenseList = document.querySelector('[data="expenseList"]') as HTMLUListElement
let expenseListItens: expenseItem[] = []
const totalProfil = document.querySelector('[data="expenseListCard__totalProfil"]') as HTMLDivElement
const totalExpense = document.querySelector('[data="expenseListCard__totalExpense"]') as HTMLDivElement
const totalGeneral = document.querySelector('[data="expenseListCard__total"]') as HTMLDivElement

const validateExpenseForm = (expenseDescreption: HTMLInputElement, priceExpense: HTMLInputElement) => {
    const expenseDescreptionRegex: RegExp = /^[a-zA-Z]+$/
    const priceExpenseRegex: RegExp = /^[+\-]\d{1,3}(?:\.\d{3})*(?:,\d{2})$/

    if(expenseDescreptionRegex.test(expenseDescreption.value) || priceExpenseRegex.test(priceExpense.value)) {
        return true
    }
    
    return false
}

const createCardExpense = (expenseItem : expenseItem): void => {

    const expenseOrProfit: string = 
        expenseItem.val > 0 ? 'expenseListCard__item--green' : 'expenseListCard__item--red'

    expenseList.innerHTML += `
        <li class="expenseListCard__item ${expenseOrProfit}" id="${expenseItem.id}">
            ${expenseItemContent(expenseItem.desc, (expenseItem.val.toFixed(2) + '').replace('.', ','))}
        </li>
    `
}

const expenseItemContent = (description: string, price: string): string => {
    return `
        <p class="expenseListCard__description">${description}</p>
        <p class="expenseListCard__price">${price}</p>
        <button class="expenseListCard__bntEdit expenseListCard__bnt" value="edit"></button>
        <button class="expenseListCard__bntDelet expenseListCard__bnt" value="delet"></button>
    `
}

const updateTotalProfil = () : string => {
    const calculateValue = expenseListItens
        .filter( element => element.val > 0)
        .reduce((acc, element) => acc + element.val, 0)
        .toFixed(2)

        return calculateValue
}

const updateTotalExpense = () : string => {
    const calculateValue = expenseListItens
        .filter( element => element.val < 0)
        .reduce((acc, element) => acc + element.val, 0)
        .toFixed(2)

        return calculateValue
}

const updateTotal = () : string => {
    const calculateValue = expenseListItens
        .reduce((acc, element) => acc + element.val , 0)
        .toFixed(2)

    return calculateValue
}

const updateAllTotalValues = () : void => {
    totalProfil.innerHTML = updateTotalProfil() + ''
    totalGeneral.innerHTML = updateTotal() + ''
    totalExpense.innerHTML = updateTotalExpense() + ''
}

const getDeleteAndEditButtons = () => {
    expenseList.addEventListener('click', event => {
        const elementClicked = event.target as HTMLElement
        if(elementClicked.tagName == 'BUTTON') {
            const elementClickedButton = elementClicked as HTMLButtonElement
            if(elementClickedButton.value == 'edit') {
                editExpenseCard(elementClicked)
            }
            if(elementClickedButton.value == 'delet') {
                deletExpenseItem(elementClicked)
                console.log('delet')
            }
        }
    })
}

const deletExpenseItem = (elementClicked: HTMLElement) => {
    const itemTobeDeleted = elementClicked.parentNode as HTMLDivElement
    const deleteItemInArray: expenseItem[] = expenseListItens
        .filter(element => element.id != parseInt(itemTobeDeleted.id))
    expenseListItens = deleteItemInArray
    updateAllTotalValues()
    itemTobeDeleted.remove()
}

const editExpenseCard = (elementClicked: HTMLElement) => {
    const card = elementClicked.parentNode as HTMLDivElement
    const textDescription: string = card.querySelector('.expenseListCard__description')?.textContent! 
    const textPrice: string = card.querySelector('.expenseListCard__price')?.textContent!
    const textPriceTrated: string =  (parseInt(textPrice) > 0 ? '+' : '-') + textPrice

    card.innerHTML = 
        `
            ${activeEdit(textDescription, textPriceTrated, card.id)}
        `

    const form = document.querySelector('[data="editForm"]') as HTMLFormElement
    
    form.addEventListener('submit', event => {
        event.preventDefault()
        const description = form.querySelector('#descricao') as HTMLInputElement
        const price = form.querySelector('#preco') as HTMLInputElement

        changeExpenseItemCard(card, description.value, price.value)
        saveChangesInExpenseList(card, description.value, price.value)
        updateAllTotalValues()
    })
}

const activeEdit = (textDescription: string, textPrice: string, id: string): string => {
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
    `
}

const changeExpenseItemCard = (card: HTMLDivElement, description: string, price: string): void => {
    const classToAdd: string = parseInt(price) > 0 ? 'expenseListCard__item--green' : 'expenseListCard__item--red'
    const classToRemove: string = parseInt(price) < 0 ? 'expenseListCard__item--green' : 'expenseListCard__item--red'
    
    card.classList.remove(classToRemove)
    card.classList.add(classToAdd)

    card.innerHTML = `
        ${expenseItemContent(description, (parseFloat(price.replace(',', '.')).toFixed(2) + '').replace('.', ','))}
    `
}

const saveChangesInExpenseList = (card: HTMLDivElement, description: string, price: string ): void => {
    const id = parseInt(card.id)
    const findIndex = expenseListItens.findIndex( element => element.id == id)
    const priceExpenseTrated = price.replaceAll('.', '').replace(',', '.')


    expenseListItens[findIndex].desc = description
    expenseListItens[findIndex].val = parseFloat(priceExpenseTrated)
    console.log(expenseListItens )
}

const getFormInputs = () => {
    const form = document.querySelector('[data="formCreatesExpenseItem"]') as HTMLFormElement
    const clearFormBnt = document.querySelector('[data="clearForm"]') as HTMLButtonElement
    
    const expenseDescreption = form.querySelector('#descricao') as HTMLInputElement
    const priceExpense = form.querySelector('#preco') as HTMLInputElement

    clearFormBnt.addEventListener('click', event => {
        expenseDescreption.value = ''
        priceExpense.value = ''
    })
    
    form.addEventListener('submit', event => {
        event.preventDefault()
        
        if(validateExpenseForm(expenseDescreption, priceExpense)) {
            const priceExpenseTrated = priceExpense.value.replaceAll('.', '').replace(',', '.')
            const id = expenseListItens.length > 0 ? expenseListItens[expenseListItens.length -1].id + 1 : 0 
            
            const expenseItem = {
                id: id,
                desc: expenseDescreption.value,
                val: parseFloat(priceExpenseTrated)
            }

            expenseListItens.push(expenseItem)
            createCardExpense(expenseItem)
            updateAllTotalValues()
            return
        }
        alert('Campos invalidos!')
    })
}



getFormInputs()
getDeleteAndEditButtons()
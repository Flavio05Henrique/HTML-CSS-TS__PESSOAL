const openCardCreatorBnt = document.querySelector('[data="openCreateNewCardBnt"]') as HTMLButtonElement
const popUpContainer = document.querySelector('[data="popUpContainer"]') as HTMLDivElement
const popUpContainerBntClose = document.querySelector('[data="popUpContainer__bntClose"]') as HTMLButtonElement
const createNewCardBnt = document.querySelector('[data="createNewCardBnt"]') as HTMLButtonElement
const cardExtendedCreateNewCard = document.querySelector('[data="cardExtended__CreateNewCard"]') as HTMLDivElement
const activeCardBnt = document.querySelector('[data="activeCardBnt"]') as HTMLButtonElement
const cardsContainer = document.querySelector('[data="cards__container"]') as HTMLDivElement

openCardCreatorBnt.addEventListener('click', event => {
    openCardCreator()
})

const openCardCreator = ():void => {
    popUpContainer.classList.remove('display__none')
}

popUpContainerBntClose.addEventListener('click', event => {
    closeCardCrator()
})

const closeCardCrator = ():void => {
    popUpContainer.classList.add('display__none')
}

activeCardBnt.addEventListener('click', event => {
    activeCardBnt.classList.toggle('cardExtended__bntActive_--AC')
})

cardsContainer.addEventListener('click', event => {
    const elementClickd = event.target as HTMLDivElement
    
    if(elementClickd.classList.contains('open')) {
        console.log(elementClickd.id)
    } else {
        console.log('fora')
    }
})

createNewCardBnt.addEventListener('click', event => {
    const inputChoseImg = cardExtendedCreateNewCard.querySelector('[data="inputChoseImg"]') as HTMLInputElement
    const inputChoseCardColor = cardExtendedCreateNewCard.querySelector('[data="inputChoseCardColor"]') as HTMLInputElement
    const inputChoseName = cardExtendedCreateNewCard.querySelector('[data="inputChoseName"]') as HTMLInputElement
    const inputChoseSeason = cardExtendedCreateNewCard.querySelector('[data="inputChoseSeason"]') as HTMLInputElement
    const inputChoseChapter = cardExtendedCreateNewCard.querySelector('[data="inputChoseChapter"]') as HTMLInputElement
    const inputChoseAssessment = cardExtendedCreateNewCard.querySelector('[data="inputChoseAssessment"]') as HTMLSelectElement
    const inputChoseTag = cardExtendedCreateNewCard.querySelector('[data="inputChoseTag"]') as HTMLSelectElement
    const cardComments = cardExtendedCreateNewCard.querySelector('[data="cardComments"]') as HTMLTextAreaElement
    const checkIfCardIsActivate = activeCardBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false

    const newCard = {
        'image': inputChoseImg.value,
        'color': inputChoseCardColor.value,
        'name': inputChoseName.value,
        'season': inputChoseSeason.value,
        'chapeter': inputChoseChapter.value,
        'assessment': inputChoseAssessment.value,
        'tag': inputChoseTag.value,
        'comments': cardComments.value,
        'active': checkIfCardIsActivate
    }

    inputChoseImg.value = ''
    inputChoseCardColor.value = ''
    inputChoseName.value = ''
    inputChoseSeason.value = ''
    inputChoseChapter.value = ''
    cardComments.value = ''
    activeCardBnt.classList.remove('cardExtended__bntActive_--AC')
    
    makeCardInDom(newCard)
    console.log(newCard)
    // alert(inputChoseImg.value)
})

const makeCardInDom = (card:any):void => {
    cardsContainer.innerHTML += `
        <div class="card">
            <div>
                <img src="${card.image}" alt="">
                <h3>${card.name}</h3>
            </div> 
            <div class="card__capa open" id="1">
                <h3 class="open" id="1">Abrir</h3>
            </div>
        </div>
    `
}
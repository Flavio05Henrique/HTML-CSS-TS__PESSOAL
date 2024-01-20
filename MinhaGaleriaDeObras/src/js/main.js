"use strict";
const openCardCreatorBnt = document.querySelector('[data="openCreateNewCardBnt"]');
const popUpContainer = document.querySelector('[data="popUpContainer"]');
const popUpContainerBntClose = document.querySelector('[data="popUpContainer__bntClose"]');
const createNewCardBnt = document.querySelector('[data="createNewCardBnt"]');
const cardExtendedCreateNewCard = document.querySelector('[data="cardExtended__CreateNewCard"]');
const activeCardBnt = document.querySelector('[data="activeCardBnt"]');
const cardsContainer = document.querySelector('[data="cards__container"]');
openCardCreatorBnt.addEventListener('click', event => {
    openCardCreator();
});
const openCardCreator = () => {
    popUpContainer.classList.remove('display__none');
};
popUpContainerBntClose.addEventListener('click', event => {
    closeCardCrator();
});
const closeCardCrator = () => {
    popUpContainer.classList.add('display__none');
};
activeCardBnt.addEventListener('click', event => {
    activeCardBnt.classList.toggle('cardExtended__bntActive_--AC');
});
cardsContainer.addEventListener('click', event => {
    const elementClickd = event.target;
    if (elementClickd.classList.contains('open')) {
        console.log(elementClickd.id);
    }
    else {
        console.log('fora');
    }
});
createNewCardBnt.addEventListener('click', event => {
    const inputChoseImg = cardExtendedCreateNewCard.querySelector('[data="inputChoseImg"]');
    const inputChoseCardColor = cardExtendedCreateNewCard.querySelector('[data="inputChoseCardColor"]');
    const inputChoseName = cardExtendedCreateNewCard.querySelector('[data="inputChoseName"]');
    const inputChoseSeason = cardExtendedCreateNewCard.querySelector('[data="inputChoseSeason"]');
    const inputChoseChapter = cardExtendedCreateNewCard.querySelector('[data="inputChoseChapter"]');
    const inputChoseAssessment = cardExtendedCreateNewCard.querySelector('[data="inputChoseAssessment"]');
    const inputChoseTag = cardExtendedCreateNewCard.querySelector('[data="inputChoseTag"]');
    const cardComments = cardExtendedCreateNewCard.querySelector('[data="cardComments"]');
    const checkIfCardIsActivate = activeCardBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false;
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
    };
    inputChoseImg.value = '';
    inputChoseCardColor.value = '';
    inputChoseName.value = '';
    inputChoseSeason.value = '';
    inputChoseChapter.value = '';
    cardComments.value = '';
    activeCardBnt.classList.remove('cardExtended__bntActive_--AC');
    makeCardInDom(newCard);
    console.log(newCard);
    // alert(inputChoseImg.value)
});
const makeCardInDom = (card) => {
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
    `;
};

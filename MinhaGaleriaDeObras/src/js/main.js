"use strict";
const openCardCreatorBnt = document.querySelector('[data="openCreateNewCardBnt"]');
const popUpContainer = document.querySelector('[data="popUpContainer"]');
const popUpContainerBntClose = document.querySelector('[data="popUpContainer__bntClose"]');
const createNewCardBnt = document.querySelector('[data="createNewCardBnt"]');
const cardExtendedCreateNewCard = document.querySelector('[data="cardExtended__CreateNewCard"]');
const activeCardBnt = document.querySelector('[data="activeCardBnt"]');
const cardsContainer = document.querySelector('[data="cards__container"]');
const popUpContainerDynamic = document.querySelector('[data="popUpContainerDynamic"]');
const popUpContainerDynamicCloseBnt = document.querySelector('[data="popUpContainerDynamic__bntClose"]');
const popUpContainerDynamicContainer = document.querySelector('[data="popUpContainerDynamicConatiner"]');
let MyList = [];
let MyListCurrentItem = 0;
let CurrentExtendedCard;
let editMode = false;
const loadMyList = () => {
    const list = localStorage.getItem('MinhaListaDeObras');
    if (list == null)
        return;
    MyList = JSON.parse(list);
    console.log(MyList);
};
const loadMyListInDom = () => {
    const cards = [];
    MyList.forEach(card => {
        cards.push(makeCardInDom(card));
    });
    cardsContainer.innerHTML += cards.join(' ');
};
openCardCreatorBnt.addEventListener('click', event => {
    openCardCreator();
});
const openCardCreator = () => {
    popUpContainer.classList.remove('display__none');
};
popUpContainerBntClose.addEventListener('click', event => {
    closeCardCreator();
});
const closeCardCreator = () => {
    popUpContainer.classList.add('display__none');
};
activeCardBnt.addEventListener('click', event => {
    activeCardBnt.classList.toggle('cardExtended__bntActive_--AC');
});
cardsContainer.addEventListener('click', event => {
    const elementClickd = event.target;
    if (elementClickd.getAttribute('data') == 'interactable') {
        const elementClickdId = parseInt(elementClickd.id);
        const index = seachCardInMyList(elementClickdId);
        openPopUpContainerDynamic();
        makeCardExtendedInDom(MyList[index]);
        MyListCurrentItem = index;
    }
    else {
        console.log('fora');
    }
});
popUpContainerDynamicCloseBnt.addEventListener('click', event => {
    popUpContainerDynamicClose();
});
const popUpContainerDynamicClose = () => {
    disableChangeFunctions();
    popUpContainerDynamic.classList.add('display__none');
};
const openPopUpContainerDynamic = () => {
    popUpContainerDynamic.classList.remove('display__none');
};
createNewCardBnt.addEventListener('click', event => {
    const inputImg = cardExtendedCreateNewCard.querySelector('[data="inputChoseImg"]');
    const inputCardColor = cardExtendedCreateNewCard.querySelector('[data="inputChoseCardColor"]');
    const inputName = cardExtendedCreateNewCard.querySelector('[data="inputChoseName"]');
    const inputSeason = cardExtendedCreateNewCard.querySelector('[data="inputChoseSeason"]');
    const inputChapter = cardExtendedCreateNewCard.querySelector('[data="inputChoseChapter"]');
    const inputAssessment = cardExtendedCreateNewCard.querySelector('[data="inputChoseAssessment"]');
    const inputTag = cardExtendedCreateNewCard.querySelector('[data="inputChoseTag"]');
    const cardComments = cardExtendedCreateNewCard.querySelector('[data="cardComments"]');
    const inputImgValue = inputImg.value;
    const inputCardColorValue = inputCardColor.value;
    const inputNameValue = inputName.value == '' ? 'Nome' : inputName.value;
    const inputSeasonValue = inputSeason.value == '' ? '0' : inputSeason.value;
    const inputChapterValue = inputChapter.value == '' ? '0' : inputChapter.value;
    const inputAssessmentValue = inputAssessment.value;
    const inputTagValue = inputTag.value;
    const cardCommentsValue = cardComments.value;
    const checkIfCardIsActivate = activeCardBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false;
    const newCard = {
        'id': generatesId(),
        'image': inputImgValue,
        'color': inputCardColorValue,
        'name': inputNameValue,
        'season': inputSeasonValue,
        'chapeter': inputChapterValue,
        'assessment': inputAssessmentValue,
        'tag': inputTagValue,
        'comments': cardCommentsValue,
        'active': checkIfCardIsActivate
    };
    makeCardInDom(newCard);
    saveNewCardInMyList(newCard);
    console.log(MyList);
    inputImg.value = '';
    inputCardColor.value = '#012030';
    inputName.value = '';
    inputSeason.value = '';
    inputChapter.value = '';
    cardComments.value = '';
    activeCardBnt.classList.remove('cardExtended__bntActive_--AC');
});
const generatesId = () => {
    let id = 0;
    if (MyList.length > 0) {
        id = MyList[MyList.length - 1].id + 1;
    }
    return id;
};
const makeCardInDom = (card) => {
    return `
        <div class="card" style="background-color: ${card.color};">
            <div>
                <img src="${card.image}" alt="">
                <h3>${card.name}</h3>
            </div> 
            <div class="card__capaClickable" data="interactable" id="${card.id}"></div>
            <div class="card__capa">
                <h3 class="open">Abrir</h3>
            </div>
        </div>
    `;
};
const seachCardInMyList = (id) => {
    return MyList.findIndex(item => item.id == id);
};
const makeCardExtendedInDom = (card) => {
    editMode = false;
    popUpContainerDynamicContainer.innerHTML = `
        <div class="cardExtended__container" style="background-color: ${card.color};" data="cardExtended__container">
            <div class="cardExtended__img">
                <img src="${card.image}" alt="" data="interactable" id="img">
            </div>
            <div class="cardExtended__info">
                <input type="color" class="cardExtended__changeColor" data="interactable" id="color" value="${card.color}">
                <div data="cardExtended__containerBnt">
                    <button class="cardExtended__bntDelete cardExtended__centralize">DELETAR</button>
                </div>
                <span class="cardExtended__title cardExtended__centralize cardExtended__input">Nome da obra <div data="interactable" id="name">${card.name}</div></span>
                <div class="cardExtended__bntActive cardExtended__centralize ${card.active == true ? 'cardExtended__bntActive_--AC' : 0}" >
                    Obra ativa
                    <button data="interactable" id="activeBnt"><div></div></button>
                </div>
                <span class="cardExtended__season cardExtended__centralize cardExtended__input">Temporada/Volume <div data="interactable" id="season">${card.season}</div></span>
                <span class="cardExtended__chapter cardExtended__centralize cardExtended__input">Ultimo capitulo visto : <div data="interactable" id="chapeter">${card.chapeter}</div></span>
                <span class="cardExtended__assessment cardExtended__centralize cardExtended__input">Sua nota: <div data="interactable" id="assessment">${card.assessment}</div></span>
                <span class="cardExtended__tag cardExtended__centralize cardExtended__input">Gênero: <div data="interactable" id="tag">${card.tag}</div></span>
                <span class="cardExtended__comments">
                    <h3>Comentarios</h3>
                    <div data="interactable" id="comments">${card.comments}</div>
                </span>
            </div>
        </div>
    `;
    activeChangeFunctions();
};
const activeChangeFunctions = () => {
    CurrentExtendedCard = popUpContainerDynamicContainer.querySelector('[data="cardExtended__container"]');
    CurrentExtendedCard.addEventListener('click', event => {
        ChangeFunctions(event);
    });
};
const disableChangeFunctions = () => {
    CurrentExtendedCard.removeEventListener('click', event => {
        ChangeFunctions(event);
    });
};
const ChangeFunctions = (event) => {
    const elementClickd = event.target;
    if (elementClickd.getAttribute('data') == 'interactable') {
        const container = elementClickd.parentNode;
        let componente = ``;
        editMode == false ? activateBntConfirm() : 0;
        switch (elementClickd.id) {
            case 'img':
                componente = openInputImg();
                break;
            case 'name':
                componente = openInputName();
                break;
            case 'season':
                componente = openInputSeason();
                break;
            case 'chapeter':
                componente = openInputChapeter();
                break;
            case 'assessment':
                componente = openInputAssessment();
                break;
            case 'tag':
                componente = openInputTag();
                break;
            case 'comments':
                componente = openInputComments();
                break;
            case 'activeBnt':
                activeBntChangeState(container);
                break;
            case 'color':
                activeColorChange(elementClickd, container);
                break;
            case 'confirm':
                changeConfirm(elementClickd);
                break;
            case 'cancel':
                makeCardExtendedInDom(MyList[MyListCurrentItem]);
                break;
        }
        if (componente == ``)
            return;
        container.innerHTML = componente;
    }
};
const activateBntConfirm = () => {
    const container = CurrentExtendedCard.querySelector('[data="cardExtended__containerBnt"]');
    container.innerHTML = `
        <div class="cardExtended__confirmBnts cardExtended__centralize">
            <button class="confirm bnt" data="interactable" id="confirm"></button>
            <button class="cancel bnt" data="interactable" id="cancel"></button>
        </div>
    `;
    editMode = true;
};
const changeConfirm = (elementClickd) => {
    const inputs = CurrentExtendedCard.querySelectorAll('input');
    const selects = CurrentExtendedCard.querySelectorAll('select');
    const textArea = CurrentExtendedCard.querySelector('textArea');
    const cardTochange = MyList[MyListCurrentItem];
    const activeSeriesBnt = CurrentExtendedCard.querySelector('#activeBnt')?.parentNode;
    const inputColor = CurrentExtendedCard.querySelector('#color');
    inputs.forEach(item => {
        if (item == null || item == undefined || item.value == '')
            return;
        switch (item.getAttribute('data')) {
            case 'inputChoseImg':
                cardTochange.image = item.value;
                break;
            case 'inputChoseName':
                cardTochange.name = item.value;
                break;
            case 'inputChoseSeason':
                cardTochange.season = item.value;
                break;
            case 'inputChoseChapter':
                cardTochange.chapeter = item.value;
                break;
        }
    });
    selects.forEach(item => {
        if (item == null || item == undefined || item.value == '')
            return;
        switch (item.getAttribute('data')) {
            case 'inputChoseAssessment':
                cardTochange.assessment = item.value;
                break;
            case 'inputChoseTag':
                cardTochange.tag = item.value;
                break;
        }
    });
    if (textArea != null && textArea != undefined && textArea.value !== '') {
        cardTochange.comments = textArea.value;
    }
    cardTochange.active = activeSeriesBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false;
    cardTochange.color = inputColor.value;
    saveInBrowser(MyList);
    makeCardExtendedInDom(MyList[MyListCurrentItem]);
    editMode = false;
    //    `
};
const openInputImg = () => {
    const string = `
            <div class="cardExtended__choseImg cardExtended__input">
                <label>Insira o link da imagem</label>
                <input type="text" maxlength="300" data="inputChoseImg">
            </div>
        `;
    return string;
};
const openInputName = () => {
    const string = `
        Nome da obra <input type="text" maxlength="100" data="inputChoseName" value="${MyList[MyListCurrentItem].name}">
    `;
    return string;
};
const openInputSeason = () => {
    const string = `
        Temporada/Volume<input type="number" data="inputChoseSeason" value="${MyList[MyListCurrentItem].season}">
    `;
    return string;
};
const openInputChapeter = () => {
    const string = `
        Ultimo capitulo visto : <input type="number" data="inputChoseChapter" value="${MyList[MyListCurrentItem].chapeter}">
    `;
    return string;
};
const openInputAssessment = () => {
    const string = `
        Sua nota: 
        <select data="inputChoseAssessment">
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
    `;
    return string;
};
const openInputTag = () => {
    const string = `
        Gênero: 
        <select data="inputChoseTag">
            <option value=""></option>
            <option value="Fantasia">Fantasia</option>
            <option value="Ficção científica">Ficção científica</option>
            <option value="Distipia">Distipia</option>
            <option value="Ação">Ação</option>
            <option value="Aventura">Aventura</option>
            <option value="Horror">Horror</option>
            <option value="Suspense">Suspense</option>
            <option value="Romance">Romance</option>
            <option value="Graphic Novel">Graphic Novel</option>
            <option value="Humor">Humor</option>
        </select>
    `;
    return string;
};
const openInputComments = () => {
    const string = `
        <h3>Comentarios</h3>
        <textarea name="" id="" cols="30" rows="10">${MyList[MyListCurrentItem].comments}</textarea>
    `;
    return string;
};
const activeBntChangeState = (button) => {
    button.classList.toggle('cardExtended__bntActive_--AC');
};
const activeColorChange = (elementClickd, container) => {
    elementClickd.addEventListener('input', () => {
        container.style.backgroundColor = elementClickd.value;
    });
};
const saveInBrowser = (MyList) => {
    localStorage.setItem('MinhaListaDeObras', JSON.stringify(MyList));
};
const saveNewCardInMyList = (newCard) => {
    MyList.push(newCard);
    saveInBrowser(MyList);
};
loadMyList();
loadMyListInDom();

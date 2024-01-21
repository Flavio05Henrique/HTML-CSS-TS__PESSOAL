type card = {
    'id': number,
    'image': string,
    'color': string,
    'name': string,
    'season': string,
    'chapeter': string,
    'assessment': string,
    'tag': string,
    'comments': string,
    'active': boolean
}

const openCardCreatorBnt = document.querySelector('[data="openCreateNewCardBnt"]') as HTMLButtonElement
const popUpContainer = document.querySelector('[data="popUpContainer"]') as HTMLDivElement
const popUpContainerBntClose = document.querySelector('[data="popUpContainer__bntClose"]') as HTMLButtonElement
const createNewCardBnt = document.querySelector('[data="createNewCardBnt"]') as HTMLButtonElement
const cardExtendedCreateNewCard = document.querySelector('[data="cardExtended__CreateNewCard"]') as HTMLDivElement
const activeCardBnt = document.querySelector('[data="activeCardBnt"]') as HTMLButtonElement
const cardsContainer = document.querySelector('[data="cards__container"]') as HTMLDivElement
const popUpContainerDynamic = document.querySelector('[data="popUpContainerDynamic"]') as HTMLDivElement
const popUpContainerDynamicCloseBnt = document.querySelector('[data="popUpContainerDynamic__bntClose"]') as HTMLButtonElement
const popUpContainerDynamicContainer = document.querySelector('[data="popUpContainerDynamicConatiner"]') as HTMLDivElement

let MyList: card[] = []
let CurrentExtendedCard: HTMLDivElement

const loadMyList = () => {
    const list: string | null = localStorage.getItem('MinhaListaDeObras')
    if(list == null) return
    MyList = JSON.parse(list)
    console.log(MyList)
}

const loadMyListInDom = () => {
    const cards: string[] = []
    MyList.forEach(card => {
        cards.push(makeCardInDom(card))
    })
    cardsContainer.innerHTML += cards.join(' ')
}

openCardCreatorBnt.addEventListener('click', event => {
    openCardCreator()
})

const openCardCreator = ():void => {
    popUpContainer.classList.remove('display__none')
}

popUpContainerBntClose.addEventListener('click', event => {
    closeCardCreator()
})

const closeCardCreator = ():void => {
    popUpContainer.classList.add('display__none')
}

activeCardBnt.addEventListener('click', event => {
    activeCardBnt.classList.toggle('cardExtended__bntActive_--AC')
})

cardsContainer.addEventListener('click', event => {
    const elementClickd = event.target as HTMLDivElement
    
    if(elementClickd.getAttribute('data') == 'interactable') {
        openPopUpContainerDynamic()
        makeCardExtendedInDom(seachCardInMyList(parseInt(elementClickd.id)))
    } else {
        console.log('fora')
    }
})

popUpContainerDynamicCloseBnt.addEventListener('click', event => {
    popUpContainerDynamicClose()
})

const popUpContainerDynamicClose = ():void => {
    disableChangeFunctions()
    popUpContainerDynamic.classList.add('display__none')
}

const openPopUpContainerDynamic = ():void => {
    popUpContainerDynamic.classList.remove('display__none')
}

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

    const newCard: card = {
        'id': generatesId(),
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

    makeCardInDom(newCard)
    saveNewCardInMyList(newCard)
    console.log(MyList)
    
    inputChoseImg.value = ''
    inputChoseCardColor.value = ''
    inputChoseName.value = ''
    inputChoseSeason.value = ''
    inputChoseChapter.value = ''
    cardComments.value = ''
    activeCardBnt.classList.remove('cardExtended__bntActive_--AC')
    
})

const generatesId = ():number => {
    let id: number = 0
    if(MyList.length > 0) {
        id = MyList[MyList.length -1].id + 1
    }
    return id
}

const makeCardInDom = (card:card):string => {
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
    `
}

const seachCardInMyList = (id: number):card => {
    return MyList.find(item => item.id == id)!
}

const makeCardExtendedInDom = (card: card):void => {
    popUpContainerDynamicContainer.innerHTML = `
        <div class="cardExtended__container" style="background-color: ${card.color};" data="cardExtended__container">
            <div class="cardExtended__img">
                <img src="${card.image}" alt="" data="interactable" id="img">
            </div>
            <div class="cardExtended__info">
                <input type="color" class="cardExtended__changeColor" data="interactable">
                <button class="cardExtended__bntDelete cardExtended__centralize">DELETAR</button>
                <span class="cardExtended__title cardExtended__centralize">Nome da obra <div data="interactable">${card.name}</div></span>
                <div class="cardExtended__bntActive cardExtended__centralize ${card.active == true ? 'cardExtended__bntActive_--AC' : 0}" data="interactable">
                    Obra ativa
                    <button><div></div></button>
                </div>
                <span class="cardExtended__season cardExtended__centralize">Temporada/Volume <div data="interactable">${card.season}</div></span>
                <span class="cardExtended__chapter cardExtended__centralize">Ultimo capitulo visto : <div data="interactable">${card.chapeter}</div></span>
                <span class="cardExtended__assessment cardExtended__centralize">Sua nota: <div data="interactable">${card.assessment}</div></span>
                <span class="cardExtended__tag cardExtended__centralize">Gênero: <div data="interactable">${card.tag}</div></span>
                <span class="cardExtended__comments">
                    <h3>Comentarios</h3>
                    <textarea name="" id="" cols="30" rows="10" data="interactable">${card.comments}</textarea>
                </span>
            </div>
        </div>
    `
    activeChangeFunctions()
}

const activeChangeFunctions = () => {
    CurrentExtendedCard = popUpContainerDynamicContainer.querySelector('[data="cardExtended__container"]') as HTMLDivElement

    CurrentExtendedCard.addEventListener('click', event => {
        ChangeFunctions(event)
    })
}

const disableChangeFunctions = () => {
    CurrentExtendedCard.removeEventListener('click', event => {
        ChangeFunctions(event)
    })
}

const ChangeFunctions = (event:Event) => {
    const elementClickd = event.target as HTMLInputElement
    if(elementClickd.getAttribute('data') == 'interactable') {
        console.log(elementClickd.id)
        switch(elementClickd.id){
            case 'img': qualuqer(elementClickd)
            break;
        }
    }
}

const qualuqer = (elementClickd:any) => {
    const el = elementClickd.parentNode as HTMLDivElement
    el.innerHTML = `
        <div class="cardExtended__choseImg cardExtended__input">
            <label>Insira o link da imagem</label>
            <input type="text" maxlength="300" data="inputChoseImg">
        </div>
    `
    console.log('entrou')
}

const saveInBrowser = (MyList: card[]):void => {
    localStorage.setItem('MinhaListaDeObras', JSON.stringify(MyList));
}

const saveNewCardInMyList = (newCard: card):void => {
    MyList.push(newCard)
    saveInBrowser(MyList)
}


loadMyList()
loadMyListInDom()
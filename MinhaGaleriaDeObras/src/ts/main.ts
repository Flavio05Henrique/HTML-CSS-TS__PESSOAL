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
let MyListCurrentItem: number = 0
let CurrentExtendedCard: HTMLDivElement
let editMode: boolean = false

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
        const elementClickdId = parseInt(elementClickd.id)
        const index = seachCardInMyList(elementClickdId)
        openPopUpContainerDynamic()
        makeCardExtendedInDom(MyList[index])
        MyListCurrentItem = index
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
    const inputImg = cardExtendedCreateNewCard.querySelector('[data="inputChoseImg"]') as HTMLInputElement
    const inputCardColor = cardExtendedCreateNewCard.querySelector('[data="inputChoseCardColor"]') as HTMLInputElement
    const inputName = cardExtendedCreateNewCard.querySelector('[data="inputChoseName"]') as HTMLInputElement
    const inputSeason = cardExtendedCreateNewCard.querySelector('[data="inputChoseSeason"]') as HTMLInputElement
    const inputChapter = cardExtendedCreateNewCard.querySelector('[data="inputChoseChapter"]') as HTMLInputElement
    const inputAssessment = cardExtendedCreateNewCard.querySelector('[data="inputChoseAssessment"]') as HTMLSelectElement
    const inputTag = cardExtendedCreateNewCard.querySelector('[data="inputChoseTag"]') as HTMLSelectElement
    const cardComments = cardExtendedCreateNewCard.querySelector('[data="cardComments"]') as HTMLTextAreaElement

    const inputImgValue: string = inputImg.value
    const inputCardColorValue: string = inputCardColor.value
    const inputNameValue: string = inputName.value == '' ? 'Nome' : inputName.value 
    const inputSeasonValue: string = inputSeason.value == '' ? '0' : inputSeason.value
    const inputChapterValue: string = inputChapter.value == '' ? '0' : inputChapter.value
    const inputAssessmentValue: string = inputAssessment.value
    const inputTagValue: string = inputTag.value
    const cardCommentsValue: string = cardComments.value
    const checkIfCardIsActivate: boolean = activeCardBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false

    const newCard: card = {
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
    }

    makeCardInDom(newCard)
    saveNewCardInMyList(newCard)
    console.log(MyList)
    
    inputImg.value = ''
    inputCardColor.value = '#012030'
    inputName.value = ''
    inputSeason.value = ''
    inputChapter.value = ''
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

const seachCardInMyList = (id: number):number => {
    return MyList.findIndex(item => item.id == id)!
}

const makeCardExtendedInDom = (card: card):void => {
    editMode = false

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
        const container = elementClickd.parentNode as HTMLDivElement
        let componente: string = ``

        editMode == false ? activateBntConfirm() : 0

        switch(elementClickd.id){
            case 'img': componente = openInputImg()
            break;
            case 'name': componente = openInputName()
            break;
            case 'season': componente = openInputSeason()
            break;
            case 'chapeter': componente = openInputChapeter()
            break;
            case 'assessment': componente = openInputAssessment()
            break;
            case 'tag': componente = openInputTag()
            break;
            case 'comments': componente = openInputComments()
            break;
            case 'activeBnt': activeBntChangeState(container)
            break;
            case 'color': activeColorChange(elementClickd, container)
            break;
            case 'confirm': changeConfirm(elementClickd)
            break;
            case 'cancel': makeCardExtendedInDom(MyList[MyListCurrentItem])
            break;
        }

        if(componente == ``) return
        container.innerHTML = componente
    }
}

const activateBntConfirm = ():void => {
    const container = CurrentExtendedCard.querySelector('[data="cardExtended__containerBnt"]') as HTMLDivElement

    container.innerHTML =  `
        <div class="cardExtended__confirmBnts cardExtended__centralize">
            <button class="confirm bnt" data="interactable" id="confirm"></button>
            <button class="cancel bnt" data="interactable" id="cancel"></button>
        </div>
    `

    editMode = true
}

const changeConfirm = (elementClickd:any):void => {
    const inputs = CurrentExtendedCard.querySelectorAll('input')
    const selects = CurrentExtendedCard.querySelectorAll('select')
    const textArea = CurrentExtendedCard.querySelector('textArea') as HTMLTextAreaElement
    const cardTochange = MyList[MyListCurrentItem]
    const activeSeriesBnt = CurrentExtendedCard.querySelector('#activeBnt')?.parentNode as HTMLButtonElement
    const inputColor = CurrentExtendedCard.querySelector('#color') as HTMLInputElement

   inputs.forEach(item => {
        if(item == null || item == undefined || item.value == '') return

        switch(item.getAttribute('data')) {
            case'inputChoseImg': cardTochange.image = item.value
            break;
            case'inputChoseName': cardTochange.name = item.value
            break
            case'inputChoseSeason': cardTochange.season = item.value
            break;
            case'inputChoseChapter': cardTochange.chapeter = item.value
            break;
        }
   })

   selects.forEach(item => {
        if(item == null || item == undefined || item.value == '') return

        switch(item.getAttribute('data')) {
            case'inputChoseAssessment': cardTochange.assessment = item.value
            break;
            case'inputChoseTag': cardTochange.tag = item.value
            break
        }
   })

   if(textArea != null && textArea != undefined && textArea.value !== '') {
    cardTochange.comments = textArea.value
   }

   cardTochange.active = activeSeriesBnt.classList.contains('cardExtended__bntActive_--AC') ? true : false
   cardTochange.color = inputColor.value

   saveInBrowser(MyList)
   makeCardExtendedInDom(MyList[MyListCurrentItem])

   editMode = false
//    `
}

const openInputImg = ():string => {
    const string = 
        `
            <div class="cardExtended__choseImg cardExtended__input">
                <label>Insira o link da imagem</label>
                <input type="text" maxlength="300" data="inputChoseImg">
            </div>
        `
    return string 
}

const openInputName = ():string => {
    const string = `
        Nome da obra <input type="text" maxlength="100" data="inputChoseName" value="${MyList[MyListCurrentItem].name}">
    `

    return string
}

const openInputSeason = ():string => {
    const string  = `
        Temporada/Volume<input type="number" data="inputChoseSeason" value="${MyList[MyListCurrentItem].season}">
    `

    return string
}

const openInputChapeter = ():string => {
    const string = `
        Ultimo capitulo visto : <input type="number" data="inputChoseChapter" value="${MyList[MyListCurrentItem].chapeter}">
    `

    return string
}

const openInputAssessment = ():string => {
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
    `

    return string
}

const openInputTag= ():string => {
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
    `

    return string
}

const openInputComments= ():string => {
    const string = `
        <h3>Comentarios</h3>
        <textarea name="" id="" cols="30" rows="10">${MyList[MyListCurrentItem].comments}</textarea>
    `

    return string
}

const activeBntChangeState = (button: any): void => {
    button.classList.toggle('cardExtended__bntActive_--AC')
}

const activeColorChange = (elementClickd: any, container: any) => {
    elementClickd.addEventListener('input', () => {
        container.style.backgroundColor = elementClickd.value
    })
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
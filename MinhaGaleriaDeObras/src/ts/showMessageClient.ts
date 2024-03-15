const showMessageContainer = document.querySelector('[data="showMessage__container"]') as HTMLDialogElement

let messageToClose: number 

const showMessageError = (title: string, message: string): void => {
    createMessage(title, message, 'error')
}

const showMessageSuccess = (title: string, message: string): void => {
    createMessage(title, message, 'success')
}

const createMessage = (title:string , message:string, type: string) => {

    if(messageToClose) {
       clearTimeout(messageToClose) 
    }

    const messageCard = `
        <div class="showMessage__message showMessage__message--${type} showMessage__animation">
            <h3 class="showMessage__title">${title}</h3>
            <p class="showMessage__text">${message}</p>
        </div>
    `
    showMessage(messageCard)
}

const showMessage = (messageCard: string):void => {
    showMessageContainer.innerHTML = messageCard
    const ref = setTimeout(() => closeMessage(), 3000)
    messageToClose = ref
}

const closeMessage = ():void => {
    const message = showMessageContainer.children[0] as HTMLDivElement
    message.style.opacity = '0'
    setTimeout(() =>{
        message.remove()
    }, 1000)
}
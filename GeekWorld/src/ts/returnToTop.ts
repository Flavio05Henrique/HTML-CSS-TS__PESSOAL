const returnToTopBnt = document.querySelector('[data="bntReturnToTop"]') as HTMLButtonElement
let returnToTopBntActive = false

returnToTopBnt.addEventListener('click', event => {
    if (returnToTopBntActive) {
        executeAnimetionActions(null)
        setTimeout(() => {
            executeAnimetionActions(0)
            activateReturnToTopBnt()
        }, 1000)
    }
})

const activateReturnToTopBnt = () : void => {
    if (getCurrentSection() > 0 && !returnToTopBntActive) {
        ReturnToTopBntChangeState()
    }
    if (getCurrentSection() == 0) {
        ReturnToTopBntChangeState()
    }
}

const ReturnToTopBntChangeState = () : void => {
    returnToTopBntActive = !returnToTopBntActive
    returnToTopBnt.classList.toggle('displayNone')
}

const returnToTopBntState = () : boolean  => {
    return returnToTopBntActive
}


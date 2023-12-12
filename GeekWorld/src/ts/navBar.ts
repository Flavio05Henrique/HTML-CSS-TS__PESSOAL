const navBar = document.querySelector('[data="secHome__navBar"]') as HTMLUListElement

navBar.addEventListener('click', event => {
    const elementClicked = event.target as HTMLElement
    const elementClickedTag = elementClicked.tagName

    if(elementClickedTag == "BUTTON") {
        executeAnimetionActions(null)
        executeAnimetionActions(parseInt(elementClicked.id))
        activateReturnToTopBnt()
    } 
})
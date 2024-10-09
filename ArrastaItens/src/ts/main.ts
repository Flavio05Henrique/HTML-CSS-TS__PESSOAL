import { htmlElementItemMove } from "./htmlELements.js"

const container =  document.querySelector('.container') as HTMLDivElement
const containerAuxiliary = document.querySelector('.container__auxiliary') as HTMLElement

interface HtmlDimensions {
    'width': any,
    'heigh': any
}

interface htmlPosition {
    'x': number,
    'y': number
}

let mousePointX: number = 0
let mousePointY: number = 0
let mousePointInitX: number = 0
let mousePointInitY: number = 0
let mouseMovementY = 0  
let mouseMovementX = 0
let clickOn: boolean = false
let elementClickedCopy: HTMLElement
let positionAdjustmentX: number
let positionAdjustmentY: number

let containerPosition: htmlPosition
let elementDraggablePosition: htmlPosition
let draggableElementHtmlDimensions: htmlPosition
let draggableElementCurrentPositionInArray: number
let draggableElementInitPositionInArray: number

let draggableItemsList: any[] = []

const initialize = (): void => {
    containerPosition = getHtmlElementPosition(containerAuxiliary)
    const exampleElement = container.querySelector('[data="interactive_item_"]') as HTMLElement
    draggableElementHtmlDimensions = getHtmlElementPosition(exampleElement)
    positionAdjustmentX =  draggableElementHtmlDimensions.x 
    positionAdjustmentY =  draggableElementHtmlDimensions.y 
}

const createList = (list: any[]): void => {
    draggableItemsList = list
}

const createElements = (numOfItens: number) :void => {
    let i
    const list = []
    container.innerHTML = ""
    for(i = 0; i <= numOfItens; i++) {
        container.innerHTML += htmlElementItemMove(i, i)
        list.push(htmlElementItemMove(i, i))
    }
    createList(list)
}

containerAuxiliary.addEventListener('mousedown', event => {
    const elementClicked = event.target as HTMLElement

    if(elementClicked.className == "container") return

    elementClicked.style.position = "absolute" 
    elementClicked.style.pointerEvents = "none"
    elementDraggablePosition = getHtmlElementPosition(elementClicked)
    containerAuxiliary.appendChild(elementClicked)
    elementClickedCopy = elementClicked
    setMousePositionInit(event.clientX, event.clientY)
    setMousePosition(event.clientX, event.clientY)
    setElementItemPosition()
    const id = parseInt(elementClicked.id)
    draggableItemsList[id] = `
        <div class="item item__shadow" id="${elementClicked.id}">
        </div>
    `
    draggableElementCurrentPositionInArray = id
    draggableElementInitPositionInArray = id
    updateDraggableItems()
    clickOn = true
})

containerAuxiliary.addEventListener('mouseup', event => {
    // elementClicked.style.position = "static" 
    containerAuxiliary.removeChild(elementClickedCopy)
    clickOn = false
})
  

containerAuxiliary.addEventListener('mousemove', event => {
        const mousePositionX = event.clientX
        const mousePositionY = event.clientY
        const stepsUp = 100
        const stepsDown = -100
        const mousePositionXPrevious = mousePointX
        const mousePositionYPrevious = mousePointY
        let mouseDirectionX = 0
        let mouseDirectionY = 0
        
        
        
        
        
        // console.log("x: ", mousePointX, "y: ", mousePointY)
        if(elementClickedCopy && clickOn) {
            setMousePosition(mousePositionX, mousePositionY)

            mouseDirectionX = mousePointX > mousePositionXPrevious ? 1 : -1
            mouseDirectionY = mousePointY > mousePositionYPrevious ? 1 : -1

            mouseMovementX += mouseDirectionX
            mouseMovementY += mousePointY - mousePositionYPrevious

            
            if(mouseMovementY >= stepsUp || mouseMovementY <= stepsDown) {
                const hoverElement = document.elementFromPoint(mousePositionX, mousePositionY) as HTMLElement
                const hoverElementId = parseInt(hoverElement.id)
                const id = draggableElementCurrentPositionInArray
                const initId = draggableElementInitPositionInArray
                
                console.log('andou')
                mouseMovementY = 0
                // console.log(htmlElementItemMove(id))
                if(hoverElementId == id) return
                draggableItemsList[hoverElementId] = htmlElementItemMove(initId, hoverElementId)
                draggableItemsList[id] = htmlElementItemMove(hoverElementId, id)
                draggableElementCurrentPositionInArray = hoverElementId
                console.log(draggableElementCurrentPositionInArray)
                    // console.log(draggableElementPositionInArray)
            }
            // console.log(mouseMovementY)
            // console.log('mouse')
            // console.log(mousePositionX - mousePointInitX)
            // console.log(mousePointX - mousePointInitX)
            updateDraggableItems()
            setElementItemPosition()
        }     
})

const setMousePosition = (x: number, y: number): void => {
    mousePointX = x - mousePointInitX + (elementDraggablePosition.x - containerPosition.x)
    mousePointY = y - mousePointInitY + (elementDraggablePosition.y - containerPosition.y)
}

const setMousePositionInit = (x: number, y: number): void => {
    mousePointInitX = x 
    mousePointInitY = y 
}

const setElementItemPosition = (): void => {
    elementClickedCopy.style.top =  mousePointY  + "px"
    elementClickedCopy.style.left = mousePointX  + "px"
}

const updateDraggableItems = (): void => {
    container.innerHTML = draggableItemsList.join('')
}

const getHtmlElementHtmlDimensions = (element: HTMLElement): HtmlDimensions => {
   const HtmlDimensions = {
        'width': element.clientWidth,
        'heigh': element.clientHeight
    }

    return HtmlDimensions
}

const getHtmlElementPosition = (element: HTMLElement): htmlPosition => {
    const position = {
        'x': element.getBoundingClientRect().left,
        'y': element.getBoundingClientRect().top
    }

    return position
}

createElements(3)
initialize()
console.log(draggableItemsList)


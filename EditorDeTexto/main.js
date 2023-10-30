const container = document.querySelector('[data="editor__textIndex"]')
const containerText = document.querySelector('[data="editor__text"]')

// container.addEventListener("onselectionchange", event => {
    
//     console.log(event)
//     const select = window.getSelection();
//     const selectText = select.toString();
//     if (!selectText) {
//         return
//     }
//     const range = select.getRangeAt(0)

//     const startOffset = range.startOffset;
//     const endOffset = range.endOffset;
//     console.log(select.anchorOffset, select.focusOffset)
//     const textComplete = container.textContent
//     let selectPointStart
//     let selectPointEnd 

//     if (select.anchorOffset < select.focusOffset) {
//         selectPointStart = select.anchorOffset
//         selectPointEnd = select.focusOffset -1
//     } else {
//         selectPointStart = select.focusOffset
//         selectPointEnd = select.anchorOffset -1
//     }
//     console.log(container.innerHTML, textComplete)

//     const string1 = textComplete.substring(0, selectPointStart)
//     const string2 = textComplete.substring(selectPointEnd + 1)
//     const string3 = "<b>" + selectText + "</b>"
//     const stringFinal = string1 + string3 + string2

//     container.innerHTML = stringFinal

//     console.log(selectPointStart, selectPointEnd)
//     console.log("val1: " + string1 + " val2: " + string2)

//     console.log(select, select.toString().length)
// })

container.addEventListener('click', event => {
    console.log('oi')
    containerText.focus()
})
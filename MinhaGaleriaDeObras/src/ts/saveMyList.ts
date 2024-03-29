const saveBnt = document.querySelector('[data="saveYourList__save"]') as HTMLButtonElement
const loadBnt = document.querySelector('[data="saveYourList__load"]') as HTMLButtonElement

saveBnt.addEventListener('click', () => {
    if(MyList.length == 0) return
    saveMyListFile(MyList)
})

loadBnt.addEventListener('click', () => {
    loadMyListFile()
})

const saveMyListFile = (list: {}) => {
    const downloadLink = document.createElement('a')
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)

    const blob = new Blob([JSON.stringify(list)], {type: 'application/json'})

    const url = window.URL.createObjectURL(blob)
    downloadLink.href = url
    downloadLink.download = 'MinhaListaDeObras.json'
    downloadLink.click()
    window.URL.revokeObjectURL(url)
    downloadLink.remove()
    showMessageSuccess("Download", "Download iniciado com sucesso!")
}

const loadMyListFile = () => {
    const inputFile = document.createElement('input') as HTMLInputElement
    inputFile.type = 'file'
    inputFile.style.display = 'none'
    document.body.appendChild(inputFile)

    inputFile.addEventListener('change', () => {
        if(inputFile.files == null) {
            showMessageError("Sem arquivo", "Nenhum arquivo detectado!")
            return
        }

        const file = inputFile.files[0]
        
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            saveInBrowser(MyList = JSON.parse(reader.result as string))
            showMessageSuccess("Sucesso", "Sua lista foi carregada com sucesso!")
        })

        reader.readAsText(file)
    })

    inputFile.click()
}
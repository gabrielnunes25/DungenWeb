function game(){
    //Campo de descrição
    var description = window.document.getElementById('descricao')
    //Campo que recebi o comando do Usuario
    var comand = window.document.getElementById('txtcomando')
    //Itens do campo de status
    var life = window.document.getElementById('life')
    var strong = window.document.getElementById('strong')
    var shield = window.document.getElementById('shield')
    var potion = window.document.getElementById('potion')


    // window.alert(`${comando.value} Teste 2`)

    description.innerHTML = `${comand.value}`
    //life.innerHTML = Number.parseInt(life.textContent) + 1
    comand.value = ''
}


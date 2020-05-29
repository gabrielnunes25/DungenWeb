var vidaMonstro = 10
function game(){
    //Campo de descrição
    var descricao = window.document.getElementById('descricao')
    //Campo que recebi o comando do Usuario
    var comando = document.getElementById('txtcomando')
    //Itens do campo de status
    var vida = window.document.getElementById('vida')
    var forca = window.document.getElementById('forca')
    var escudo = window.document.getElementById('escudo')
    var pocao = window.document.getElementById('pocao')
    //Status do monstro


    // window.alert(`${comando.value} Teste 2`)

    descricao.innerHTML = `${comando.value} - `
    // vida.innerHTML = Number.parseInt(vida.textContent) + 1

    //Criando Monstro
    if (vidaMonstro < 0){
        vidaMonstro = 15
    }
    
    //Escolhas
    if (Number(comando.value) == 1) {
        atacar()
        descricao.innerText += `Vida do monstro ${vidaMonstro} `
    }
    else if (comando.value ==2) {
        descricao.innerText += 'Correu'
    }

    //Limpar o campo de entrada
    comando.value = ''
}
function atacar(){
    descricao.innerHTML += `Vida do Heroi - ${vida.textContent} - `
    vidaMonstro = vidaMonstro - Number(forca.textContent)

}

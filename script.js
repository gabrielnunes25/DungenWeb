var monstro = {
    vida: 0,
    ataque: 0,
    escudo: 5,
    nro: 0,
}
var status = 0;
var level = 1;

function game(){
    //Campo de descrição
    var descricao = window.document.getElementById('descricao');
    //Campo que recebi o comando do Usuario
    var comando = document.getElementById('txtcomando');
    //Itens do campo de status
    var vida = window.document.getElementById('vida');
    var forca = window.document.getElementById('forca');
    var escudo = window.document.getElementById('escudo');
    var pocao = window.document.getElementById('pocao');

    descricao.innerHTML = comando.value.toUpperCase() + ' -';

    //Criando Monstro
    if (monstro.vida <= 0){
        monstro.vida = getRandom(7, 15);
        monstro.ataque = getRandom(2, 4);
        monstro.nro += 1;
    }
    
    //Escolhas
    switch (comando.value.toUpperCase()) {
        case '1':
            descricao.innerHTML += ' Vida do monstro ' + monstro.nro + ' antes do ataque: ' + monstro.vida ;
            atacar();
            descricao.innerHTML += '<br/> Vida do monstro ' + monstro.nro + ' depois do ataque: ' + monstro.vida;
            break;
        case '2':
            vida.textContent -= 4;
            descricao.innerHTML += ' Correu e Apanhou';
            break;
        default:
            console.log('Não tem esse')
            break;
        
    }

    if(vida.textContent <= 0){
        descricao.innerHTML = 'VOCÊ FOI DERROTADO';
        vida.textContent = 10;
    }
    
    //Limpar o campo de entrada
    comando.value = '';
}

function getRandom(min, max){
    return Math.floor(Math.random() * max + min);
}

function atacar(){
    monstro.vida -= Number(forca.textContent);
}
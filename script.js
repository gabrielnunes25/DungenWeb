var monstro = {
    vida: 0,
    ataque: 0,
    escudo: 5,
    nro: 0,
}
var status = 1;
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

    //Criando Monstro
    if (monstro.vida <= 0){
        monstro.vida = getRandom(7, 15);
        monstro.ataque = getRandom(2, 4);
        monstro.nro += 1;
    }

    // STATUS
    switch (Number(status)){
        // TUTORIAL
        case 1:
            descricao.innerHTML = 'Digite <strong>1</strong> para <strong>atacar</strong> o monstro ou <strong>2</strong> para <strong>correr</strong> caso você esteja com medo. <br/><br/><span class="aviso">Precione ENTER ou CLIQUE EM ENVIAR para continuar!</span>'
            status = 2;
            break;

        // HISTÓRIA INICIAL
        case 2:
            descricao.innerHTML = 'Você entrou em uma dungeon! <br/> Tome cuidado, pois tem alguns monstros que podem te atacar. <br/><br/><span class="aviso">Precione ENTER ou CLIQUE EM ENVIAR para continuar!</span>'
            status = 3;
            break;

        // PARTIDA
        case 3:
            comando.disabled = false;
            descricao.innerHTML = comando.value.toUpperCase() + ' -';

            //Escolhas
            switch (comando.value.toUpperCase()) {
                // ATACOU
                case '1':
                    descricao.innerHTML += ' Vida do monstro ' + monstro.nro + ' antes do ataque: ' + monstro.vida ;
                    atacar();
                    descricao.innerHTML += '<br/> Vida do monstro ' + monstro.nro + ' depois do ataque: ' + monstro.vida;
                    break;
                
                // CORREU
                case '2':
                    vida.textContent -= 4;
                    descricao.innerHTML += ' Correu e Apanhou';
                    break;
                
                    // NÃO ESCOLHEU NENHUM
                default:
                    console.log('Não tem esse')
                    break;
            }
            if(vida.textContent <= 0){
                status = 4;
            }
            break;

        // FINAL DO JOGO
        case 4:
            descricao.innerHTML = 'VOCÊ FOI DERROTADO';
            vida.textContent = 10;
            status = 2;
            break;
    }

    if(vida.textContent <= 0){
        descricao.innerHTML = 'VOCÊ FOI DERROTADO';
        vida.textContent = 10;
        status = 2;
    }
    
    //Limpar o campo de entrada
    comando.value = '';
}

function getRandom(min, max){
    return Math.floor((Math.random() * (max - min)) + min);
}

function atacar(){
    monstro.vida -= Number(forca.textContent);
}
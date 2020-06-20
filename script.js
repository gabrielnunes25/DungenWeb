var monstro = {
    vida: 10,
    ataque: 4,
    escudo: 3,
    nro: 8,
}
var status = 1;
var level = 1;

var comando;
var descricao;
var vida;
var ataque;
var escudo;
var pocao;

function game(){
    //Campo de descrição
    descricao = window.document.getElementById('descricao');
    //Campo que recebi o comando do Usuario
    comando = document.getElementById('txtcomando');
    //Itens do campo de status
    vida = window.document.getElementById('vida');
    ataque = window.document.getElementById('forca');
    escudo = window.document.getElementById('escudo');
    pocao = window.document.getElementById('pocao');

    //Criando Monstro
    if (monstro.vida <= 0){
        monstro.vida = getRandom(7, 15);
        monstro.ataque = getRandom(2, 4);
        monstro.nro += 1;
    }

    // levelUp(monstro.nro); fazer um if e colocar o resto no else !!! Vai funcionar

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
            // levelUp();

            //Escolhas
            switch (comando.value.toUpperCase()) {
                // ATACOU
                case '1':
                    console.log('o heroi vai atacar')
                    descricao.innerHTML += ' Vida do monstro ' + monstro.nro + ' antes do ataque: ' + monstro.vida ;
                    heroiAtacar();
                    descricao.innerHTML += '<br/> Vida do monstro ' + monstro.nro + ' depois do ataque: ' + monstro.vida;
                    break;
                
                // CORREU
                case '2':
                    console.log('o monstro vai atacar')
                    monstroAtaque();
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

function heroiAtacar(){
    let dado = getRandom(1, 10);
    console.log('valor dado: ' + dado);

    if(dado == 1){
        console.log('heroi erro critico');
        escudo.textContent -= 1;
    }else if(dado == 10){
        console.log('heroi acerto critico');
        console.log('o acerto foi de ' + (ataque.textContent * 1.5));
        monstro.vida -= (ataque.textContent * 1.5);
    }else if(dado >= monstro.escudo){
        console.log('heroi acertou');
        monstro.vida -= ataque.textContent;
    }else {
        console.log('heroi erro')
    }

}

function monstroAtaque() {
    let dado = getRandom(1, 10);
    console.log('valor dado: ' + dado);

    if(dado == 1){
        console.log('monstro erro critico');
        monstro.escudo -= 2;
    }else if(dado == 10){
        console.log('monstro acerto critico');
        console.log('O acerto foi de ' + (monstro.ataque * 1.5));
        vida.textContent -= (monstro.ataque * 1.5);
    }else if(dado >= escudo.textContent){
        console.log('monstro acertou');
        vida.textContent -= monstro.ataque;
    }else {
        console.log('monstro erro')
    }
}

function levelUp(){
    if(monstro.nro % 10 == 0 && monstro.nro > 0){
        console.log('10 monstros morreram')

        descricao.innerHTML = 'Você matou 10 mosntros <br/> Agora pode escolher algumas das oções para ganahr mais 1 ponto <br/> <br/> ATAQUE <br/> ESCUDO <br/> POÇÃO <br/> ';

        let flag = 1
        do{
            switch(comando.value.toUpperCase()){
                case 'ATAQUE':
                    console.log('escolheu ATAQUE');
                    ataque.textContent += 1;
                    flag = 0;
                    break;
                case 'ESCUDO':
                    console.log('escolheu ESCUDO');
                    escudo.textContent += 1;
                    flag = 0;
                    break;
                case 'POCAO':
                    console.log('escolheu POÇÃO');
                    pocao.textContent += 1;
                    flag = 0;
                    break;
            }
        }while(flag == 0)
    }
}
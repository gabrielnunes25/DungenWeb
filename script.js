var monstro = {
    nome: 'Goblin',
    vida: 10,
    ataque: 4,
    escudo: 3,
    nro: 0,
}
var status = 'TUTORIAL';
var level = 1;

var comando;
var descricao;
var vida;
var ataque;
var escudo;
var pocao;

function game() {
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
    if (monstro.vida <= 0) {
        monstro.vida = getRandom(7, 15);
        monstro.ataque = getRandom(2, 4);
        monstro.nro += 1;
    }

    if (monstro.nro % 10 == 0 && monstro.nro > 0) {
        status = 'SUBIU DE LEVEL';
        monstro.nro += 1;
        subiuLevel();
        console.clear();
    }

    // STATUS
    switch (status) {
        // TUTORIAL
        case 'TUTORIAL':
            descricao.innerHTML = '<h1>Tutorial</h1><br/>  Para jogar você jogar precisa digitar os comandos para o herói, os comando são: <br/><br/><strong>ATACAR</strong> -> Para que o herói ataque o mosntro, mas lembre que ele pode errar. <br/><strong>CORRER</strong> -> Para o herói correr do monstro, assim você será atacado pelas costas. <br/><strong>CURAR</strong> -> O herói vai curar 4 pontos de vida.';

            status = 'EXPLICANDO';
            break;
        // EXPLICANDO
        case 'EXPLICANDO':
            descricao.innerHTML = '<h1>Tutorial</h1><br/> As imagens a cima significam os atributos do herói.<br/><br/><img src="imgs/vida.png" alt=""> -> São os pontos de vida.<br/><img src="imgs/forca.png" alt=""> -> A foça (dano) dele.<br/><img src="imgs/escudo.png" alt=""> -> A proteção da armadura do herói.<br/><img src="imgs/pocao.png" alt=""> -> A quantidade de poções que ele tem.<br/>';

            status = 'HISTÓRIA INICIAL';
            break;

        // HISTÓRIA INICIAL
        case 'HISTÓRIA INICIAL':
            descricao.innerHTML = '<h1>Você entrou em uma dungeon!</h1><br/> Tome cuidado, pois tem alguns monstros podem te atacar.'
            comando.disabled = true;
            status = 'PARTIDA';
            break;

        // PARTIDA
        case 'PARTIDA':
            comando.disabled = false;

            escolhaHeroi();
        
            break;

        // SUBIU DE LEVEL
        case 'SUBIU DE LEVEL':
            subiuLevel();
            break;
    }

    if (vida.textContent <= 0) {
        descricao.innerHTML = '<h1>VOCÊ MORREU</h1><br/>infelizmente você foi derrotado, tome mais cuidado da proxima vez.<br/>Mas você conseguiu derrotar alguns monstros.<br/><br/><h2>MONSTROS DERROTADOS: ' + monstro.nro + ' </h2><br/><br/><span class="aviso">Precione ENTER ou CLIQUE em ENVIAR para começar de novo!</span>';

        comando.disabled = true;
        console.clear();
        console.log('o heroi morreu');
        vida.textContent = 10;
        status = 'HISTÓRIA INICIAL';
    }


    //Limpar o campo de entrada
    comando.value = '';
}

function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function heroiAtacar() {
    let dado = getRandom(1, 10);
    console.log('valor dado: ' + dado);

    if (dado == 1) {
        console.log('heroi erro critico');
        escudo.textContent -= 1;
    } else if (dado == 10) {
        console.log('heroi acerto critico');
        console.log('o acerto foi de ' + (ataque.textContent * 1.5));
        monstro.vida -= (ataque.textContent * 1.5);
    } else if (dado >= monstro.escudo) {
        console.log('heroi acertou');
        monstro.vida -= ataque.textContent;
    } else {
        console.log('heroi erro')
    }

}

function monstroAtaque() {
    let dado = getRandom(1, 10);
    console.log('valor dado: ' + dado);

    if (dado == 1) {
        console.log('monstro erro critico');
        monstro.escudo -= 2;
    } else if (dado == 10) {
        console.log('monstro acerto critico');
        console.log('O acerto foi de ' + (monstro.ataque * 1.5));
        vida.textContent -= (monstro.ataque * 1.5);
    } else if (dado >= escudo.textContent) {
        console.log('monstro acertou');
        vida.textContent -= monstro.ataque;
    } else {
        console.log('monstro erro')
    }
}

function escolhaHeroi() {
    descricao.innerHTML = comando.value.toUpperCase() + ' -';
    descricao.innerHTML += ' Apareceu um ' + monstro.nome + 'no seu caminho, o que vai fazer? <br/>';
    switch (comando.value.toUpperCase()) {
        // ATACOU
        case 'ATACAR':
            console.log('o heroi vai atacar')
            descricao.innerHTML += ' Vida do monstro ' + monstro.nro + ' antes do ataque: ' + monstro.vida;
            heroiAtacar();
            descricao.innerHTML += '<br/> Vida do monstro ' + monstro.nro + ' depois do ataque: ' + monstro.vida;
            break;

        // CORREU
        case 'CORRER':
            console.log('o monstro vai atacar')
            monstroAtaque();
            descricao.innerHTML += ' Correu e Apanhou';
            break;

        case 'CURAR':
            console.log('heroi usou pocao')
            if(pocao.textContent > 0){
                vida.textContent = Number(vida.textContent) + 4;
                pocao.textContent = Number(pocao.textContent) - 1;
                descricao.innerHTML += ' Você se curou 4 pts de vida';
            }else{
                descricao.innerHTML += ' Você não tem poções para usar';
            }
            break;
            

        // NÃO ESCOLHEU NENHUM
        default:
            console.log('Não tem esse')
            break;
    }
}

function subiuLevel(){
    console.log('10 monstros morreram')

    descricao.innerHTML = 'Você matou 10 mosntros <br/> Agora pode escolher algumas das opções abaixo para ganhar mais 1 ponto <br/><br/> FORÇA <br/> ESCUDO <br/> POÇÃO <br/> ';

    switch (comando.value.toUpperCase()) {
        case 'FORÇA':
            console.log('escolheu ATAQUE');
            ataque.textContent = Number(ataque.textContent) + 1 ;
            status = 'PARTIDA';
            escolhaHeroi();
            break;
        case 'ESCUDO':
            console.log('escolheu ESCUDO');
            escudo.textContent = Number(escudo.textContent) + 1 ;
            status = 'PARTIDA';
            escolhaHeroi();
            break;
        case 'POÇÃO':
            console.log('escolheu POÇÃO');
            pocao.textContent = Number(pocao.textContent) + 1 ;
            status = 'PARTIDA';
            escolhaHeroi();
            break;
    }
}
var monstro = {
    nome: 'Goblin',
    vida: 10,
    forca: 4,
    escudo: 3,
    nro: 0,
    status: 'NOVO',
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
    criandoMonstro();

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
            descricao.innerHTML = '<h1>Tutorial</h1><br/>  Para jogar você jogar precisa digitar os comandos para o herói.<br/> Os comando são: <br/><br/><strong>ATACAR</strong> -> Para que o herói ataque o mosntro, mas lembre que ele pode errar. <br/><strong>CORRER</strong> -> Para o herói correr do monstro, assim você será atacado pelas costas. <br/><strong>CURAR</strong> -> O herói vai curar 4 pontos de vida.';

            status = 'EXPLICANDO';
            break;
        // EXPLICANDO
        case 'EXPLICANDO':
            descricao.innerHTML = '<h1>Tutorial</h1><br/> As imagens acima são os atributos do herói.<br/><br/><img src="imgs/vida.png" alt=""> -> São os pontos de vida.<br/><img src="imgs/forca.png" alt=""> -> A foça (dano) dele.<br/><img src="imgs/escudo.png" alt=""> -> A proteção da armadura do herói.<br/><img src="imgs/pocao.png" alt=""> -> A quantidade de poções que ele tem.<br/>';

            status = 'HISTÓRIA INICIAL';
            break;

        // HISTÓRIA INICIAL
        case 'HISTÓRIA INICIAL':
            descricao.innerHTML = '<h1>Você entrou em uma dungeon!</h1><br/> Tome cuidado, pois tem alguns monstros podem te atacar.'
            comando.disabled = true;

            // CRIANDO HERÓI
            criarHeroi();

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
        vida.textContent = '-';
        ataque.textContent = '-';
        escudo.textContent = '-';
        pocao.textContent = '-';

        comando.disabled = true;
        console.clear();
        console.log('o heroi morreu');
        status = 'HISTÓRIA INICIAL';
    }


    //Limpar o campo de entrada
    comando.value = '';
}

function getRandom(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
}

function heroiAtacar() {
    let dado = getRandom(1, 10);
    console.log('valor dado: ' + dado);

    if (dado == 1) {
        console.log('heroi erro critico');
        if (escudo.textContent > 0) {
            escudo.textContent -= 1;
        }
        // descricao.innerHTML += 'O Herói cometeu um erro crítico.';
    } else if (dado == 10) {
        console.log('heroi acerto critico');
        console.log('o acerto foi de ' + (ataque.textContent * 1.5));
        monstro.vida -= (ataque.textContent * 1.5);
        // descricao.innerHTML += 'O Herói cometeu um acerto crítico.';
    } else if (dado >= monstro.escudo) {
        console.log('heroi acertou');
        monstro.vida -= ataque.textContent;
        // descricao.innerHTML += 'O Herói cometeu um acerto.';
    } else {
        console.log('heroi erro')
        // descricao.innerHTML += 'O Herói cometeu um erro.';
    }

}

function monstroAtaque() {
    let dado = getRandom(1, 10);
    console.log('valor dado: ' + dado);

    descricao.innerHTML += '<br/>O ' + monstro.nome + ' te atacou';
    if (dado == 1) {
        console.log('monstro erro critico');
        if (monstro.escudo > 0) {
            monstro.escudo -= 2;
        }
        // descricao.innerHTML += 'O monstro cometeu um erro crítico.';
    } else if (dado == 10) {
        console.log('monstro acerto critico');
        console.log('O acerto foi de ' + (monstro.forca * 1.5));
        vida.textContent -= (monstro.forca * 1.5);
        // descricao.innerHTML += 'O monstro cometeu um acerto crítico.';
    } else if (dado >= escudo.textContent) {
        console.log('monstro acertou');
        vida.textContent -= monstro.forca;
        // descricao.innerHTML += 'O monstro cometeu um acerto.';
    } else {
        console.log('monstro erro')
        // descricao.innerHTML += 'O monstro cometeu um erro.';
    }
}

function escolhaHeroi() {
    descricao.innerHTML = comando.value.toUpperCase() + '<br/>';

    criandoMonstro();

    if (monstro.status == 'NOVO') {
        descricao.innerHTML += 'Apareceu um ' + monstro.nome + ' no seu caminho.<br/>Ele tem uma força ' + monstro.forca + ' e ' + monstro.vida + ' pontos de vida.<br/><br/>';
    } else {
        descricao.innerHTML += 'O ' + monstro.nome + ' ainda não morreu! <br/> Continue lutando!<br/>A força dele é ' + monstro.forca + ' e ainda tem ' + monstro.vida + ' pontos de vida.<br/><br/>';
    }

    descricao.innerHTML += 'O que vai fazer?<br/>';
    monstro.status = '';

    switch (comando.value.toUpperCase()) {
        // ATACOU
        case 'ATACAR':
            console.log('o heroi vai atacar')
            // descricao.innerHTML += ' Vida do monstro ' + monstro.nro + ' antes do ataque: ' + monstro.vida;
            heroiAtacar();
            monstroAtaque();
            // descricao.innerHTML += '<br/> Vida do monstro ' + monstro.nro + ' depois do ataque: ' + monstro.vida;
            break;

        // CORREU
        case 'CORRER':
            console.log('o monstro vai atacar')
            monstroAtaque();
            // descricao.innerHTML += ' Correu e Apanhou';
            break;

        case 'CURAR':
            console.log('heroi usou pocao')
            if (pocao.textContent > 0) {
                vida.textContent = Number(vida.textContent) + 4;
                pocao.textContent = Number(pocao.textContent) - 1;
                descricao.innerHTML += ' Você se curou 4 pts de vida';
            } else {
                descricao.innerHTML += ' Você não tem poções para usar';
            }
            break;

        // NÃO ESCOLHEU NENHUM
        default:
            console.log('Não tem esse')
            break;
    }
}

function subiuLevel() {
    console.log('10 monstros morreram')

    descricao.innerHTML = 'Você matou 10 mosntros <br/> Agora pode escolher algumas das opções abaixo para ganhar mais 1 ponto <br/><br/> FORÇA <br/> ESCUDO <br/> POÇÃO <br/> ';

    switch (comando.value.toUpperCase()) {
        case 'FORÇA':
            console.log('escolheu ATAQUE');
            ataque.textContent = Number(ataque.textContent) + 1;
            status = 'PARTIDA';
            escolhaHeroi();
            break;
        case 'ESCUDO':
            console.log('escolheu ESCUDO');
            escudo.textContent = Number(escudo.textContent) + 1;
            status = 'PARTIDA';
            escolhaHeroi();
            break;
        case 'POÇÃO':
            console.log('escolheu POÇÃO');
            pocao.textContent = Number(pocao.textContent) + 1;
            status = 'PARTIDA';
            escolhaHeroi();
            break;
    }
}

function criandoMonstro() {
    if (monstro.vida <= 0) {
        let nomes = ['Goblin', 'Esqueleto', 'Slime', 'Zombie'];
        monstro.vida = getRandom(8, 15);
        monstro.forca = getRandom(2, 4);
        monstro.nome = nomes[getRandom(0, (nomes.length - 1))];
        monstro.status = 'NOVO';
        monstro.nro += 1;
    }
}

function criarHeroi() {
    vida.textContent = getRandom(13, 20);
    ataque.textContent = getRandom(5, 8);
    escudo.textContent = getRandom(4, 7);
    pocao.textContent = 3;
}
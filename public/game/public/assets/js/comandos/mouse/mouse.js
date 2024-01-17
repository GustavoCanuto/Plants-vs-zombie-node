//Variaveis Iniciais Planta
var cursorTabuleiroAmarelo = document.getElementById('cursorTabuleiroAmarelo');
var seletorTabuleiroAmarelo = document.getElementById('seletorTabuleiroAmarelo');
var celulaAtualPlanta = document.getElementById('cellLinha1Coluna2');
var celulaAnteriorPlanta = document.getElementById('cellLinha1Coluna2');

//Variaveis Iniciais Zombie
var cursorTabuleiroAzul = document.getElementById('cursorTabuleiroAzul');
var seletorTabuleiroAzul = document.getElementById('seletorTabuleiroAzul');
var celulaAtualZombie = document.getElementById('cellLinha1Coluna10');
var celulaAnteriorZombie = document.getElementById('cellLinha1Coluna10');

// previa Imagem Inicial Zombie
var divPreviaPersonagemZombie = document.createElement('div');
divPreviaPersonagemZombie.classList = 'previa-personagem';
var imgPreviaPersonagemZombie = document.createElement('img');
imgPreviaPersonagemZombie.src = './assets/img/personagens/zombies/cardtombstone.webp';
imgPreviaPersonagemZombie.id = "prevPersonagemZombie";
divPreviaPersonagemZombie.appendChild(imgPreviaPersonagemZombie);
celulaAtualZombie.appendChild(divPreviaPersonagemZombie);

// previa Imagem Inicial Planta
var divPreviaPersonagemPlanta = document.createElement('div');
divPreviaPersonagemPlanta.classList = 'previa-personagem';
var imgPreviaPersonagemPlanta = document.createElement('img');
imgPreviaPersonagemPlanta.src = './assets/img/personagens/plants/sunflower.webp';
imgPreviaPersonagemPlanta.id = "prevPersonagemPlanta";
divPreviaPersonagemPlanta.appendChild(imgPreviaPersonagemPlanta);
celulaAtualPlanta.appendChild(divPreviaPersonagemPlanta);

// geral
var main = document.querySelector('main');
var tabuleiroID = document.getElementById('tabuleiroID');
var cells = document.querySelectorAll('.cell');

var LadoQueUsaMouse = 0;

var cursorTabuleiro = [{ planta: cursorTabuleiroAmarelo }, { zombie: cursorTabuleiroAzul }]
var seletorTabuleiro = [{ planta: seletorTabuleiroAmarelo }, { zombie: seletorTabuleiroAzul }]
var celulaAtual = [{ planta: celulaAtualPlanta }, { zombie: celulaAtualZombie }]
var celulaAnterior = [{ planta: celulaAnteriorPlanta }, { zombie: celulaAnteriorZombie }]
var divPreviaPersonagem = [{ planta: divPreviaPersonagemPlanta }, { zombie: divPreviaPersonagemZombie }]
var imgPreviaPersonagem = [imgPreviaPersonagemPlanta, imgPreviaPersonagemZombie]

//controle
var isMouseActive = false;
var timeoutId = [];


var centerImage = function (container) {

    const chave = Object.keys(container);
    const valor = container[chave];

    if (!valor.classList.contains('grass-cutter')) {

        var rectContainer = valor.getBoundingClientRect();
        var mainRect = main.getBoundingClientRect(); // Adicione isso para obter as coordenadas do main

        var xPercentage = ((rectContainer.left - mainRect.left + rectContainer.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
        var yPercentage = ((rectContainer.top - mainRect.top) / mainRect.height) * 100;

        if (chave == 'zombie') {
            cursorTabuleiroAzul.style.left = xPercentage + '%';
            cursorTabuleiroAzul.style.top = yPercentage + '%';
        } else if (chave == 'planta') {
            cursorTabuleiroAmarelo.style.left = xPercentage + '%';
            cursorTabuleiroAmarelo.style.top = yPercentage + '%';
        }
    }
};




centerImage(celulaAtual[0]);
centerImage(celulaAtual[1]);

var chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
var cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;

function mouseEnterCelula() {

    cells.forEach(function (cell) {

        cell.addEventListener('mouseenter', function () {
            functionMouseEnterCelula(cell.id, LadoQueUsaMouse, chaveMouse)
            socket2.emit('mouseEnterCelula', { cellID: cell.id, LadoQueUsaMouse: LadoQueUsaMouse, chaveMouse: chaveMouse, sala: sala })

        });
    });

}

mouseEnterCelula();

function functionMouseEnterCelula(cellID, lado, chave) {

    if (lado == 0) {
        funcaoMouseGeral[2](cellID, lado, chave);
    } else {
        funcaoMouseGeral[3](cellID, lado, chave);
    }
}


var funcaoMouseEnter = function functionMouseEnterCelulaCod(cellID, lado, chave) {
    var cell = document.getElementById(cellID)
    celulaAtual[lado][chave] = cell;
    const celulaAtualMouse = celulaAtual[lado][chave]

    if (!celulaAtualMouse.classList.contains('grass-cutter')) {

        const prevSeletorTabuleiro = seletorTabuleiro[lado][chave].cloneNode(true);

        setTimeout(function () {
            cell.appendChild(prevSeletorTabuleiro);
            prevSeletorTabuleiro.style.opacity = '0.3';
        }, 100);

        setTimeout(function () {
            cell.appendChild(seletorTabuleiro[lado][chave]);
            cell.appendChild(divPreviaPersonagem[lado][chave]);
            seletorTabuleiro[lado][chave].style.opacity = '1';
            cell.removeChild(prevSeletorTabuleiro);
        }, 150);

        celulaAnterior[lado][chave] = celulaAtualMouse;
    }

}

function movimentoMouseFuction(clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado) {

    if (lado == 0) {
        funcaoMouseGeral[0](clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado);
    } else {
        funcaoMouseGeral[1](clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado);
    }
}


document.body.addEventListener('mousemove', function (e) {

    var alturaDoBody = document.body.offsetHeight;
    var larguraDoBody = document.body.offsetWidth;

    movimentoMouseFuction(e.clientX, e.clientY, alturaDoBody, larguraDoBody, LadoQueUsaMouse)

    socket2.emit('mouseMoveDentroDoTabuleiro', {
        clientX: e.clientX, clientY: e.clientY,
        alturaDoBody: alturaDoBody, larguraDoBody: larguraDoBody, LadoQueUsaMouse: LadoQueUsaMouse, sala: sala
    })


});



function movimentoMouseFuction(clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado) {

    if (lado == 0) {
        funcaoMouseGeral[0](clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado);
    } else {
        funcaoMouseGeral[1](clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado);
    }
}

var funcaoMouse = function movimentoMouseFuctionCod(clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado) {

    //   var chaveMousex = Object.keys(celulaAtual[lado]);
    // console.log(chaveMousex)

    isMouseActive = true;

    let cursorMouse = lado == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;

    var larguraDoBody = document.body.offsetWidth;
    var alturaDoBody = document.body.offsetHeight;


    var clientXRelativo = (clientX * larguraDoBody / larguraDoBodyAux);
    var clientYRelativo = (clientY * alturaDoBody / alturaDoBodyAux);

    var xPercentage = (clientXRelativo / window.innerWidth) * 100;
    var yPercentage = (clientYRelativo / window.innerHeight) * 100;

    var rectTabuleiro = tabuleiroID.getBoundingClientRect();

    var isInsideTabuleiro = (
        clientXRelativo >= rectTabuleiro.left &&
        clientXRelativo <= rectTabuleiro.right &&
        clientYRelativo >= rectTabuleiro.top &&
        clientYRelativo <= rectTabuleiro.bottom
    );

    if (isInsideTabuleiro) {

        document.body.style.cursor = 'none';
        cursorMouse.style.left = xPercentage + '%';
        cursorMouse.style.top = yPercentage + '%';


        clearTimeout(timeoutId[lado]);
        timeoutId[lado] = setTimeout(function () {

            // centerImageGeral[lado](celulaAnterior[lado])
            centerImage(celulaAnterior[lado]);

        }, 400);

    } else {
        document.body.style.cursor = 'pointer';
        // centerImageGeral[lado](celulaAnterior[lado])
        centerImage(celulaAnterior[lado]);
    }

    // console.log(celulaAtual[lado][chaveMouse].innerHtml)
    if (lado == LadoQueUsaMouse) {
        
        if (celulaAtual[lado][chaveMouse].classList.contains('grass-cutter')) {
            //  centerImageGeral[lado](celulaAnterior[lado])
            centerImage(celulaAnterior[lado]);
            document.body.style.cursor = 'pointer';
        }
    }
}

var funcaoMouseGeral = [];

// Adicionando um clone da função ao array usando bind
funcaoMouseGeral.push(funcaoMouse.bind(null));
funcaoMouseGeral.push(funcaoMouse.bind(null));
funcaoMouseGeral.push(funcaoMouseEnter.bind(null));
funcaoMouseGeral.push(funcaoMouseEnter.bind(null));
//Variaveis Iniciais Planta
let cursorTabuleiroAmarelo = document.getElementById('cursorTabuleiroAmarelo');
let seletorTabuleiroAmarelo = document.getElementById('seletorTabuleiroAmarelo');
let celulaAtualPlanta = document.getElementById('cellLinha1Coluna2');
let celulaAnteriorPlanta = document.getElementById('cellLinha1Coluna2');

//Variaveis Iniciais Zombie
let cursorTabuleiroAzul = document.getElementById('cursorTabuleiroAzul');
let seletorTabuleiroAzul = document.getElementById('seletorTabuleiroAzul');
let celulaAtualZombie = document.getElementById('cellLinha1Coluna10');
let celulaAnteriorZombie = document.getElementById('cellLinha1Coluna10');

// previa Imagem Inicial Zombie
let divPreviaPersonagemZombie = document.createElement('div');
divPreviaPersonagemZombie.classList = 'previa-personagem';
let imgPreviaPersonagemZombie = document.createElement('img');
imgPreviaPersonagemZombie.src = './assets/img/personagens/zombies/cardtombstone.webp';
imgPreviaPersonagemZombie.id = "prevPersonagemZombie";
divPreviaPersonagemZombie.appendChild(imgPreviaPersonagemZombie);
celulaAtualZombie.appendChild(divPreviaPersonagemZombie);

// previa Imagem Inicial Planta
let divPreviaPersonagemPlanta = document.createElement('div');
divPreviaPersonagemPlanta.classList = 'previa-personagem';
let imgPreviaPersonagemPlanta = document.createElement('img');
imgPreviaPersonagemPlanta.src = './assets/img/personagens/plants/sunflower.webp';
imgPreviaPersonagemPlanta.id = "prevPersonagemPlanta";
divPreviaPersonagemPlanta.appendChild(imgPreviaPersonagemPlanta);
celulaAtualPlanta.appendChild(divPreviaPersonagemPlanta);

// geral
let main = document.querySelector('main');
let cells = document.querySelectorAll('.cell');
let tabuleiroID = document.getElementById('tabuleiroID');
let LadoQueUsaMouse = 0;

let cursorTabuleiro = [{ planta: cursorTabuleiroAmarelo }, { zombie: cursorTabuleiroAzul }]
let seletorTabuleiro = [{ planta: seletorTabuleiroAmarelo }, { zombie: seletorTabuleiroAzul }]
let celulaAtual = [{ planta: celulaAtualPlanta }, { zombie: celulaAtualZombie }]
let celulaAnterior = [{ planta: celulaAnteriorPlanta }, { zombie: celulaAnteriorZombie }]
let divPreviaPersonagem = [{ planta: divPreviaPersonagemPlanta }, { zombie: divPreviaPersonagemZombie }]
let imgPreviaPersonagem = [imgPreviaPersonagemPlanta, imgPreviaPersonagemZombie]

//controle
let isMouseActive = false;
let timeoutId = [];


let centerImage = function (container) {

    const chave = Object.keys(container);
    const valor = container[chave];

    if (!valor.classList.contains('grass-cutter')) {

        let rectContainer = valor.getBoundingClientRect();
        let mainRect = main.getBoundingClientRect(); // Adicione isso para obter as coordenadas do main

        let xPercentage = ((rectContainer.left - mainRect.left + rectContainer.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
        let yPercentage = ((rectContainer.top - mainRect.top) / mainRect.height) * 100;

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

let chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
let cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;

function mouseEnterCelula() {

    cells.forEach(function (cell) {

        cell.addEventListener('mouseenter', function () {
            functionMouseEnterCelula(cell.id, LadoQueUsaMouse, chaveMouse)
            socket2.emit('mouseEnterCelula', { cellID: cell.id, LadoQueUsaMouse: LadoQueUsaMouse, chaveMouse: chaveMouse, sala: sala })

        });
    });

}

mouseEnterCelula();

let funcaoMouseEnter = function functionMouseEnterCelulaCod(cellID, lado, chave) {
    let cell = document.getElementById(cellID)
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

document.body.addEventListener('mousemove', function (e) {


    let alturaDoBody = document.body.offsetHeight;
    let larguraDoBody = document.body.offsetWidth;

    let rectTabuleiro = tabuleiroID.getBoundingClientRect();

    movimentoMouseFuction(chaveMouse, rectTabuleiro, main.offsetTop, main.offsetHeight, e.clientX, e.clientY,
        alturaDoBody, larguraDoBody, LadoQueUsaMouse)

    socket2.emit('mouseMoveDentroDoTabuleiro', {
        chaveMouse: chaveMouse, rectTabuleiro: rectTabuleiro, mainTop: main.offsetTop, mainAltura: main.offsetHeight, clientX: e.clientX, clientY: e.clientY,
        alturaDoBody: alturaDoBody, larguraDoBody: larguraDoBody, LadoQueUsaMouse: LadoQueUsaMouse, sala: sala
    })

});


let funcaoMouse = function movimentoMouseFuctionCod(chaveMouse, rectTabuleiro, mainTop, mainAltura, clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado) {

    isMouseActive = true;

    let cursorMouse = lado == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;

    let larguraDoBody = document.body.offsetWidth;
    let alturaDoBody = document.body.offsetHeight;

    let clientXRelativo = (clientX * larguraDoBody / larguraDoBodyAux);
    let clientYRelativo = (clientY * alturaDoBody / alturaDoBodyAux);
    let mainTopRelativo = (mainTop * alturaDoBody / alturaDoBodyAux);
    let mainAlturaRelativo = (mainAltura * alturaDoBody / alturaDoBodyAux);

    let xPercentage = (clientXRelativo / document.body.offsetWidth) * 100;
    let yPercentageMain = ((clientYRelativo - mainTopRelativo) / mainAlturaRelativo) * 100;

    let isInsideTabuleiro = (
        clientXRelativo >= (rectTabuleiro.left * larguraDoBody / larguraDoBodyAux) &&
        clientXRelativo <= (rectTabuleiro.right * larguraDoBody / larguraDoBodyAux) &&
        clientYRelativo >= (rectTabuleiro.top * alturaDoBody / alturaDoBodyAux) &&
        clientYRelativo <= (rectTabuleiro.bottom * alturaDoBody / alturaDoBodyAux)
    );

    if (isInsideTabuleiro) {

        document.body.style.cursor = 'none';
        cursorMouse.style.left = xPercentage + '%';
        cursorMouse.style.top = yPercentageMain + '%';


        clearTimeout(timeoutId[lado]);
        timeoutId[lado] = setTimeout(function () {

            centerImage(celulaAnterior[lado]);

        }, 400);

    } else {
        document.body.style.cursor = 'pointer';

        centerImage(celulaAtual[lado]);
    }



    if (celulaAtual[lado][chaveMouse].classList.contains('grass-cutter')) {

        centerImage(celulaAnterior[lado]);
        document.body.style.cursor = 'pointer';
    }

}

let funcaoMouseGeral = [];

// Adicionando um clone da função ao array usando bind
funcaoMouseGeral.push(funcaoMouse.bind(null));
funcaoMouseGeral.push(funcaoMouse.bind(null));
funcaoMouseGeral.push(funcaoMouseEnter.bind(null));
funcaoMouseGeral.push(funcaoMouseEnter.bind(null));


function movimentoMouseFuction(chaveMouse, rectTabuleiro, mainTop, mainAltura, clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado) {

    if (lado == 0) {
        funcaoMouseGeral[0](chaveMouse, rectTabuleiro, mainTop, mainAltura, clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado);
    } else {
        funcaoMouseGeral[1](chaveMouse, rectTabuleiro, mainTop, mainAltura, clientX, clientY, alturaDoBodyAux, larguraDoBodyAux, lado);
    }
}

function functionMouseEnterCelula(cellID, lado, chave) {

    if (lado == 0) {
        funcaoMouseGeral[2](cellID, lado, chave);
    } else {
        funcaoMouseGeral[3](cellID, lado, chave);
    }
}

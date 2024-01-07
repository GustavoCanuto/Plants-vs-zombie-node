//Variaveis Iniciais Planta
var cursorTabuleiroAmarelo = document.getElementById('cursorTabuleiroAmarelo');
var seletorTabuleiroAmarelo = document.getElementById('seletorTabuleiroAmarelo');
var celulaAtualPlanta = document.getElementById('cell1Planta');
var celulaAnteriorPlanta = document.getElementById('cell1Planta');

//Variaveis Iniciais Zombie
var cursorTabuleiroAzul = document.getElementById('cursorTabuleiroAzul');
var seletorTabuleiroAzul = document.getElementById('seletorTabuleiroAzul');
var celulaAtualZombie = document.getElementById('cell1Zombie');
var celulaAnteriorZombie = document.getElementById('cell1Zombie');

// geral
var main = document.querySelector('main');
var tabuleiroID = document.getElementById('tabuleiroID');
var cells = document.querySelectorAll('.cell');
var LadoQueUsaMouse = 0;
console.log("Lado que usa o mouse: " + LadoQueUsaMouse);

var cursorTabuleiro  =  [{planta:cursorTabuleiroAmarelo}, {zombie:cursorTabuleiroAzul}]
var seletorTabuleiro =  [{planta:seletorTabuleiroAmarelo},{zombie:seletorTabuleiroAzul}]
var celulaAtual      =  [{planta:celulaAtualPlanta}, {zombie:celulaAtualZombie}]
var celulaAnterior   =  [{planta:celulaAnteriorPlanta}, {zombie:celulaAnteriorZombie}]

// previa Imagem
var divPreviaPersonagem = document.createElement('div');
divPreviaPersonagem.classList = 'previa-personagem';
var imgPreviaPersonagem = document.createElement('img');
imgPreviaPersonagem.src = '../../assets/img/personagens/zombies/cardtombstone.png';
imgPreviaPersonagem.id = "prevPersonagem";
divPreviaPersonagem.appendChild(imgPreviaPersonagem);
celulaAtualZombie.appendChild(divPreviaPersonagem);

//controle
var isMouseActive = false;
var timeoutId;

var centerImage = function (container) {

    const chave = Object.keys(container);
    const valor = container[chave];

    if (!valor.classList.contains('grass-cutter')) {

        var rectContainer = valor.getBoundingClientRect();
        var mainRect = main.getBoundingClientRect(); // Adicione isso para obter as coordenadas do main

        var xPercentage = ((rectContainer.left - mainRect.left + rectContainer.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
        var yPercentage = ((rectContainer.top - mainRect.top) / mainRect.height) * 100;

        if(chave == 'zombie'){
        cursorTabuleiroAzul.style.left = xPercentage + '%';
        cursorTabuleiroAzul.style.top = yPercentage + '%';
        }else if(chave == 'planta'){
        cursorTabuleiroAmarelo.style.left = xPercentage + '%';
        cursorTabuleiroAmarelo.style.top = yPercentage + '%';
        }
    }
};

centerImage(celulaAtual[0]);
centerImage(celulaAtual[1]);

var chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
var cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo: cursorTabuleiroAzul;

function mouseEnterCelula(){

cells.forEach(function (cell) {

    cell.addEventListener('mouseenter', function () {

        celulaAtual[LadoQueUsaMouse][chaveMouse] = cell;
        const celulaAtualMouse = celulaAtual[LadoQueUsaMouse][chaveMouse]

        if (!celulaAtualMouse.classList.contains('grass-cutter')) {

            const prevSeletorTabuleiro = seletorTabuleiro[LadoQueUsaMouse][chaveMouse].cloneNode(true);

            setTimeout(function () {
                cell.appendChild(prevSeletorTabuleiro);
                prevSeletorTabuleiro.style.opacity = '0.3';
           }, 100);

            setTimeout(function () {
                 cell.appendChild(seletorTabuleiro[LadoQueUsaMouse][chaveMouse]);
                 cell.appendChild(divPreviaPersonagem);
                 seletorTabuleiro[LadoQueUsaMouse][chaveMouse].style.opacity = '1';
                 cell.removeChild(prevSeletorTabuleiro);
             }, 150);

            celulaAnterior[LadoQueUsaMouse][chaveMouse] = celulaAtualMouse;
        }

    });
});

}

mouseEnterCelula();

document.body.addEventListener('mousemove', function (e) {

    isMouseActive = true;

    var xPercentage = (e.clientX / window.innerWidth) * 100;
    var yPercentage = (e.clientY / window.innerHeight) * 100;

    var rectTabuleiro = tabuleiroID.getBoundingClientRect();

    var isInsideTabuleiro = (
        e.clientX >= rectTabuleiro.left &&
        e.clientX <= rectTabuleiro.right &&
        e.clientY >= rectTabuleiro.top &&
        e.clientY <= rectTabuleiro.bottom
    );

    if (isInsideTabuleiro) {
        document.body.style.cursor = 'none';

       
    
         cursorTabuleiroMouse.style.left = xPercentage + '%';
         cursorTabuleiroMouse.style.top = yPercentage + '%';
   
   
       clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {

            centerImage(celulaAnterior[LadoQueUsaMouse]);

        }, 400);

    } else {
        document.body.style.cursor = 'pointer';
       centerImage(celulaAnterior[LadoQueUsaMouse]);
    }

    if (celulaAtual[LadoQueUsaMouse][chaveMouse].classList.contains('grass-cutter')) {
        centerImage(celulaAnterior[LadoQueUsaMouse]);
        document.body.style.cursor = 'pointer';
    }
});

// controle pelo mouse
var main = document.querySelector('main');
var cursorTabuleiro = document.getElementById('cursor-tabuleiro');
var seletorTabuleiro = document.getElementById('seletorTabuleiro');
var tabuleiroID = document.getElementById('tabuleiroID');
var cells = document.querySelectorAll('.cell');
var celulaAtual = document.getElementById('cell1');
var celulaAnterior = document.getElementById('cell1');
var isMouseActive = false;
var carrinho = false;

var timeoutId;
let verificador;
let verificador2 = 0;
var contador = 0;


var centerImage = function (container) {

    if (!container.classList.contains('grass-cutter')) {

        var rectContainer = container.getBoundingClientRect();
        var mainRect = main.getBoundingClientRect(); // Adicione isso para obter as coordenadas do main

        var xPercentage = ((rectContainer.left - mainRect.left + rectContainer.width / 2 - cursorTabuleiro.width / 2) / mainRect.width) * 100;
        var yPercentage = ((rectContainer.top - mainRect.top) / mainRect.height) * 100;

        cursorTabuleiro.style.left = xPercentage + '%';
        cursorTabuleiro.style.top = yPercentage + '%';

        carrinho = false;

    }
};

centerImage(celulaAtual);

cells.forEach(function (cell) {
    cell.addEventListener('mouseenter', function () {
        // Mova a div seletorTabuleiro para a célula atual

        celulaAtual = cell;

        if (!celulaAtual.classList.contains('grass-cutter')) {

            verificador = 1;
            const prevseletorTabuleiro = seletorTabuleiro.cloneNode(true);

            setTimeout(function () {
                cell.appendChild(prevseletorTabuleiro);


                prevseletorTabuleiro.style.opacity = '0.3';
            }, 130);

            setTimeout(function () {
                cell.appendChild(seletorTabuleiro);
                verificador = 2;
                seletorTabuleiro.style.opacity = '1';
                cell.removeChild(prevseletorTabuleiro);
            }, 150);

            celulaAnterior = celulaAtual;

        }

    });
});

document.body.addEventListener('mousemove', function (e) {
    isMouseActive = true;


    cursorTabuleiro.style.transition = 'left 0.05s, top 0.05s';

    var xPercentage = (e.clientX / window.innerWidth) * 100;
    var yPercentage = (e.clientY / window.innerHeight) * 100;

   

    var rectTabuleiro = tabuleiroID.getBoundingClientRect();

    var isInsideContent1 = (
        e.clientX >= rectTabuleiro.left &&
        e.clientX <= rectTabuleiro.right &&
        e.clientY >= rectTabuleiro.top &&
        e.clientY <= rectTabuleiro.bottom
    );

    if (isInsideContent1) {
        document.body.style.cursor = 'none';
        cursorTabuleiro.style.left = xPercentage + '%';
        cursorTabuleiro.style.top = yPercentage + '%';

        //alert("oi")
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {

            centerImage(celulaAtual);

        }, 400);

    } else {
        document.body.style.cursor = 'pointer';

        centerImage(celulaAtual);


        // Se o mouse parar por 500 milissegundos, centralize seletorTabuleiro

    }

    if (celulaAtual.classList.contains('grass-cutter')) {
        centerImage(celulaAnterior);
        document.body.style.cursor = 'pointer';
    }



});
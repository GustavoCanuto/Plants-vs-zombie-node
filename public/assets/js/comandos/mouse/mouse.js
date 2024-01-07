// controle pelo mouse
var main = document.querySelector('main');
var cursorTabuleiroAzul = document.getElementById('cursorTabuleiroAzul');
var seletorTabuleiroAzul = document.getElementById('seletorTabuleiroAzul');
var tabuleiroID = document.getElementById('tabuleiroID');
var cells = document.querySelectorAll('.cell');
var celulaAtualZombie = document.getElementById('cell1Zombie');
var celulaAnteriorZombie = document.getElementById('cell1Zombie');
var divPreviaPersonagem = document.createElement('div');
divPreviaPersonagem.classList = 'previa-personagem';
var imgPreviaPersonagem = document.createElement('img');
imgPreviaPersonagem.src = '../../assets/img/personagens/zombies/cardtombstone.png';
imgPreviaPersonagem.id = "prevPersonagem";
var isMouseActive = false;

var timeoutId;


divPreviaPersonagem.appendChild(imgPreviaPersonagem);
celulaAtualZombie.appendChild(divPreviaPersonagem);
   // Atribua o conteúdo criado à célula do tabuleiro

var centerImage = function (container) {

    if (!container.classList.contains('grass-cutter')) {

        var rectContainer = container.getBoundingClientRect();
        var mainRect = main.getBoundingClientRect(); // Adicione isso para obter as coordenadas do main

        var xPercentage = ((rectContainer.left - mainRect.left + rectContainer.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
        var yPercentage = ((rectContainer.top - mainRect.top) / mainRect.height) * 100;

        cursorTabuleiroAzul.style.left = xPercentage + '%';
        cursorTabuleiroAzul.style.top = yPercentage + '%';
    }
};

centerImage(celulaAtualZombie);

cells.forEach(function (cell) {

    cell.addEventListener('mouseenter', function () {
        // Mova a div seletorTabuleiroAzul para a célula atual
        celulaAtualZombie = cell;
       
        if (!celulaAtualZombie.classList.contains('grass-cutter')) {

            const prevseletorTabuleiroAzul = seletorTabuleiroAzul.cloneNode(true);

            setTimeout(function () {
                cell.appendChild(prevseletorTabuleiroAzul);
                prevseletorTabuleiroAzul.style.opacity = '0.3';
           }, 100);

             setTimeout(function () {
                 cell.appendChild(seletorTabuleiroAzul);
                 cell.appendChild(divPreviaPersonagem);
        
                 seletorTabuleiroAzul.style.opacity = '1';
                cell.removeChild(prevseletorTabuleiroAzul);
             }, 150);

            celulaAnteriorZombie = celulaAtualZombie;
        }

    });
});

document.body.addEventListener('mousemove', function (e) {

    isMouseActive = true;

    //cursorTabuleiroAzul.style.transition = 'left 0.05s, top 0.05s';

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
        cursorTabuleiroAzul.style.left = xPercentage + '%';
        cursorTabuleiroAzul.style.top = yPercentage + '%';

       clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {

            centerImage(celulaAtualZombie);

        }, 400);

    } else {
        document.body.style.cursor = 'pointer';
        centerImage(celulaAtualZombie);
    }

    if (celulaAtualZombie.classList.contains('grass-cutter')) {
        centerImage(celulaAnteriorZombie);
        document.body.style.cursor = 'pointer';
    }
});
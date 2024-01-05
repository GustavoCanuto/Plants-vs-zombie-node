import {personagens} from "../../personagens.js";
import {clickCelula} from './clickCelula.js';

var navbarZombie = document.querySelector('.navbar-zombie');
var cellNavBarZombie = document.querySelectorAll('.navbar-zombie .card');
var cellNavBarZombieAtual = document.querySelector('.cardtombstone');
var cursorNavBarZombie = document.getElementById('cursor-navBar-zombie');
var prevPersonagemImg = document.getElementById('prevPersonagem');

cellNavBarZombie.forEach(function (cell) {

    cell.addEventListener('mouseenter', function () {
        // Mova a div seletorTabuleiro para a célula atual
        cellNavBarZombieAtual.classList.remove('seletorNavBar');
        cellNavBarZombieAtual = cell;

    

        if (!cellNavBarZombieAtual.classList.contains('pontuacao-zombie')) {

            const personagemNome = cell.getAttribute('data-personagem');

            if (personagens[personagemNome]) {
          
                // Atualize a imagem do prevPersonagemImg
                prevPersonagemImg.src = personagens[personagemNome].imagePath;

               
            }

            
            cell.classList.add('seletorNavBar');
           
            cell.appendChild(cursorNavBarZombie);

        }

    });
});

document.addEventListener('wheel', function (event) {

    // Verifique a direção do scroll
    var direction = event.deltaY > 0 ? 1 : -1;

    // Encontre o índice da célula atual
    var currentIndex = Array.from(cellNavBarZombie).indexOf(cellNavBarZombieAtual);

    // Calcule o próximo índice com base na direção do scroll
    var nextIndex = currentIndex + direction;

    // Garanta que o próximo índice está dentro dos limites
    nextIndex = Math.max(0, Math.min(cellNavBarZombie.length - 1, nextIndex));

    // Mova a div seletorTabuleiro para a nova célula
    cellNavBarZombieAtual.classList.remove('seletorNavBar');
    cellNavBarZombieAtual = cellNavBarZombie[nextIndex];

    const personagemNome = cellNavBarZombieAtual.getAttribute('data-personagem');

    if (personagens[personagemNome]) {
        // Atualize a imagem do prevPersonagemImg
        prevPersonagemImg.src = personagens[personagemNome].imagePath;
    }

    cellNavBarZombieAtual.classList.add('seletorNavBar');
    cellNavBarZombieAtual.appendChild(cursorNavBarZombie);
});


clickCelula();
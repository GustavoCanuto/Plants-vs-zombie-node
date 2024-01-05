import {Personagens, personagens} from "../../personagens.js";

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
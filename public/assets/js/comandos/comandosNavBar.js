import {personagens} from "../personagens.js";

export var cellNavBarZombie = document.querySelectorAll('.navbar-zombie .card');
export var cellNavBarZombieAtual = document.querySelector('.cardtombstone');
export var cursorNavBarZombie = document.getElementById('cursor-navBar-zombie');
export var prevPersonagemImg = document.getElementById('prevPersonagem');

export function moveNavBar(direction){

    var currentIndex = Array.from(cellNavBarZombie).indexOf(cellNavBarZombieAtual);

    // Calcule o próximo índice com base na direção do scroll
    var nextIndex = currentIndex + direction;

    // Garanta que o próximo índice está dentro dos limites
    nextIndex = Math.max(0, Math.min(cellNavBarZombie.length - 1, nextIndex));

    // Mova a div seletorTabuleiroAzul para a nova célula
    cellNavBarZombieAtual.classList.remove('seletorNavBarAzul');
    cellNavBarZombieAtual = cellNavBarZombie[nextIndex];

    const personagemNome = cellNavBarZombieAtual.getAttribute('data-personagem');

    if (personagens[personagemNome]) {
        // Atualize a imagem do prevPersonagemImg
        prevPersonagemImg.src = personagens[personagemNome].imagePath;
    }

    cellNavBarZombieAtual.classList.add('seletorNavBarAzul');
    cellNavBarZombieAtual.appendChild(cursorNavBarZombie);

}

export function dropPersonagem(cell, imgPreviaPersonagem){
    if (!cell.classList.contains('ocupado')) {

        const elemento = document.createElement('div');
        elemento.classList.add("personagem");
        var imgPersonagem = document.createElement('img');
        imgPersonagem.src = imgPreviaPersonagem.src;
        elemento.appendChild(imgPersonagem);
        cell.appendChild(elemento);
        elemento.closest('.cell').classList.add("ocupado");

    }
}

export function criarPreviaPersonagem(cell){

    // Mova a div seletorTabuleiroAzul para a célula atual
    cellNavBarZombieAtual.classList.remove('seletorNavBarAzul');
    cellNavBarZombieAtual = cell;

    if (!cellNavBarZombieAtual.classList.contains('pontuacao-zombie')) {

        const personagemNome = cell.getAttribute('data-personagem');

        if (personagens[personagemNome]) {
            // Atualize a imagem do prevPersonagemImg
            prevPersonagemImg.src = personagens[personagemNome].imagePath;
        }
        
        cell.classList.add('seletorNavBarAzul'); 
        cell.appendChild(cursorNavBarZombie);

    }
}
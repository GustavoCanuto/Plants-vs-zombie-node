import {personagens} from "../personagens.js";

//navBar Planta
export var cellNavBarPlanta = document.querySelectorAll('.navbar-planta .card');
export var cellNavBarPlantaAtual = document.querySelector('.sunflower');
export var cursorNavBarPlanta = document.getElementById('cursor-navBar-planta');


//navBar zombie
export var cellNavBarZombie = document.querySelectorAll('.navbar-zombie .card');
export var cellNavBarZombieAtual = document.querySelector('.cardtombstone');
export var cursorNavBarZombie = document.getElementById('cursor-navBar-zombie');


//geral
export var cellNavBar        = [cellNavBarPlanta,cellNavBarZombie]
export var cellNavBarAtual   = [cellNavBarPlantaAtual, cellNavBarZombieAtual]
export var cursorNavBar      = [cursorNavBarPlanta, cursorNavBarZombie]
export var prevPersonagemImg = document.getElementById('prevPersonagem');


export function moveNavBar(direction, lado){

    var currentIndex = Array.from(cellNavBar[lado]).indexOf(cellNavBarAtual[lado]);

    // Calcule o próximo índice com base na direção do scroll
    var nextIndex = currentIndex + direction;

    // Garanta que o próximo índice está dentro dos limites
    nextIndex = Math.max(0, Math.min(cellNavBar[lado].length - 1, nextIndex));

    // Mova a div seletorTabuleiropara a nova célula
    const classeNavBar =  lado == 0 ? 'seletorNavBarAmarelo' : 'seletorNavBarAzul'

    cellNavBarAtual[lado].classList.remove(`${classeNavBar}`);
    cellNavBarAtual[lado] = cellNavBar[lado][nextIndex];
 
    const personagemNome = cellNavBarAtual[lado].getAttribute('data-personagem');

    if (personagens[personagemNome]) {
        // Atualize a imagem do prevPersonagemImg
        prevPersonagemImg.src = personagens[personagemNome].imagePath;
    }

    cellNavBarAtual[lado].classList.add(`${classeNavBar}`);
    cellNavBarAtual[lado].appendChild(cursorNavBar[lado]);

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

export function criarPreviaPersonagem(cell, lado){

    const classeNavBar =  lado == 0 ? 'seletorNavBarAmarelo' : 'seletorNavBarAzul'
    const divNavBar = lado == 0 ? 'pontuacao-planta' : 'pontuacao-zombie'
    // Mova a div seletorTabuleiroAzul para a célula atual
    cellNavBarAtual[lado].classList.remove(`${classeNavBar}`);
    cellNavBarAtual[lado] = cell;

    if (!cellNavBarAtual[lado].classList.contains(`${divNavBar}`)) {

        const personagemNome = cell.getAttribute('data-personagem');

        if (personagens[personagemNome]) {
            // Atualize a imagem do prevPersonagemImg
            prevPersonagemImg.src = personagens[personagemNome].imagePath;
        }
        
        cell.classList.add(`${classeNavBar}`); 
        cell.appendChild(cursorNavBar[lado]);

    }
}
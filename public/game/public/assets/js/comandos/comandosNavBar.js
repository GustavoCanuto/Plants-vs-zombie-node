import {personagens} from "../personagens.js";
import AnimacaoCartas from '../animacoes/animacaoCartas.js';

//navBar Planta
export let cellNavBarPlanta = document.querySelectorAll('.navbar-planta .card');
export let cellNavBarPlantaAtual = document.querySelector('.sunflower');
export let cursorNavBarPlanta = document.getElementById('cursor-navBar-planta');
export let prevPersonagemImgPlanta = document.getElementById('prevPersonagemPlanta');


//navBar zombie
export let cellNavBarZombie = document.querySelectorAll('.navbar-zombie .card');
export let cellNavBarZombieAtual = document.querySelector('.cardtombstone');
export let cursorNavBarZombie = document.getElementById('cursor-navBar-zombie');
export let prevPersonagemImgZombie = document.getElementById('prevPersonagemZombie');


//geral
export let cellNavBar        = [cellNavBarPlanta,cellNavBarZombie]
export let cellNavBarAtual   = [cellNavBarPlantaAtual, cellNavBarZombieAtual]
export let cursorNavBar      = [cursorNavBarPlanta, cursorNavBarZombie]
export let prevPersonagemImg = [prevPersonagemImgPlanta, prevPersonagemImgZombie]

export function moveNavBar(direction, lado){

    let currentIndex = Array.from(cellNavBar[lado]).indexOf(cellNavBarAtual[lado]);

    // Calcule o próximo índice com base na direção do scroll
    let nextIndex = currentIndex + direction;

    // Garanta que o próximo índice está dentro dos limites
    nextIndex = Math.max(0, Math.min(cellNavBar[lado].length - 1, nextIndex));

    // Mova a div seletorTabuleiropara a nova célula
    const classeNavBar =  lado == 0 ? 'seletorNavBarAmarelo' : 'seletorNavBarAzul'

    cellNavBarAtual[lado].classList.remove(`${classeNavBar}`);
    cellNavBarAtual[lado] = cellNavBar[lado][nextIndex];
 
    const personagemNome = cellNavBarAtual[lado].getAttribute('data-personagem');

    if (personagens[personagemNome]) {
        // Atualize a imagem do prevPersonagemImg
        prevPersonagemImg[lado].className = '';
        prevPersonagemImg[lado].src = personagens[personagemNome].imagePath;
        prevPersonagemImg[lado].classList.add(`tamanhoPrevia-${personagens[personagemNome].nomePersonagem}`)
      
    }

    cellNavBarAtual[lado].classList.add(`${classeNavBar}`);
    cellNavBarAtual[lado].appendChild(cursorNavBar[lado]);

}

export function dropPersonagem(cellID, imgPreviaPersonagem){

    let cell = document.getElementById(cellID)
  

    if (!cell.classList.contains('ocupado')) {

        AnimacaoCartas.criarAnimacaoCarta(cell , imgPreviaPersonagem);

    }
}

export function criarPreviaPersonagem(cellID, lado){

   let cell = document.getElementById(cellID)
    const classeNavBar =  lado == 0 ? 'seletorNavBarAmarelo' : 'seletorNavBarAzul'
    const divNavBar = lado == 0 ? 'pontuacao-planta' : 'pontuacao-zombie'
    // Mova a div seletorTabuleiroAzul para a célula atual
    cellNavBarAtual[lado].classList.remove(`${classeNavBar}`);
    cellNavBarAtual[lado] = cell;

    if (!cellNavBarAtual[lado].classList.contains(`${divNavBar}`)) {

        const personagemNome = cell.getAttribute('data-personagem');

        if (personagens[personagemNome]) {
         
            prevPersonagemImg[lado].className = '';
           prevPersonagemImg[lado].src = personagens[personagemNome].imagePath;
         
           prevPersonagemImg[lado].classList.add(`tamanhoPrevia-${personagens[personagemNome].nomePersonagem}`)
   
    
        }
        
        cell.classList.add(`${classeNavBar}`); 
        cell.appendChild(cursorNavBar[lado]);

    }
}
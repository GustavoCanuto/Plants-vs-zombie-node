import * as comandosNavBar from '../comandosNavBar.js';
import {comandoPersonalizado} from './tecladoPersonalizado.js';

document.addEventListener('keydown', function (e) {

    var key = e.key.toLowerCase();

    if (!teclaPersonalizada){
    moveContent(key);
    moveCards(key);
    }else{
        comandoPersonalizado(key);
    }

});

var rowIndex = 1;
var cellIndex = 1;
var moveTimeout;


export function moveCards(key){

    switch (key) {
        case '2':
            comandosNavBar.moveNavBar(1);
            break;
        case '1':
            comandosNavBar.moveNavBar(-1);
            break;
        case ' ':
            const celulaAtualZombie = document.getElementById('seletorTabuleiroAzul');
            comandosNavBar.dropPersonagem(celulaAtualZombie.closest('.cell'),imgPreviaPersonagem);
            break;
    }

}

export function moveContent(direction) {

    rowIndex = celulaAtualZombie.parentElement.classList[1].replace('linha', '');
    cellIndex = Array.from(celulaAtualZombie.parentElement.children).indexOf(celulaAtualZombie);

    switch (direction) {
        case 'arrowup':
            rowIndex = Math.max(1, parseInt(rowIndex) - 1);
            break;
        case 'arrowdown':
            rowIndex = Math.min(5, parseInt(rowIndex) + 1);

            break;
        case 'arrowleft':
            cellIndex = Math.max(1, cellIndex - 1);

            break;
        case 'arrowright':
            cellIndex = Math.min(9, cellIndex + 1);

            break;
        case 'arrowupleft':
            rowIndex = Math.max(1, parseInt(rowIndex) - 1);
            cellIndex = Math.max(1, cellIndex - 1);
            break;
        case 'arrowupright':
            rowIndex = Math.max(1, parseInt(rowIndex) - 1);
            cellIndex = Math.min(9, cellIndex + 1);
            break;
        case 'arrowdownleft':
            rowIndex = Math.min(5, parseInt(rowIndex) + 1);
            cellIndex = Math.max(1, cellIndex - 1);
            break;
        case 'arrowdownright':
            rowIndex = Math.min(5, parseInt(rowIndex) + 1);
            cellIndex = Math.min(9, cellIndex + 1);
            break;

    }

    var targetRow = document.querySelector('.linha' + rowIndex);
    var targetCell = targetRow.children[cellIndex];

    if (!targetCell.classList.contains('grass-cutter')) {

        celulaAnteriorZombie = celulaAtualZombie;
        celulaAtualZombie = targetCell;
  
        clearTimeout(moveTimeout);

        moveTimeout = setTimeout(function () {

            centerImage(celulaAtualZombie);
            targetCell.appendChild(seletorTabuleiroAzul);
            targetCell.appendChild(divPreviaPersonagem);

        }, 30);

    }

}





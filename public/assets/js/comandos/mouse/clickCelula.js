import {dropPersonagem} from '../comandosNavBar.js';

export function clickCelula(){

cells.forEach(function(cell) {

    if (!cell.classList.contains('grass-cutter')) {

    cell.addEventListener('click', function () {
        
        dropPersonagem(cell, imgPreviaPersonagem);
    }
    );
    }
});
}
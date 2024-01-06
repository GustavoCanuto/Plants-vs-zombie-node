import {clickCelula} from './clickCelula.js';
import * as comandosNavBar from '../comandosNavBar.js';

comandosNavBar.cellNavBarZombie.forEach(function (cell) {

    cell.addEventListener('mouseenter', function () {
      
        comandosNavBar.criarPreviaPersonagem(cell)

    });
});

document.addEventListener('wheel', function (event) {

    // Verifique a direção do scroll
    var direction = event.deltaY > 0 ? -1 : 1;
    comandosNavBar.moveNavBar(direction);

});

clickCelula();


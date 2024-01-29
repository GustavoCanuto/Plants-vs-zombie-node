import { clickCelula } from './clickCelula.js';
import * as comandosNavBar from '../comandosNavBar.js';

let ladoAnterior = 1;
let funcoesEnter = [];

export function navBarEnter() {

    // Remover os ouvintes de eventos mouseenter
   let contador =0;
   
    comandosNavBar.cellNavBar[ladoAnterior].forEach(function (cell) {
        let styleResize = cell.closest('.style-resize');
        styleResize.classList.remove('mouse-enter');
      
        cell.removeEventListener('mouseenter', funcoesEnter[contador] //socket aqui tbm
        );

        contador++;
    });

    funcoesEnter = []; // Limpar o array de funções

    comandosNavBar.cellNavBar[LadoQueUsaMouse].forEach(function (cell) {
        let styleResize = cell.closest('.style-resize');
        styleResize.classList.add('mouse-enter');

        function handle() {
            comandosNavBar.criarPreviaPersonagem(cell.id, LadoQueUsaMouse)
           
           socket2.emit('navBarEnter', { cellID: cell.id, LadoQueUsaMouse: LadoQueUsaMouse, sala: sala});
        } 
        // Adicionar novo ouvinte de evento mouseenter
        funcoesEnter.push(handle);

        cell.addEventListener('mouseenter', handle)

    });

    ladoAnterior = LadoQueUsaMouse;
}

navBarEnter();


document.addEventListener('wheel', function (event) {

    // Verifique a direção do scroll
    let direction = event.deltaY > 0 ? -1 : 1;
    comandosNavBar.moveNavBar(direction, LadoQueUsaMouse);
    socket2.emit('wheelNavBar', { direction: direction, LadoQueUsaMouse: LadoQueUsaMouse, sala: sala});


});


clickCelula();


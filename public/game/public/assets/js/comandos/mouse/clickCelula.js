import {dropPersonagem} from '../comandosNavBar.js';

export function clickCelula(){

cells.forEach(function(cell) {

    if (!cell.classList.contains('grass-cutter')) {

    cell.addEventListener('click', function () {
        console.log(LadoQueUsaMouse)
        dropPersonagem(cell.id, imgPreviaPersonagem[LadoQueUsaMouse].src);
        socket2.emit("dropPersonagem", {cellID:cell.id, imgPreviaPersonagem:imgPreviaPersonagem[LadoQueUsaMouse].src, sala: sala} );
    }
    );
    }
});
}
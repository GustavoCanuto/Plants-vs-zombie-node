import {dropPersonagem} from '../comandosNavBar.js';

export function clickCelula(){


    tabuleiroID.addEventListener('click', function () {
        // console.log(LadoQueUsaMouse)
        let chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
        let cellID = celulaAtual[LadoQueUsaMouse][chaveMouse].closest('.cell').id;
        dropPersonagem(cellID, imgPreviaPersonagem[LadoQueUsaMouse].src);
       // socket2.emit("dropPersonagem", {cellID:cellID, imgPreviaPersonagem:imgPreviaPersonagem[LadoQueUsaMouse].src, sala: sala} );
    });

}
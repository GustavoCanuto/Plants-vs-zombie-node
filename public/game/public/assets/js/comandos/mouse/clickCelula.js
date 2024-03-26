import { dropPersonagem } from '../comandosNavBar.js';

export function clickCelula() {


    tabuleiroID.addEventListener('click', function () {

        let chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
        let cellID = celulaAtual[LadoQueUsaMouse][chaveMouse].closest('.cell').id;
        dropPersonagem(cellID, imgPreviaPersonagem[LadoQueUsaMouse].src);

    });

}
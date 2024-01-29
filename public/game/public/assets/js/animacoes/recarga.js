import { pontuacaoLado, pontosLado } from "../pontuacao.js";
import * as comandosNavBar from '../comandos/comandosNavBar.js';
import { personagens } from "../personagens.js";

export function recargaCard(lado, personagemNome, listaCard) {

    pontuacaoLado[lado] -= personagemNome.valorCard;
    pontosLado[lado].textContent = pontuacaoLado[lado];
    personagemNome.recarregado = false;
    let celulaAnimacao = comandosNavBar.cellNavBarAtual[lado].querySelector('.cardIMG');;
    celulaAnimacao.classList.add('recarregando')


    personagemNome.recarregado = false;

    let porcentagemRecarregado = 100;
    celulaAnimacao.style.setProperty('--before-width', `${porcentagemRecarregado}%`);

    const workerRecarregando = new Worker('/game/public//assets/js/workers/recarregandoThread.js');

    listaCard.forEach(cardNome => {
        const cardNomeImg = cardNome.querySelector('.cardIMG');

        if (personagens[cardNome.getAttribute('data-personagem')].valorCard <= pontuacaoLado[lado]) {


            cardNomeImg.classList.remove('semSaldo')
        } else {


            cardNomeImg.classList.add('semSaldo')
        }
    });

    //  let setIntervalRecarga = setInterval(function () {
    workerRecarregando.postMessage({
        comando: "startRecarga",
        tempoRecarga: personagemNome.tempoRecarga / 100,
        lado: lado
    });

    workerRecarregando.addEventListener('message', function (e) {

        if (e.data.comando === 'recargarProcessada' && e.data.lado == lado) {

            porcentagemRecarregado -= 1;
            celulaAnimacao.style.setProperty('--before-width', `${porcentagemRecarregado}%`);

            if (porcentagemRecarregado == 0) {
                workerRecarregando.postMessage({ comando: "stopRecarga", lado: lado });
                workerRecarregando.terminate();
            }
        }
    });

    setTimeout(function () {
        personagemNome.recarregado = true;
        celulaAnimacao.classList.remove('recarregando')
    }, personagemNome.tempoRecarga);



}
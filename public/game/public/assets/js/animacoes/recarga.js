import { pontuacaoLado, pontosLado } from "../pontuacao.js";
import * as comandosNavBar from '../comandos/comandosNavBar.js';
import { personagens} from "../personagens.js";

export function recargaCard(lado,personagemNome){

    pontuacaoLado[lado] -= personagemNome.valorCard;
    pontosLado[lado].textContent = pontuacaoLado[lado];
    personagemNome.recarregado = false;

    comandosNavBar.cellNavBarAtual[lado].classList.add('recarregando')
    var celulaAnimacao = comandosNavBar.cellNavBarAtual[lado];
    personagemNome.recarregado = false;

   let porcentagemRecarregado = 100;

   const workerRecarregando = new Worker('/game/public//assets/js/workers/recarregandoThread.js');

  //  let setIntervalRecarga = setInterval(function () {
    workerRecarregando.postMessage({comando: "startRecarga",
    tempoRecarga:personagemNome.tempoRecarga / 100,
    lado: lado });

     workerRecarregando.addEventListener('message', function (e) {

        if (e.data.comando === 'recargarProcessada' && e.data.lado == lado) {

        porcentagemRecarregado -= 1;
        celulaAnimacao.style.setProperty('--before-width', `${porcentagemRecarregado}%`);

        if (porcentagemRecarregado == 0) {
            workerRecarregando.postMessage({comando: "stopRecarga", lado: lado});
            workerRecarregando.terminate();
            //clearInterval(setIntervalRecarga)
        }
    }
    });

    setTimeout(function () {
        personagemNome.recarregado = true;
        celulaAnimacao.classList.remove('recarregando')
    }, personagemNome.tempoRecarga);


    let listaCard = document.querySelectorAll('.navbar-zombie .card');
    listaCard.forEach(cardNome => {

        if (personagens[cardNome.getAttribute('data-personagem')].valorCard <= pontuacaoLado[lado]) {

            cardNome.classList.remove('semSaldo')
        } else {

            cardNome.classList.add('semSaldo')
        }
    });
}
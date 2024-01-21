import { verificaColisao,removerPlanta } from "./conflitoZombie.js";
import { iniciarAnimacao } from "./framesAnimacao.js";

export function criarAnimacaoZombie(cellElement,gifElement, elemento,tabuleiro,frames, tipoZombie) {

    let setIntervalZombie;

    const posicaoLeft = (cellElement.offsetLeft / tabuleiro.offsetWidth) * 100;

    elemento.style.position = 'absolute';

    let posicaoBottom = ((tabuleiro.offsetHeight - (cellElement.offsetTop + cellElement.offsetHeight)) / tabuleiro.offsetHeight) * 100;

    elemento.style.bottom = `${posicaoBottom}%`;
    elemento.style.left = `${posicaoLeft}%`;

    let positionLeft = posicaoLeft;

    function moveElement() {
       
        const plantElements = document.querySelectorAll('.personagemPlanta');
        let colidiu = false;

        plantElements.forEach((plantaElemento) => {
            if (verificaColisao(elemento, plantaElemento.closest('.cell'))) {
                clearInterval(intervaloMovimentoZumbi);
                iniciarAnimacaoComerPlanta(gifElement,setIntervalZombie);

                setTimeout(() => {
                    removerPlanta(plantaElemento);
                    // Reiniciar o movimento do zumbi e a animação de andar
                    intervaloMovimentoZumbi = setInterval(moveElement, 100);
                    setIntervalZombie=  iniciarAnimacao(frames, gifElement);
                    
                }, 5000);

                colidiu = true;
                console.log('colidiu');

                let tempoRestante = 3;

                const continuarMovendo = setInterval(() => {
                    if (tempoRestante > 0) {
                        elemento.style.left = `${positionLeft}%`;
                        positionLeft -= 0.5; // andar um pouco após a colisão
                        tempoRestante -= 1;
                    } else {
                        clearInterval(continuarMovendo);
                    }
                }, 100);
            }
        });

        if (!colidiu) {
            if (positionLeft > -10) {
                elemento.style.left = `${positionLeft}%`; // Continuar movendo o zumbi para a esquerda se não houve colisão
                positionLeft -= tipoZombie.velocidadeCaminhar;
            } else {
                clearInterval(intervaloMovimentoZumbi);
                console.log('Zumbi atingiu a borda esquerda.');
            }
        }
    }

     setIntervalZombie = iniciarAnimacao(frames, gifElement);

    let intervaloMovimentoZumbi = setInterval(() => {
        moveElement();
      }, 100);

   

}


function iniciarAnimacaoComerPlanta(gifElement,setIntervalZombie) {
    console.log('comendo...');
    clearInterval(setIntervalZombie)
    gifElement.style.width = '100%'
    gifElement.src = './assets/img/frames/buckethead/atacando/attack.gif';
}
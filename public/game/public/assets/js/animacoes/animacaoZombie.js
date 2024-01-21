import { verificaColisao, removerPlanta, removerZombie } from "./conflitoZombie.js";
import { iniciarAnimacao } from "./framesAnimacao.js";
import { AnimacaoCartas } from "./animacaoCartas.js";

export function criarAnimacaoZombie(cellElement, gifElement, elemento, tabuleiro, frames, tipoZombie ) {

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
                let morreu;
                let morreuContraAtaque;
                //ao acontecer conflito com a planta
                clearInterval(intervaloMovimentoZumbi);

               
                const plantaSendoAtacada = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == plantaElemento.id);

                console.log(plantaSendoAtacada.idNovoPersonagem.id)

                // pararAnimacao(plantaElemento.id)
                let atacando = setInterval(() => {

                    morreu = plantaSendoAtacada.idNovoPersonagem.reduzirVida(tipoZombie.ataque)

                    const zombieQueEstaAtacando = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == elemento.id);
                    console.log(zombieQueEstaAtacando.idNovoPersonagem.id)

                    morreuContraAtaque = zombieQueEstaAtacando.idNovoPersonagem.reduzirVida(plantaSendoAtacada.idNovoPersonagem.ataque);

                    if (morreuContraAtaque) {
                        removerZombie(elemento);  
                    }

                    if(!morreuContraAtaque) iniciarAnimacaoComerPlanta(gifElement, setIntervalZombie);

                    if (morreu) {

                        clearInterval(atacando);
                        removerPlanta(plantaElemento, plantaElemento.id, plantaSendoAtacada);
                        // remover da lista personagensJogando
                        intervaloMovimentoZumbi = setInterval(moveElement, 100);
                        setIntervalZombie = iniciarAnimacao(frames, gifElement);
                    }

                  

                }, 1000);

                colidiu = true;

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
                alert('Zumbi Venceu!!');
                location.reload();
            }
        }
    }

    setIntervalZombie = iniciarAnimacao(frames, gifElement);

    let intervaloMovimentoZumbi = setInterval(() => {
        moveElement();
    }, 100);

}

function iniciarAnimacaoComerPlanta(gifElement, setIntervalZombie) {
    const zumbiElements = document.querySelectorAll('.personagemZombie');
    
    zumbiElements.forEach(zumbiElement => {
        if (zumbiElement.classList.contains('tamanho-conehead')) {
            gifElement.src = './assets/img/frames/conehead/atacando/HeadAttack1.gif';
        } else if (zumbiElement.classList.contains('tamanho-buckethead')) {
            gifElement.src = './assets/img/frames/buckethead/atacando/attack.gif';
        } else if(zumbiElement.classList.contains('tamanho-flagzombie')) {
            gifElement.src = './assets/img/frames/flagzombie/atacando/ZombieAttack.gif';
        } else if(zumbiElement.classList.contains('tamanho-football')) {
            gifElement.src = './assets/img/frames/football/atacando/Attack.gif';
        } else if(zumbiElement.classList.contains('tamanho-screendoor')) {
            gifElement.src = './assets/img/frames/screendoor/atacando/ScreenDoorZombieAttack.gif';
        } else if(zumbiElement.classList.contains('tamanho-zombie')) {
            gifElement.src = './assets/img/frames/zombie/atacando/ZombieAttack(1).gif';
        }
        
    });

    clearInterval(setIntervalZombie);
    gifElement.style.width = '100%';
}

import { verificaColisao, removerPlanta, removerZombie } from "./conflitoZombie.js";
import { iniciarAnimacao } from "./framesAnimacao.js";
import { AnimacaoCartas } from "./animacaoCartas.js";

let listaIntervalZombie = [];

export function criarAnimacaoZombie(cellElement, gifElement, elemento, tabuleiro, frames, tipoZombie, idNovoPersonagem) {

    let setIntervalAtacando;
    let setIntervalZombie;

    const posicaoLeft = (cellElement.offsetLeft / tabuleiro.offsetWidth) * 100;

    elemento.style.position = 'absolute';

    let posicaoBottom = ((tabuleiro.offsetHeight - (cellElement.offsetTop + cellElement.offsetHeight)) / tabuleiro.offsetHeight) * 100;

    elemento.style.bottom = `${posicaoBottom}%`;
    elemento.style.left = `${posicaoLeft}%`;

    let verificaFilho;

    let positionLeft = posicaoLeft;

    function moveElement() {

        verificaFilho = document.getElementById(idNovoPersonagem)
                   
        if(!verificaFilho) {
            clearInterval(intervaloMovimentoZumbi);
            clearInterval(setIntervalAtacando);
        }

        const plantElements = document.querySelectorAll('.personagemPlanta');
        let colidiu = false;

        plantElements.forEach((plantaElemento) => {

            if (verificaColisao(elemento, plantaElemento.closest('.cell'))) {
                let classeLinha = plantaElemento.closest('.cell').closest(".row").className.split(' ');
                let linhaAtiva = classeLinha[1];
                let numeroLinha = linhaAtiva.charAt(linhaAtiva.length - 1);

                let morreu;
                let morreuContraAtaque;
                //ao acontecer conflito com a planta
                clearInterval(intervaloMovimentoZumbi);


                const plantaSendoAtacada = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == plantaElemento.id);

                // console.log(plantaSendoAtacada.idNovoPersonagem.id)

                // pararAnimacao(plantaElemento.id)
                let atacando = setInterval(() => {

                    setIntervalAtacando = atacando;


                    //atualizar a lista
                    const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

                    if (intervalObj) {
                        intervalObj.setIntervalAtacando = setIntervalAtacando;

                    } else {
                        // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
                    }


                    morreu = plantaSendoAtacada.idNovoPersonagem.reduzirVida(tipoZombie.ataque)

                    const zombieQueEstaAtacando = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == elemento.id);
                    // console.log(zombieQueEstaAtacando.idNovoPersonagem.id)

                    morreuContraAtaque = zombieQueEstaAtacando.idNovoPersonagem.reduzirVida(plantaSendoAtacada.idNovoPersonagem.ataque);

                    if (!morreuContraAtaque) iniciarAnimacaoComerPlanta(gifElement, setIntervalZombie, idNovoPersonagem);

                    //matou a planta
                    if (morreu) {

                        clearInterval(atacando);
                        clearInterval(setIntervalAtacando);
                        
                        removerPlanta(plantaElemento, plantaElemento.id, plantaSendoAtacada);
                        // remover da lista personagensJogando

                        intervaloMovimentoZumbi = setInterval(moveElement, 100);
                        setIntervalZombie = iniciarAnimacao(frames, gifElement, idNovoPersonagem);


                        //atualizar a lista
                        const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

                        if (intervalObj) {
                            intervalObj.intervalId = intervaloMovimentoZumbi;

                        } else {
                            // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
                        }
                    }



                    colidiu = true;

                    if (morreuContraAtaque) {
                        clearInterval(atacando);
                        clearInterval(intervaloMovimentoZumbi);
                        clearInterval(setIntervalAtacando);
                        colidiu = false;
                        if (plantaSendoAtacada.idNovoPersonagem.nomePersonagem == 'cherrybomb') {
                            setTimeout(() => {
                                // console.log("zumbi morreu por contraAtaque")
                                pararAnimacaoZombie(elemento.id)
                                removerZombie(elemento, numeroLinha);
                            }, 600);
                        } else {
                            // console.log("zumbi morreu por contraAtaque")
                            pararAnimacaoZombie(elemento.id)
                            removerZombie(elemento, numeroLinha);
                        }

                    }

                }, 1000);



                let tempoRestante = 3;

                const continuarMovendo = setInterval(() => {
                    if (tempoRestante > 0) {
                        elemento.style.left = `${positionLeft}%`;
                        positionLeft -= 0.8; // andar um pouco após a colisão
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

    setIntervalZombie = iniciarAnimacao(frames, gifElement, idNovoPersonagem);

    let intervaloMovimentoZumbi = setInterval(() => {
        moveElement();
    }, 100);



    listaIntervalZombie.push({
        idNovoPersonagem: idNovoPersonagem, intervalId: intervaloMovimentoZumbi,
        setIntervalAtacando: setIntervalAtacando
    });

}

function iniciarAnimacaoComerPlanta(gifElement, setIntervalZombie, idNovoPersonagem) {
  //  const zumbiElements = document.querySelectorAll('.personagemZombie');

 //   zumbiElements.forEach(zumbiElement => {


      const zumbiElement = document.getElementById(idNovoPersonagem)

        if (zumbiElement.classList.contains('tamanho-conehead')) {
            gifElement.src = './assets/img/frames/conehead/atacando/HeadAttack1.gif';
            gifElement.style.width = '115%';
        } else if (zumbiElement.classList.contains('tamanho-buckethead')) {
            gifElement.src = './assets/img/frames/buckethead/atacando/attack.gif';
        } else if (zumbiElement.classList.contains('tamanho-flagzombie')) {
            gifElement.src = './assets/img/frames/flagzombie/atacando/ZombieAttack.gif';
        } else if (zumbiElement.classList.contains('tamanho-football')) {
            gifElement.src = './assets/img/frames/football/atacando/Attack.gif';
            gifElement.style.width = '95%';
        } else if (zumbiElement.classList.contains('tamanho-screendoor')) {
            gifElement.src = './assets/img/frames/screendoor/atacando/ScreenDoorZombieAttack.gif';
            gifElement.style.width = '85%';
        } else if (zumbiElement.classList.contains('tamanho-zombie')) {
            gifElement.src = './assets/img/frames/zombie/atacando/ZombieAttack(1).gif';
        }

  //  });

    clearInterval(setIntervalZombie);

}

export function pararAnimacaoZombie(idNovoPersonagem) {

    // console.log("para animacao zumbi")

    const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

    if (intervalObj) {
        clearInterval(intervalObj.setIntervalAtacando);
        clearInterval(intervalObj.intervalId);
        listaIntervalZombie = listaIntervalZombie.filter(item => item.idNovoPersonagem != idNovoPersonagem);
    } else {
        // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
    }
}
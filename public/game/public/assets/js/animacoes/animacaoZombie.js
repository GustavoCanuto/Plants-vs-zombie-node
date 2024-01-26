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

        if (!verificaFilho) {
            //  console.log("nao existe zombie")
            //  clearInterval(intervaloMovimentoZumbi);
            intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
            intervaloMovimentoZumbi.terminate();
            clearInterval(setIntervalAtacando);
            return;
        }

        const plantElements = document.querySelectorAll('.personagemPlanta');
        let colidiu = false;

        plantElements.forEach((plantaElemento) => {


            if (verificaColisao(elemento, plantaElemento.closest('.cell'))) {
                //   console.log(tipoZombie.nomePersonagem + "  conflitou")
                colidiu = true;
                let classeLinha = plantaElemento.closest('.cell').closest(".row").className.split(' ');
                let linhaAtiva = classeLinha[1];
                let numeroLinha = linhaAtiva.charAt(linhaAtiva.length - 1);

                let morreu;
                let morreuContraAtaque;
                //ao acontecer conflito com a planta
                // clearInterval(intervaloMovimentoZumbi);
                intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
                intervaloMovimentoZumbi.terminate();

                const plantaSendoAtacada = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == plantaElemento.id);

                // console.log(plantaSendoAtacada.idNovoPersonagem.id)

                // dar e recebe dano a cada 1s
                let atacando = setInterval(() => {

                    //  console.log(tipoZombie.nomePersonagem + " está atacando")

                    let plantaAtacadaId = document.getElementById(plantaElemento.id)
                    // console.log("o id da planta é "+ plantaAtacadaId.id)
                    if (!plantaAtacadaId) {
                        //  console.log(tipoZombie.nomePersonagem + " nao pode mais atacar pq alguem ja matou ela")
                        clearInterval(setIntervalAtacando);
                        clearInterval(atacando);
                        //  intervaloMovimentoZumbi = setInterval(moveElement, 100);
                        const workerZombieAndando = new Worker('/game/public/assets/js/workers/zombieAndandoThread.js');
                        workerZombieAndando.postMessage({ comando: "startZombieAndando" })
                        intervaloMovimentoZumbi = workerZombieAndando;
                        intervaloMovimentoZumbi.addEventListener('message', function (e) {
                            if (e.data.comando === 'zombieAndandoProcessado') {
                                moveElement();
                            }
                        });

                        setIntervalZombie = iniciarAnimacao(frames, gifElement, idNovoPersonagem);
                        return;

                    }

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

                        //  console.log(tipoZombie.nomePersonagem + " matou a planta que estava atacando")
                        clearInterval(setIntervalAtacando);
                        clearInterval(atacando);

                        removerPlanta(plantaElemento, plantaElemento.id, plantaSendoAtacada);
                        // remover da lista personagensJogando

                        //  intervaloMovimentoZumbi = setInterval(moveElement, 100);

                        const workerZombieAndando = new Worker('/game/public/assets/js/workers/zombieAndandoThread.js');
                        workerZombieAndando.postMessage({ comando: "startZombieAndando" })
                        intervaloMovimentoZumbi = workerZombieAndando;

                        intervaloMovimentoZumbi.addEventListener('message', function (e) {

                            if (e.data.comando === 'zombieAndandoProcessado') {

                                moveElement();

                            }
                        });

                        setIntervalZombie = iniciarAnimacao(frames, gifElement, idNovoPersonagem);

                        //atualizar a lista
                        const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

                        if (intervalObj) {
                            intervalObj.intervalId = intervaloMovimentoZumbi;

                        } else {
                            // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
                        }
                    }

                    //zombi morreu contra ataque
                    if (morreuContraAtaque) {


                        //    console.log(tipoZombie.nomePersonagem + " morreu de contraataque")
                        // colidiu = false;
                        if (plantaSendoAtacada.idNovoPersonagem.nomePersonagem == 'cherrybomb') {
                            setTimeout(() => {
                                // console.log("zumbi morreu por contraAtaque")
                                pararAnimacaoZombie(elemento.id)
                                removerZombie(elemento, numeroLinha, elemento.id);
                            }, 600);
                        } else {
                            // console.log("zumbi morreu por contraAtaque")
                            pararAnimacaoZombie(elemento.id)
                            removerZombie(elemento, numeroLinha, elemento.id);
                        }

                        //  clearInterval(intervaloMovimentoZumbi);
                        intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
                        intervaloMovimentoZumbi.terminate();
                        clearInterval(setIntervalAtacando);
                        clearInterval(atacando);



                    }

                }, 1000);



         



            }
        });

        if (!colidiu) {
            //  console.log(tipoZombie.nomePersonagem + "continuou andando após o ataque")
            clearInterval(setIntervalAtacando);
            if (positionLeft > -10) {
                elemento.style.left = `${positionLeft}%`; // Continuar movendo o zumbi para a esquerda se não houve colisão
                positionLeft -= tipoZombie.velocidadeCaminhar;
            } else {
                // clearInterval(intervaloMovimentoZumbi);
                intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
                intervaloMovimentoZumbi.terminate();
                alert('Zumbi Venceu!!');
                location.reload();
            }
        }
    }

    setIntervalZombie = iniciarAnimacao(frames, gifElement, idNovoPersonagem);

    const workerZombieAndando = new Worker('/game/public/assets/js/workers/zombieAndandoThread.js');
    workerZombieAndando.postMessage({ comando: "startZombieAndando" })
    let intervaloMovimentoZumbi = workerZombieAndando;

    //let intervaloMovimentoZumbi = setInterval(() => {
    intervaloMovimentoZumbi.addEventListener('message', function (e) {

        if (e.data.comando === 'zombieAndandoProcessado') {

            moveElement();

        }
    });
    // }, 100);



    listaIntervalZombie.push({
        idNovoPersonagem: idNovoPersonagem, intervalId: intervaloMovimentoZumbi,
        setIntervalAtacando: setIntervalAtacando
    });

}

function iniciarAnimacaoComerPlanta(gifElement, setIntervalZombie, idNovoPersonagem) {
    //  const zumbiElements = document.querySelectorAll('.personagemZombie');

    //   zumbiElements.forEach(zumbiElement => {


    const zumbiElement = document.getElementById(idNovoPersonagem)

    if (zumbiElement) {
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


}

export function pararAnimacaoZombie(idNovoPersonagem) {

    // console.log("para animacao zumbi")

    const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

    if (intervalObj) {
        clearInterval(intervalObj.setIntervalAtacando);
        // clearInterval(intervalObj.intervalId);
        const workerAndando = intervalObj.intervalId;
        if (workerAndando) {
            workerAndando.postMessage({ comando: "stopZombieAndando" });
            workerAndando.terminate();
        }

        listaIntervalZombie = listaIntervalZombie.filter(item => item.idNovoPersonagem != idNovoPersonagem);
    } else {
        // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
    }
}
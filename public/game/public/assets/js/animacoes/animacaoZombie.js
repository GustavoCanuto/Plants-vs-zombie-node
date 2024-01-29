import { verificaColisao, removerPlanta, removerZombie } from "./conflitoZombie.js";
import { iniciarAnimacao, pararAnimacao } from "./framesAnimacao.js";
import { AnimacaoCartas } from "./animacaoCartas.js";

let listaIntervalZombie = [];

export function criarAnimacaoZombie(cellElement, gifElement, elemento, tabuleiro, frames, tipoZombie, idNovoPersonagem) {

    let setIntervalAtacando;

    const zombie = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == elemento.id);


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
     
 
            intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
            intervaloMovimentoZumbi.terminate();
 
            setIntervalAtacando.postMessage({ comando: "stopZombieAtacando" });
            setIntervalAtacando.terminate();
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
              

                intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
                intervaloMovimentoZumbi.terminate();

                const plantaSendoAtacada = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == plantaElemento.id);


            

                // dar e recebe dano a cada 1s
                //   let atacando = setInterval(() => {
                const workerZombieAtacando = new Worker('/game/public/assets/js/workers/zombieAtacandoThread.js');
                workerZombieAtacando.postMessage({ comando: "startZombieAtacando" })
                setIntervalAtacando = workerZombieAtacando;
                setIntervalAtacando.addEventListener('message', function (e) {
                    if (e.data.comando === 'zombieAtacandoProcessado') {

                        //  console.log(tipoZombie.nomePersonagem + " está atacando")

                        let plantaAtacadaId = document.getElementById(plantaElemento.id)
                       
                        if (!plantaAtacadaId) {
                         
                            const workerZombieAndando = new Worker('/game/public/assets/js/workers/zombieAndandoThread.js');
                            workerZombieAndando.postMessage({ comando: "startZombieAndando" })
                            intervaloMovimentoZumbi = workerZombieAndando;


                            intervaloMovimentoZumbi.addEventListener('message', function (e) {
                                if (e.data.comando === 'zombieAndandoProcessado') {
                                    moveElement();
                                }
                            });

                            iniciarAnimacao(frames, gifElement, idNovoPersonagem);

                            setIntervalAtacando.postMessage({ comando: "stopZombieAtacando" });
                            setIntervalAtacando.terminate();
                            return;

                        }

                        // setIntervalAtacando = atacando;

                        //atualizar a lista
                        const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

                        if (intervalObj) {
                            intervalObj.setIntervalAtacando = setIntervalAtacando;

                        } else {
                            // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
                        }

                        const zombieQueEstaAtacando = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == elemento.id);
                        

                        morreuContraAtaque = zombieQueEstaAtacando.idNovoPersonagem.reduzirVida(plantaSendoAtacada.idNovoPersonagem.ataque);
                        //zombi morreu contra ataque
                        if (morreuContraAtaque) {

                            pararAnimacao(idNovoPersonagem);
               
                    
                            if (plantaSendoAtacada.idNovoPersonagem.nomePersonagem == 'cherrybomb') {
                                setTimeout(() => {
                            
                                    pararAnimacaoZombie(elemento.id)
                                    removerZombie(elemento, numeroLinha, elemento.id);
                                }, 600);
                            } else {
                                // console.log("zumbi morreu por contraAtaque")
                                pararAnimacaoZombie(elemento.id)
                                removerZombie(elemento, numeroLinha, elemento.id);
                            }

                
                            intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
                            intervaloMovimentoZumbi.terminate();
                 
                            setIntervalAtacando.postMessage({ comando: "stopZombieAtacando" });
                            setIntervalAtacando.terminate();



                        }

                        iniciarAnimacaoComerPlanta(gifElement, idNovoPersonagem);

                        morreu = plantaSendoAtacada.idNovoPersonagem.reduzirVida(tipoZombie.ataque)

                        //matou a planta
                        if (morreu) {

                            //  console.log(tipoZombie.nomePersonagem + " matou a planta que estava atacando")
                            // clearInterval(setIntervalAtacando);
                            // clearInterval(atacando);

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

                            iniciarAnimacao(frames, gifElement, idNovoPersonagem);

                            //atualizar a lista
                            const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

                            if (intervalObj) {
                                intervalObj.intervalId = intervaloMovimentoZumbi;

                            } else {
                                // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
                            }

                            setIntervalAtacando.postMessage({ comando: "stopZombieAtacando" });
                            setIntervalAtacando.terminate();
                        }



                        //}, 1000);
                    }
                });



                const workerContinuarMovendo = new Worker('/game/public/assets/js/workers/continuarMovendoZombie.js');
                workerContinuarMovendo.postMessage({ comando: "startContinuaMovendoZombie" })

                //let intervaloMovimentoZumbi = setInterval(() => {
                workerContinuarMovendo.addEventListener('message', function (e) {

                    if (e.data.comando === 'continuaMovendoZombieProcessado') {

                        if (e.data.tempoRestante > 0) {
                            elemento.style.left = `${positionLeft}%`; // Continuar movendo o zumbi para a esquerda se não houve colisão
                            positionLeft -= zombie.idNovoPersonagem.velocidadeCaminhar;

                        } else {
                            workerContinuarMovendo.postMessage({ comando: "stopContinuaMovendoZombie" });
                            workerContinuarMovendo.terminate();
                        }


                    }
                });




            }
        });


        if (!colidiu) {

            if (setIntervalAtacando) {
                setIntervalAtacando.postMessage({ comando: "stopZombieAtacando" });
                setIntervalAtacando.terminate();
            }

            if (positionLeft > -10) {
                elemento.style.left = `${positionLeft}%`; // Continuar movendo o zumbi para a esquerda se não houve colisão
                positionLeft -= zombie.idNovoPersonagem.velocidadeCaminhar;
            } else {
         
                intervaloMovimentoZumbi.postMessage({ comando: "stopZombieAndando" });
                intervaloMovimentoZumbi.terminate();
            

                if (!vitoria) {
                    $(".messagemCarregamento").css("height", "15%");
                    $(".messagemCarregamento").css("width", "35%");
                    $(".contagemJogo").css("display", "none");
                    $('.textoVitoria').text("Zumbis Venceu!");
                    $(".btnVoltarLobby").css("display", "block");
                    $(".carregamento").css("backgroundColor", " rgba(8, 8, 8, 0.61)");
                    $(".carregamento").css("display", "flex");
                    $(".messagemCarregamento").css("display", "flex");
                    vitoria = true;
                    if (ladoJogador == 1) {
                        let tokenUsuario = localStorage.getItem('tokenUsuario');
                        socket2.emit('pontosParaOVencedor',  tokenUsuario)
                    }
                }

            }
        }
    }

    iniciarAnimacao(frames, gifElement, idNovoPersonagem);

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

function iniciarAnimacaoComerPlanta(gifElement, idNovoPersonagem) {
    //  const zumbiElements = document.querySelectorAll('.personagemZombie');

    //   zumbiElements.forEach(zumbiElement => {


    const zumbiElement = document.getElementById(idNovoPersonagem)

    if (zumbiElement) {
        pararAnimacao(idNovoPersonagem)

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

   

    }


}

export function pararAnimacaoZombie(idNovoPersonagem) {

    // console.log("para animacao zumbi")

    const intervalObj = listaIntervalZombie.find(item => item.idNovoPersonagem == idNovoPersonagem);

    if (intervalObj) {

        const workerAtacando = intervalObj.setIntervalAtacando;
        if (workerAtacando) {
            workerAtacando.postMessage({ comando: "stopZombieAtacando" });
            workerAtacando.terminate();
        }

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
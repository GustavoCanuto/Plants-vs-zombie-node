import { verificaColisaoTiro, removerZombie } from "./conflitoZombie.js";
import { AnimacaoCartas } from "./animacaoCartas.js";
import { pararAnimacaoZombie } from "./animacaoZombie.js";
import { pararAnimacao } from "./framesAnimacao.js";
let listaIntervalTiro = [];

export function iniciarAnimacaoTiro(cellElement, nomeClasse, idNovoPersonagem) {

    const workerSequenciaTiro = new Worker('/game/public/assets/js/workers/sequenciaTiroThread.js');
    let workerIntervaloTiro;
    let especial = false;


    const divTiroElement = document.createElement('div');
    // const tiroElement = document.createElement('img');
    let caminhoImagem;
    let numeroTiros = 1;
    let tabuleiro = document.querySelector('.board')
    let classeLinha = cellElement.closest(".row").className.split(' ');
    let linhaAtiva = classeLinha[1];
    let numeroLinha = linhaAtiva.charAt(linhaAtiva.length - 1);
    let verificaFilho;
    let danoTiro = 1;

    if (nomeClasse === 'peashooter') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
        especial = false;
        danoTiro = 1;
    } else if (nomeClasse === 'showpea') {
        caminhoImagem = './assets/img/peashooter_tiro_gelo.gif';
        especial = true;
        danoTiro = 1;
    } else if (nomeClasse === 'repeater') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
        numeroTiros = 2;
        especial = false;
        danoTiro = 0.5;
    } else {
        return;
    }

    for (let i = 0; i < numeroTiros; i++) {

        workerSequenciaTiro.postMessage({ comando: "startSequenciaTiro" })

        workerSequenciaTiro.addEventListener('message', function (e) {

            if (e.data.comando === 'sequenciaTiroProcessado') {

                //const sequenciaTiro = setInterval(() => {

                if (AnimacaoCartas.zombieNaLinha[linhaAtiva] > 0) {

                    //  const tiroElementClone = tiroElement.cloneNode();
                    const divTiroElementClone = divTiroElement.cloneNode();
                    let posicaoLeft = 50; // Defina a posição inicial do tiro (ajuste conforme necessário)

                    // verificar se há zombie na linha 

                    setTimeout(() => {



                        //  tiroElementClone.src = caminhoImagem;
                        divTiroElementClone.classList.add('tiro'); // aqui adicionar  um top position
                        divTiroElementClone.style.backgroundImage = `url("${caminhoImagem}")`;
                        divTiroElementClone.style.backgroundSize = 'cover'; // You can als
                        //  divTiroElementClone.appendChild(tiroElementClone);
                        divTiroElementClone.style.left = `${posicaoLeft}%`;
                        cellElement.appendChild(divTiroElementClone);


                        //  const intervaloTiro = setInterval(() => {
                        const newWorkerIntervaloTiro = new Worker('/game/public/assets/js/workers/intervaloTiroThread.js');
                        workerIntervaloTiro = newWorkerIntervaloTiro;

                        newWorkerIntervaloTiro.postMessage({ comando: "startIntervaloTiro" })

                        newWorkerIntervaloTiro.addEventListener('message', function (e) {

                            if (e.data.comando === 'intervaloTiroProcessado') {

                                verificaFilho = document.getElementById(idNovoPersonagem)

                                if (!verificaFilho) {
                                    divTiroElementClone.remove();
                                    //clearInterval(intervaloTiro);
                                    newWorkerIntervaloTiro.postMessage({ comando: "stopIntervaloTiro" });
                                    newWorkerIntervaloTiro.terminate();
                                    // clearInterval(sequenciaTiro);
                                    workerSequenciaTiro.postMessage({ comando: "stopSequenciaTiro" });
                                    workerSequenciaTiro.terminate();

                                }

                                let colidiu = false;
                                //verificar conflito aqui

                                const zombieElements = document.querySelectorAll('.personagemZombie');

                                zombieElements.forEach((zombieElemento) => {

                                    if (verificaColisaoTiro(zombieElemento, divTiroElementClone)) {

                                        let morreu;
                                        colidiu = true;


                                        divTiroElementClone.remove();



                                        const personagemEncontrado = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == zombieElemento.id);


                                        personagemEncontrado.idNovoPersonagem.golpeEspecial(especial, zombieElemento);
                                        morreu = personagemEncontrado.idNovoPersonagem.reduzirVida(danoTiro);

                                        if (morreu) {



                                            pararAnimacaoZombie(zombieElemento.id)
                                            pararAnimacao(zombieElemento.id)

                                            let div = document.getElementById(zombieElemento.id);
                                            if (div) {

                                                let gifElement = div.firstChild;

                                                if (zombieElemento.classList.contains('tamanho-buckethead')) {

                                                    zombieElemento.style.left = `${zombieElemento.offsetLeft - 15}px`;
                                                    gifElement.src = './assets/img/zombieMorrendo/ZombieDie.gif';
                                                    gifElement.style.width = '150%';



                                                } else if (zombieElemento.classList.contains('tamanho-flagzombie')) {

                                                    gifElement.src = './assets/img/zombieMorrendo/ZombieMichelleDie.gif';
                                                    zombieElemento.style.left = `${zombieElemento.offsetLeft - 25}px`;
                                                    gifElement.style.width = '200%';


                                                } else if (zombieElemento.classList.contains('tamanho-football')) {

                                                    gifElement.src = './assets/img/zombieMorrendo/fotballDie.gif';
                                                    zombieElemento.style.left = `${zombieElemento.offsetLeft - 15}px`;
                                                    gifElement.style.width = '150%';


                                                } else if (zombieElemento.classList.contains('tamanho-screendoor')) {

                                                    gifElement.src = './assets/img/zombieMorrendo/screendoorDie.gif';
                                                    zombieElemento.style.left = `${zombieElemento.offsetLeft - 20}px`;
                                                    gifElement.style.width = '150%';
                                                    zombieElemento.style.filter = 'brightness(70%) sepia(20%)';
                                                    zombieElemento.style.transition = 'opacity 0.3s ease';
                                                    setTimeout(() => {
                                                        zombieElemento.style.opacity = '0.09';
                                                    }, 700)

                                                } else if (zombieElemento.classList.contains('tamanho-zombie')) {

                                                    zombieElemento.style.left = `${zombieElemento.offsetLeft - 15}px`;
                                                    gifElement.src = './assets/img/zombieMorrendo/ZombieDie.gif';
                                                    gifElement.style.width = '150%';

                                                } else {
                                                    zombieElemento.style.transition = 'opacity 1s ease';
                                                    zombieElemento.style.filter = 'grayscale(10%) brightness(80%) sepia(80%)';
                                                    zombieElemento.style.transition = 'opacity 0.3s ease';
                                                    setTimeout(() => {
                                                        zombieElemento.style.opacity = '0.09';
                                                    }, 700)
                                                }

                                            }
                                            setTimeout(() => {
                                                removerZombie(zombieElemento, numeroLinha, zombieElemento.id);
                                            }, 1200)

                                            //AnimacaoCartas.zombieNaLinha[linhaAtiva] -= 1;

                                        }
                                        //clearInterval(intervaloTiro);
                                        newWorkerIntervaloTiro.postMessage({ comando: "stopIntervaloTiro" });
                                        newWorkerIntervaloTiro.terminate();

                                    }

                                });


                                if (!colidiu) {
                                    //comportamento  do tiro
                                    const tabuleiroRect = tabuleiro.getBoundingClientRect();
                                    const cellRect = cellElement.getBoundingClientRect();
                                    const tabuleiroWidth = tabuleiroRect.width;
                                    const tiroWidth = (divTiroElementClone.offsetWidth / tabuleiroWidth) * 100; // Convertendo para porcentagem

                                    const posicaoFinal = ((tabuleiroRect.left + tabuleiroWidth - cellRect.left - tiroWidth) / tabuleiroWidth) * 1000; // Convertendo para porcentagem

                                    if (posicaoLeft < posicaoFinal) {
                                        // Ajuste para um movimento mais suave, você pode ajustar conforme necessário
                                        posicaoLeft += 7;
                                        divTiroElementClone.style.left = `${posicaoLeft}%`;

                                    } else {
                                        //  clearInterval(intervaloTiro);
                                        divTiroElementClone.remove();
                                        newWorkerIntervaloTiro.postMessage({ comando: "stopIntervaloTiro" });
                                        newWorkerIntervaloTiro.terminate();
                                    }

                                }

                                // }, 50);
                            }
                        });



                        divTiroElementClone.style.width = '46%';
                        divTiroElementClone.style.height = '23%';


                    }, i * 500);


                }

            }
        });
        //}, 3500);

        listaIntervalTiro.push({ idNovoPersonagem: idNovoPersonagem, intervalId: workerSequenciaTiro, intervalIntervaloId: workerIntervaloTiro });

    }
}



export function pararAnimacaoTiro(idNovoPersonagem) {
    const intervalObj = listaIntervalTiro.find(item => item.idNovoPersonagem == idNovoPersonagem);

    if (intervalObj) {
        const workerSequencia = intervalObj.intervalId;
        if (workerSequencia) {
            workerSequencia.postMessage({ comando: "stopSequenciaTiro" });
            workerSequencia.terminate();
        }

        const workerIntervalo = intervalObj.intervalIntervaloId;

        if (workerIntervalo) {
            workerIntervalo.postMessage({ comando: "stopIntervaloTiro" });
            workerIntervalo.terminate();
        }

        listaIntervalTiro = listaIntervalTiro.filter(item => item.idNovoPersonagem != idNovoPersonagem);
    } else {
        // console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
    }
}
import { verificaColisaoTiro, removerZombie } from "./conflitoZombie.js";
import { AnimacaoCartas } from "./animacaoCartas.js";
import { pararAnimacaoZombie } from "./animacaoZombie.js";

let listaIntervalTiro = [];

export function iniciarAnimacaoTiro(cellElement, nomeClasse, idNovoPersonagem) {

    const workerSequenciaTiro = new Worker('/game/public/assets/js/workers/sequenciaTiroThread.js');
    let workerIntervaloTiro;
   


    const divTiroElement = document.createElement('div');
   // const tiroElement = document.createElement('img');
    let caminhoImagem;
    let numeroTiros = 1;
    let tabuleiro = document.querySelector('.board')
    let classeLinha = cellElement.closest(".row").className.split(' ');
    let linhaAtiva = classeLinha[1];
    let numeroLinha = linhaAtiva.charAt(linhaAtiva.length - 1);
    let verificaFilho;

    if (nomeClasse === 'peashooter') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
    } else if (nomeClasse === 'showpea') {
        caminhoImagem = './assets/img/peashooter_tiro_gelo.gif';
    } else if (nomeClasse === 'repeater') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
        numeroTiros = 2;
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
                        const newWorkerIntervaloTiro  = new Worker('/game/public/assets/js/workers/intervaloTiroThread.js');
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
                                    // console.log("conflitou")
                                  
                                    divTiroElementClone.remove();
                                    
                                    //ao acontecer conflito com o zombie

                                    const personagemEncontrado = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == zombieElemento.id);

                                    //console.log(personagemEncontrado.idNovoPersonagem.id)

                                    morreu = personagemEncontrado.idNovoPersonagem.reduzirVida(1)

                                    if (morreu) {
                                        // console.log("zumbi morreu por tiro")
                                        pararAnimacaoZombie(zombieElemento.id)
                                        removerZombie(zombieElemento, numeroLinha, zombieElemento.id);
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
                                    newWorkerIntervaloTiro.postMessage({comando: "stopIntervaloTiro"});
                                    newWorkerIntervaloTiro.terminate();
                                }

                            }

                       // }, 50);
                        }});



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
        if(workerSequencia){
        workerSequencia.postMessage({ comando: "stopSequenciaTiro" });
        workerSequencia.terminate();
         }

        const workerIntervalo = intervalObj.intervalIntervaloId;

        if(workerIntervalo){
        workerIntervalo.postMessage({ comando: "stopIntervaloTiro" });
        workerIntervalo.terminate();
        }

        listaIntervalTiro = listaIntervalTiro.filter(item => item.idNovoPersonagem != idNovoPersonagem);
    } else {
        console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
    }
}
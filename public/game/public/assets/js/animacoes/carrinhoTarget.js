
import { AnimacaoCartas } from "./animacaoCartas.js";
import { personagens } from "../personagens.js";
import { verificaColisaoCarrinho, removerZombie } from "./conflitoZombie.js";
import { pararAnimacaoZombie } from "./animacaoZombie.js";
import { pararAnimacao } from "./framesAnimacao.js";


function criarCarrinhoETarget() {
    let contadorCarrinho = 0;
    let contadorTarget = 0;
    let celulasCarinnho = document.querySelectorAll('.grass-cutter');
    let celulasTarget = document.querySelectorAll('[id$="Coluna10"]');
    let tabuleiro = document.querySelector('.board')


    celulasCarinnho.forEach((cellElement) => {
        contadorCarrinho++;
        const divCarrinhoElement = document.createElement('div');
        // const carrinhoElement = document.createElement('img');

        // carrinhoElement.src = './assets/img/personagens/plants/LawnCleaner.png';
        divCarrinhoElement.classList.add('carrinho');
        divCarrinhoElement.id = `carrinhoLinha${contadorCarrinho}`;

        cellElement.appendChild(divCarrinhoElement);

        if (cenario == 0) {
            if (contadorCarrinho == 5) {
                divCarrinhoElement.style.left = "10%"
            }
        }
        let posicaoLeft = 20;

        // verificar conflito com zumbi 
        //  const intervaloCarrinho = setInterval(() => {
        const workerCarrinho = new Worker('/game/public/assets/js/workers/carrinhoThread.js');

        workerCarrinho.postMessage({ comando: "startCarrinho" })

        workerCarrinho.addEventListener('message', function (e) {

            if (e.data.comando === 'carrinhoProcessado') {

                let colidiu = false;

                const zombieElements = document.querySelectorAll('.personagemZombie');

                zombieElements.forEach((zombieElemento) => {

                    if (verificaColisaoCarrinho(zombieElemento, divCarrinhoElement)) { // ou emitido pelo socket

                        let morreu;
                        colidiu = true;
                        let numeroLinha = divCarrinhoElement.id;
                        numeroLinha = numeroLinha.charAt(numeroLinha.length - 1);

                        // const carrinhoAndando = setInterval(() => {
                        const workerCarrinhoAndando = new Worker('/game/public/assets/js/workers/carrinhoAndandoThread.js');

                        workerCarrinhoAndando.postMessage({ comando: "startCarrinhoAndando" })

                        workerCarrinhoAndando.addEventListener('message', function (e) {

                            if (e.data.comando === 'carrinhoAndandoProcessado') {

                                // console.log("iniciou animacao carrrinho")

                                const tabuleiroRect = tabuleiro.getBoundingClientRect();
                                const cellRect = cellElement.getBoundingClientRect();
                                const tabuleiroWidth = tabuleiroRect.width;
                                const tiroWidth = (divCarrinhoElement.offsetWidth / tabuleiroWidth) * 100; // Convertendo para porcentagem

                                const posicaoFinal = ((tabuleiroRect.left + tabuleiroWidth - cellRect.left - tiroWidth) / tabuleiroWidth) * 1000; // Convertendo para porcentagem

                                if (posicaoLeft < posicaoFinal) {
                                    posicaoLeft += 10; // Ajuste para um movimento mais suave, você pode ajustar conforme necessário
                                    divCarrinhoElement.style.left = `${posicaoLeft}%`;
                                } else {
                                    divCarrinhoElement.remove();
                                    // clearInterval(carrinhoAndando);
                                    workerCarrinhoAndando.postMessage({ comando: "stopCarrinhoAndando" });
                                    workerCarrinhoAndando.terminate();
                                    //  clearInterval(intervaloCarrinho);
                                    workerCarrinho.postMessage({ comando: "stopCarrinho" });
                                    workerCarrinho.terminate();


                                }


                                //  }, 50);
                            }
                        });

                        // console.log("conflitou com carrinho")


                        //ao acontecer conflito com o zombie

                        const personagemEncontrado = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == zombieElemento.id);

                        // console.log(personagemEncontrado.idNovoPersonagem.id)

                        if (personagemEncontrado.idNovoPersonagem.nomePersonagem != 'Zombie_Target1') {
                            morreu = personagemEncontrado.idNovoPersonagem.reduzirVida(999)
                        }



                        if (morreu) {
                            // console.log("morreu com carrinho")

                            pararAnimacaoZombie(personagemEncontrado.idNovoPersonagem.id)
                            pararAnimacao(personagemEncontrado.idNovoPersonagem.id)
                            // zombieElemento.style.height = '50%';
                            let imgZombie = zombieElemento.firstChild;
                            zombieElemento.style.height = '12%';
                            zombieElemento.style.marginBottom = '2%';


                            imgZombie.style.width = '160%';
                            imgZombie.style.height = '100%';

                            // imgZombie.style.transform = 'scaleX(1.5)';

                            //   zombieElemento.style.transform = 'scaleY(0.5)';

                            // zombieElemento.style.transform = 'scaleX(2)';
                            //esmagar zombieElement 

                            // setTimeout(()=>{
                            //     zombieElemento.style.transform = 'scaleX(5)';
                            // },500)

                            setTimeout(() => {
                                removerZombie(zombieElemento, numeroLinha, zombieElemento.id);
                            }, 1000)



                        }

                    }
                });

                // }, 100);
            }
        });



    });

    celulasTarget.forEach((cellElement) => {

        let novoPersonagem = personagens["target"].clone();
        let idNovoPersonagem = novoPersonagem.id;
        AnimacaoCartas.personagensJogando.push({ idNovoPersonagem: novoPersonagem })

        contadorTarget++;
        AnimacaoCartas.zombieNaLinha[`linha${contadorTarget}`] += 1;

        const divTargetElement = document.createElement('div');
        const targetElement = document.createElement('img');

        targetElement.src = './assets/img/personagens/zombies/Zombie_Target1.gif';
        divTargetElement.classList.add('personagemZombie');
        divTargetElement.classList.add('target');
        divTargetElement.id = idNovoPersonagem;
        divTargetElement.appendChild(targetElement);
        cellElement.appendChild(divTargetElement);


    });

}

criarCarrinhoETarget();

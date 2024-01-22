
import { AnimacaoCartas } from "./animacaoCartas.js";
import { personagens } from "../personagens.js";
import { verificaColisaoTiro,removerZombie } from "./conflitoZombie.js";


function criarCarrinhoETarget() {
    let contadorCarrinho = 0;
    let contadorTarget = 0;
    let celulasCarinnho = document.querySelectorAll('.grass-cutter');
    let celulasTarget = document.querySelectorAll('[id$="Coluna10"]');

    celulasCarinnho.forEach((cellElement) => {
        contadorCarrinho++;
        const divCarrinhoElement = document.createElement('div');
        const carrinhoElement = document.createElement('img');

        carrinhoElement.src = './assets/img/personagens/plants/LawnCleaner.png';
        divCarrinhoElement.classList.add('carrinho');
        divCarrinhoElement.id = `carrinhoLinha${contadorCarrinho}`;
        divCarrinhoElement.appendChild(carrinhoElement);
        cellElement.appendChild(divCarrinhoElement);

        if (contadorCarrinho == 5) {
            divCarrinhoElement.style.left = "10%"
        }


        // verificar conflito com zumbi 
        const intervaloCarrinho = setInterval(() => {

            let colidiu = false;

            const zombieElements = document.querySelectorAll('.personagemZombie');

            zombieElements.forEach((zombieElemento) => {

                if (verificaColisaoTiro(zombieElemento, divCarrinhoElement)) {
                    let morreu;
                    colidiu = true;

                    console.log("conflitou")
                    clearInterval(intervaloCarrinho);
                
                    //ao acontecer conflito com o zombie

                    const personagemEncontrado = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == zombieElemento.id);

                    console.log(personagemEncontrado.idNovoPersonagem.id)


                    morreu = personagemEncontrado.idNovoPersonagem.reduzirVida(999)



                    if (morreu) {
                        removerZombie(zombieElemento);
                        AnimacaoCartas.zombieNaLinha[`linha${contadorCarrinho}`] = 0;

                    }

                }
            });

        }, 100);



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
            divTargetElement.classList.add('target');
            divTargetElement.classList.add('personagemZombie');
            divTargetElement.id = idNovoPersonagem;
            divTargetElement.appendChild(targetElement);
            cellElement.appendChild(divTargetElement);


        });

    }

criarCarrinhoETarget();

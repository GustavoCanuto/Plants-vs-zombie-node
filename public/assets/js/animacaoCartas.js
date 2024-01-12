import * as comandosNavBar from './comandos/comandosNavBar.js';
import { personagens } from "./personagens.js";
import {pontuacaoLado, pontosLado} from "./pontuacao.js";

var animationInterval;

class AnimacaoCartas {

    static framesPorClasse = {
        sunflower: 25,
        peashooter: 25,
        showpea: 25,
        repeater: 25,
        wallnut: 17,
        cherrybomb: 25,
        potatomine: 11,
        cardtombstone: 1,
        zombie: 47,
        conehead: 20,
        buckethead: 47,
        flagzombie: 20,
        football: 30,
        screendoor: 47,
    };

    static verificaColisao(elementoA, elementoB) {
        const aEsquerda = elementoA.offsetLeft;
        const aTopo = elementoA.offsetTop;
        const aDireita = aEsquerda + elementoA.offsetWidth;
        const aBaixo = aTopo + elementoA.offsetHeight;

        const bEsquerda = elementoB.offsetLeft;
        const bTopo = elementoB.offsetTop;
        const bDireita = bEsquerda + elementoB.offsetWidth;
        const bBaixo = bTopo + elementoB.offsetHeight;

        return (
            aEsquerda < bDireita &&
            aDireita > bEsquerda &&
            aTopo < bBaixo &&
            aBaixo > bTopo
        );
    }

    static criarAnimacaoCarta(cellElement, img) {
        const imgSrc = img.src;

        if (!imgSrc.includes('/img/personagens/')) {
            console.error('Imagem Inválida');
            return;
        }

        if (!cellElement) {
            console.error('Não foi possível obter os índices do tabuleiro.');
            return;
        }

        const nomeClasse = imgSrc.split('/').pop().split('.')[0];

        const isPlanta = ['sunflower', 'peashooter', 'showpea', 'repeater', 'wallnut', 'cherrybomb', 'potatomine'].includes(nomeClasse);

        if (isPlanta) {
            const personagemNome = comandosNavBar.cellNavBarAtual[0].getAttribute('data-personagem');
            console.log(personagens[personagemNome].imagePath)
            console.log(personagens[personagemNome].recarregado)
            if (personagens[personagemNome].valorCard <= pontuacaoLado[0]
            && personagens[personagemNome].recarregado) {
                this.criarAnimacaoPlanta(cellElement, nomeClasse);
                pontuacaoLado[0] -= personagens[personagemNome].valorCard;
                pontosLado[0].textContent = pontuacaoLado[0];
                personagens[personagemNome].recarregado = false;
                comandosNavBar.cellNavBarAtual[0].classList.add('recarregando')
                var celulaAnimacao = comandosNavBar.cellNavBarAtual[0];
                personagens[personagemNome].recarregado = false;
                var porcentagemRecarregado = 100;
                 var setIntervalRecarga = setInterval(function () {
                    porcentagemRecarregado -= 1
                    celulaAnimacao.style.setProperty('--before-width', `${porcentagemRecarregado}%`);

                 }, personagens[personagemNome].tempoRecarga/100);

                //comandosNavBar.cellNavBarAtual[0].style.setProperty('--before-width', '70%  !important');

                setTimeout(function () {
                    personagens[personagemNome].recarregado = true;
                  //  alert('rercarregaou')
                     comandosNavBar.cellNavBarAtual[0].classList.remove('recarregando')
                     clearInterval(setIntervalRecarga)
                }, personagens[personagemNome].tempoRecarga);


                let listaCard = document.querySelectorAll('.navbar-planta .card');
                listaCard.forEach(cardNome=> {
                    console.log(cardNome.getAttribute('data-personagem'))
                    console.log(personagens[cardNome.getAttribute('data-personagem')].valorCard )
                    console.log('pontuacao' + pontuacaoLado[0] )
                    if(personagens[cardNome.getAttribute('data-personagem')].valorCard <= pontuacaoLado[0]){
                      console.log('adicionou')
                        cardNome.classList.remove('semSaldo')
                    }else{
                      console.log('removeu')
                      cardNome.classList.add('semSaldo')
                    }});

            } else {
                console.log("carta indisponivel")
            }

        } else {

            // zombies
            const personagemNome = comandosNavBar.cellNavBarAtual[1].getAttribute('data-personagem');
            if (personagens[personagemNome].valorCard <= pontuacaoLado[1]) {
                this.criarAnimacaoZombie(cellElement, nomeClasse);
                pontuacaoLado[1] -= personagens[personagemNome].valorCard;
                pontosLado[1].textContent = pontuacaoLado[1];
                personagens[personagemNome].recarregado = false;
                comandosNavBar.cellNavBarAtual[1].classList.add('recarregando')
                var celulaAnimacao = comandosNavBar.cellNavBarAtual[1];
                personagens[personagemNome].recarregado = false;
                var porcentagemRecarregado = 100;
                 var setIntervalRecarga = setInterval(function () {
                    porcentagemRecarregado -= 1
                    celulaAnimacao.style.setProperty('--before-width', `${porcentagemRecarregado}%`);

                 }, personagens[personagemNome].tempoRecarga/100);

                //comandosNavBar.cellNavBarAtual[0].style.setProperty('--before-width', '70%  !important');

                setTimeout(function () {
                    personagens[personagemNome].recarregado = true;
                  //  alert('rercarregaou')
                     comandosNavBar.cellNavBarAtual[1].classList.remove('recarregando')
                     clearInterval(setIntervalRecarga)
                }, personagens[personagemNome].tempoRecarga);


                let listaCard = document.querySelectorAll('.navbar-zombie .card');
                listaCard.forEach(cardNome=> {
                    console.log(cardNome.getAttribute('data-personagem'))
                    console.log(personagens[cardNome.getAttribute('data-personagem')].valorCard )
                    console.log('pontuacao' + pontuacaoLado[1] )
                    if(personagens[cardNome.getAttribute('data-personagem')].valorCard <= pontuacaoLado[1]){
                      console.log('adicionou')
                        cardNome.classList.remove('semSaldo')
                    }else{
                      console.log('removeu')
                      cardNome.classList.add('semSaldo')
                    }});

            } else {
                console.log("carta indisponivel")
            }

        }
    }

    static criarAnimacaoPlanta(cellElement, nomeClasse) {

        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = this.carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        elemento.style.width = '90%';
        elemento.classList.add('personagemPlanta');
        const gifElement = document.createElement('img');
        elemento.appendChild(gifElement);
        cellElement.appendChild(elemento);
        elemento.closest('.cell').classList.add('ocupado')

        this.iniciarAnimacao(frames, gifElement);
    }
    static criarAnimacaoZombie(cellElement, nomeClasse) {
        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        elemento.style.width = '10%';
        const gifElement = document.createElement('img');
        gifElement.style.width = '100%';
        elemento.appendChild(gifElement);
        let tabuleiro = document.querySelector('.board');

        if (!tabuleiro) {
            console.error('Elemento .board não encontrado.');
            return;
        }

        tabuleiro.appendChild(elemento);

        const posicaoLeft = (cellElement.offsetLeft / tabuleiro.offsetWidth) * 100;

        elemento.style.position = 'absolute';

        let posicaoBottom = ((tabuleiro.offsetHeight - (cellElement.offsetTop + cellElement.offsetHeight)) / tabuleiro.offsetHeight) * 100;

        elemento.style.bottom = `${posicaoBottom}%`;
        elemento.style.left = `${posicaoLeft}%`;

        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = this.carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        let positionLeft = posicaoLeft;

        function moveElement() {
            const plantElements = document.querySelectorAll('.personagemPlanta');
            let colidiu = false;
    
            plantElements.forEach((plantaElemento) => {
                if (AnimacaoCartas.verificaColisao(elemento, plantaElemento.closest('.cell'))) {
                    clearInterval(intervaloMovimentoZumbi);
                    AnimacaoCartas.iniciarAnimacaoComerPlanta(gifElement);
    
                    setTimeout(() => {
                        AnimacaoCartas.removerPlanta(plantaElemento);
                        // Reiniciar o movimento do zumbi e a animação de andar
                        intervaloMovimentoZumbi = setInterval(moveElement, 100);
                        AnimacaoCartas.iniciarAnimacao(frames, gifElement);
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
                    positionLeft -= 3;
                } else {
                    clearInterval(intervaloMovimentoZumbi);
                    console.log('Zumbi atingiu a borda esquerda.');
                }
            }
        }
        
        let intervaloMovimentoZumbi = setInterval(moveElement, 100);

        this.iniciarAnimacao(frames, gifElement);

        elemento.classList.remove('adicionado');
    }

    static iniciarAnimacaoComerPlanta(gifElement) {
        console.log('comendo...');
        clearInterval(animationInterval)
        gifElement.style.width = '100%'
        gifElement.src = '../assets/img/frames/buckethead/atacando/attack.gif';
    }

    static removerPlanta(plantaElemento) {
        console.log('removido');
        plantaElemento.remove();
    }

    static iniciarAnimacao(frames, gifElement) {
        let frameIndex = 0;
        const frameDuration = 50;



        animationInterval = setInterval(() => {
            if (gifElement) {
                gifElement.src = frames[frameIndex].src;
                frameIndex = (frameIndex + 1) % frames.length;
            } else {
                clearInterval(animationInterval);
                console.error('Elemento gifElement não encontrado.');
            }
        }, frameDuration);
    }

    static carregarFrames(nomeClasse, numberOfFrames) {
        const frames = [];

        for (let i = 1; i <= numberOfFrames; i++) {
            const imgFrame = new Image();
            imgFrame.src = `../assets/img/frames/${nomeClasse}/andando/frame-${i}.webp`;
            frames.push(imgFrame);
        }

        return frames;
    }
}

export default AnimacaoCartas;

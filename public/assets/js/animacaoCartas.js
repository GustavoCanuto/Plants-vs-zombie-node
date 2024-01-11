var  animationInterval;

class AnimacaoCartas {

    static framesPorClasse = {
        sunflower: 25,
        peashooter: 25,
        showpea: 25,
        repeater: 25,
        wallnut: 17,
        cherrybomb: 14,
        potatomine: 11,
        cardtombstone: 1,
        zombie: 47,
        conehead: 47,
        buckethead: 47,
        flagzombie: 47,
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

    static criarAnimacaoCarta(cellElement , img) {
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
            this.criarAnimacaoPlanta(cellElement, nomeClasse);
        } else {
            this.criarAnimacaoZombie(cellElement, nomeClasse);
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
        elemento.style.width = '15%';
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
                    }, 100);
        
                    colidiu = true;
                    console.log('colidiu');
        
                    let tempoRestante = 3; 
        
                    const continuarMovendo = setInterval(() => {
                        if (tempoRestante > 0) {
                            elemento.style.left = `${positionLeft}%`;
                            positionLeft -= 0.5; // andar um pouco apos a colisao
                            tempoRestante -= 1;
                        } else {
                            clearInterval(continuarMovendo);
                        }
                    }, 100);
        
                }
            });
        
            if (!colidiu) {
                if (positionLeft > -10) {
                    // Continuar movendo o zumbi para a esquerda se não houve colisão
                    elemento.style.left = `${positionLeft}%`;
                    positionLeft -= 3;
                } else {
                    clearInterval(intervaloMovimentoZumbi);
                    console.log('Zumbi atingiu a borda esquerda.');
                    // Adicione aqui qualquer lógica adicional que você deseja quando o zumbi atinge a borda esquerda
                }
            }
        }
        
        const intervaloMovimentoZumbi = setInterval(moveElement, 100);
               
        this.iniciarAnimacao(frames, gifElement);    

        elemento.classList.remove('adicionado');
    }

    static iniciarAnimacaoComerPlanta(gifElement) {
        console.log('comendo...');
        clearInterval(animationInterval)
        gifElement.style.width = '55%'
        gifElement.src = '../assets/img/comendo.gif';
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
            imgFrame.src = `../assets/img/frames/${nomeClasse}/frame-${i}.gif`;
            frames.push(imgFrame);
        }

        return frames;
    }
}

export default AnimacaoCartas;

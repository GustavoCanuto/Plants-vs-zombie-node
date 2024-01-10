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

    static criarAnimacaoCarta(ev, img) {
        const imgSrc = img.src;

        if (!imgSrc.includes('/img/personagens/')) {
            console.error('Imagem Inválida');
            return;
        }

        const cellElement = ev.target.closest('.cell');
        if (!cellElement) {
            console.error('Não foi possível obter os índices do tabuleiro.');
            return;
        }

        const nomeClasse = imgSrc.split('/').pop().split('.')[0];

        // Verifica se a classe pertence ao conjunto de plantas
        const isPlanta = ['sunflower', 'peashooter', 'showpea', 'repeater', 'wallnut', 'cherrybomb', 'potatomine'].includes(nomeClasse);

        if (isPlanta) {
            this.criarAnimacaoPlanta(cellElement, nomeClasse, this.framesPorClasse);
        } else {
            this.criarAnimacaoZombie(cellElement, nomeClasse);
        }
    }


    static criarAnimacaoPlanta(cellElement, nomeClasse, framesPorClasse) {
        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = this.carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        const elemento = document.createElement('div');
        elemento.classList.add('personagemPlanta');
        const gifElement = document.createElement('img');
        elemento.appendChild(gifElement);
        cellElement.appendChild(elemento);

        this.iniciarAnimacao(frames, gifElement);
    }

    static criarAnimacaoZombie(cellElement, nomeClasse) {
        const elemento = document.createElement('div');
        elemento.classList.add('personagemZombie');
        const gifElement = document.createElement('img');
        elemento.appendChild(gifElement);
        let tabuleiro = document.querySelector('.board');
        tabuleiro.appendChild(elemento);
    
        function atualizarPosicao(posLeft, posTop, cellWidth, cellHeight) {
            elemento.style.position = 'absolute';
            elemento.style.width = `${cellWidth}px`;
            elemento.style.height = `${cellHeight}px`;
            elemento.style.top = `${(posTop / window.innerHeight) * 100}vh`;
            elemento.style.left = `${(posLeft / window.innerWidth) * 100}vw`;
    
            // Ajuste do tamanho da imagem
            gifElement.style.maxWidth = `${cellWidth}px`;
            gifElement.style.maxHeight = `${cellHeight}px`;
        }
    
        const atualizarPosicaoInicial = () => {
            const cellWidth = cellElement.offsetWidth;
            const cellHeight = cellElement.offsetHeight;
            const posicaoLeft = cellElement.offsetLeft;
            const posicaoTop = cellElement.offsetTop;
    
            atualizarPosicao(posicaoLeft, posicaoTop, cellWidth, cellHeight);
        };
    
        atualizarPosicaoInicial(); // Chamar inicialmente ao criar o elemento
    
        window.addEventListener('resize', () => {
            const newCellWidth = cellElement.offsetWidth;
            const newCellHeight = cellElement.offsetHeight;
            const newPosicaoLeft = cellElement.offsetLeft;
            const newPosicaoTop = cellElement.offsetTop;
    
            atualizarPosicao(newPosicaoLeft, newPosicaoTop, newCellWidth, newCellHeight); // Recalcular posição e tamanho ao redimensionar a tela
        });
    
        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = this.carregarFrames(nomeClasse, numberOfFrames);
    
        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }
    
        gifElement.style.transform = `scale(1.5)`;
    
        // Lógica de movimento para a esquerda
        //const fatorEscala = 1.5;
        let positionLeft = elemento.offsetLeft;
    
        function moveElement() {
            elemento.style.left = positionLeft + 'px';
            positionLeft -= 3;
        }
    
        setInterval(moveElement, 100);
        
        this.iniciarAnimacao(frames, gifElement);
    }
    
    

    static iniciarAnimacao(frames, gifElement) {
    let frameIndex = 0;
    const frameDuration = 50;

    const animationInterval = setInterval(() => {
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

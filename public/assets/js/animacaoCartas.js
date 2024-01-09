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
        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = this.carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        const gifElement = document.createElement('img');
        elemento.appendChild(gifElement);
        var tabuleiro = document.querySelector('.board');
        tabuleiro.appendChild(elemento);

        const posicaoLeft = cellElement.offsetLeft ;
        const posicaoTop = cellElement.offsetTop-50;

   
        //alert(posicaoLeft)
        elemento.style.position = 'absolute'
        elemento.style.top = `${posicaoTop}px`;
        elemento.style.left =  `${posicaoLeft}px`;
        const fatorEscala = 0.8;

        let positionLeft = posicaoLeft;

        function moveElement() {
         
          elemento.style.left = positionLeft + 'px';
          positionLeft += 10;
        }
        
        setInterval(moveElement, 100); 
        elemento.style.transform = `scale(${fatorEscala})`;

        this.iniciarAnimacao(frames, gifElement);
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
}

export default AnimacaoCartas;

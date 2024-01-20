export function iniciarAnimacaoTiro(cellElement, nomeClasse) {
    const tiroElement = document.createElement('img');
    let caminhoImagem;
    let numeroTiros = 1;

    if (nomeClasse === 'peashooter') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
    } else if (nomeClasse === 'showpea') {
        caminhoImagem = './assets/img/peashooter_tiro_gelo.gif';
    } else if (nomeClasse === 'repeater') {
        caminhoImagem = './assets/img/peashooter_tiro_2.gif';
        numeroTiros = 2; 
    }

    if (caminhoImagem) {
        for (let i = 0; i < numeroTiros; i++) {
            setTimeout(() => {
                const tiroElementClone = tiroElement.cloneNode();
                tiroElementClone.src = caminhoImagem;
                tiroElementClone.classList.add('tiro');
                cellElement.appendChild(tiroElementClone);

                let posicaoLeft = 20;
                const intervaloTiro = setInterval(() => {
                    if (posicaoLeft < 1000) {
                        posicaoLeft += 10;
                        tiroElementClone.style.left = `${posicaoLeft}%`;
                    } else {
                        clearInterval(intervaloTiro);
                        tiroElementClone.remove();
                    }
                }, 50);

                tiroElementClone.style.width = '20px';
                tiroElementClone.style.height = '20px';
            }, i * 500);
        }
    }
}
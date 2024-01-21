export function iniciarAnimacaoTiro(cellElement, nomeClasse) {

    const divTiroElement = document.createElement('div');
    const tiroElement = document.createElement('img');
    let caminhoImagem;
    let numeroTiros = 1;
    let main = document.querySelector('main')
    let tabuleiro = document.querySelector('.board')

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
                const divTiroElementClone = divTiroElement.cloneNode();
                tiroElementClone.src = caminhoImagem;
                divTiroElementClone.classList.add('tiro');
                divTiroElementClone.appendChild(tiroElementClone);
                cellElement.appendChild(divTiroElementClone);
              
                let posicaoLeft = 20; // Defina a posição inicial do tiro (ajuste conforme necessário)
             

                const intervaloTiro = setInterval(() => {
                    const tabuleiroRect = tabuleiro.getBoundingClientRect();
                    const cellRect = cellElement.getBoundingClientRect();
                    const tabuleiroWidth = tabuleiroRect.width;
                    const tiroWidth = (divTiroElementClone.offsetWidth / tabuleiroWidth) * 100; // Convertendo para porcentagem
    
                    const posicaoFinal = ((tabuleiroRect.left + tabuleiroWidth - cellRect.left - tiroWidth) / tabuleiroWidth) * 1000; // Convertendo para porcentagem
                
                    if (posicaoLeft < posicaoFinal) {
                        posicaoLeft += 7; // Ajuste para um movimento mais suave, você pode ajustar conforme necessário
                        divTiroElementClone.style.left = `${posicaoLeft}%`;
                    } else {
                        clearInterval(intervaloTiro);
                        divTiroElementClone.remove();
                    }
                }, 50);

                divTiroElementClone.style.width = '50%';
                divTiroElementClone.style.height = '25%';
              
            }, i * 500);
        }
    }
}
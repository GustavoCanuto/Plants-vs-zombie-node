class Tabuleiro {
    constructor(linhas, colunas, colunasPorLinha) {
        this.linhas = linhas;
        this.colunas = colunas;
        this.colunasPorLinha = colunasPorLinha;
        this.tabuleiro = this.criarTabuleiro();

    }

    criarTabuleiro() {
        const tabuleiro = new Array(this.linhas);
        for (let i = 0; i < this.linhas; i++) {
            tabuleiro[i] = new Array(this.colunas).fill('');
        }
        
       tabuleiro[0][0] = 'C';
       tabuleiro[1][0] = 'C';
       tabuleiro[2][0] = 'C';
       tabuleiro[3][0] = 'C';
       tabuleiro[4][0] = 'C';
        
       const divSeletorAzul = document.createElement('div');
       divSeletorAzul.id = 'seletorTabuleiroAzul';
       divSeletorAzul.innerHTML = 
       '<div class="superior-esquerdo-seletor-azul"></div>' +
        '<div class="superior-direito-seletor-azul"></div>' +
        '<div class="inferior-esquerdo-seletor-azul"></div>' +
        '<div class="inferior-direito-seletor-azul"></div>';

        const divSeletorAmarelo = document.createElement('div');
        divSeletorAmarelo.id = 'seletorTabuleiroAmarelo';
        divSeletorAmarelo.innerHTML = 
        '<div class="superior-esquerdo-seletor-Amarelo"></div>' +
         '<div class="superior-direito-seletor-Amarelo"></div>' +
         '<div class="inferior-esquerdo-seletor-Amarelo"></div>' +
         '<div class="inferior-direito-seletor-Amarelo"></div>';
    

       tabuleiro[0][9] =  divSeletorAzul;
       tabuleiro[0][1] =  divSeletorAmarelo;

        return tabuleiro;
    }


    mostrarTabuleiro() {
        const boardElement = document.getElementById('tabuleiroID');
        boardElement.innerHTML = '';

        for (let i = 0; i < this.linhas; i++) {
            let rowElement = document.createElement('div');
            rowElement.classList.add('row');
            rowElement.classList.add('linha' + (i + 1));
            rowElement.id = (i + 1);

            for (let j = 0; j < this.colunas; j++) {
                if (j % this.colunasPorLinha === 0 && j !== 0) {
                    boardElement.appendChild(rowElement);
                    rowElement = document.createElement('div');
                    rowElement.classList.add('row');
                    rowElement.classList.add('linha' + (i + 1));
                   
                }

                const cell = document.createElement('div');
                cell.classList.add('cell');

                if (i == 0 && j == 9) {
                    cell.id = 'cell1Zombie';

                }

                if (i == 0 && j == 1) {
                    cell.id = 'cell1Planta';

                }

                if (this.tabuleiro[i][j] instanceof HTMLElement) {
                    // Se a célula contiver um elemento HTML, adicioná-lo diretamente à célula
                    cell.appendChild(this.tabuleiro[i][j]);

                } else {
                    cell.textContent = this.tabuleiro[i][j];
                    // Adicionar classes com base no conteúdo da célula
                    if (this.tabuleiro[i][j] === 'P') {
                        cell.classList.add('plant');
                    } else if (this.tabuleiro[i][j] === 'Z') {
                        cell.classList.add('zombies');
                    } else if (this.tabuleiro[i][j] === 'C') {
                        cell.classList.add('grass-cutter');
                    }
                }
                rowElement.appendChild(cell);
            }

            boardElement.appendChild(rowElement);
        }
    }
}

const linhas = 5;
const colunas = 10;
const colunasPorLinha = 10;

const meuTabuleiro = new Tabuleiro(linhas, colunas, colunasPorLinha);
meuTabuleiro.mostrarTabuleiro();

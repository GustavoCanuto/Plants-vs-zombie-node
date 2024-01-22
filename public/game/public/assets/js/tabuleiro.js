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

            for (let j = 0; j < this.colunas; j++) {
                if (j % this.colunasPorLinha === 0 && j !== 0) {
                    boardElement.appendChild(rowElement);
                    rowElement = document.createElement('div');
                    rowElement.classList.add('row');
                    rowElement.classList.add('linha' + (i + 1));
                }

                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cellLinha${i+1}Coluna${j+1}`
                
                // if (i == 0 && j == 9) cell.id = 'cell1Zombie';
                // if (i == 0 && j == 1) cell.id = 'cell1Planta';

                if(j == 0)cell.classList.add('grass-cutter');
                
                if(j>0 && j<7) cell.classList.add('plant');
                
                else if (j>6) cell.classList.add('zombies');
           

                if (this.tabuleiro[i][j] instanceof HTMLElement) {
                    // Se a célula contiver um elemento HTML, adicioná-lo diretamente à célula
                    cell.appendChild(this.tabuleiro[i][j]);

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

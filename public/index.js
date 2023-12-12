const linhas = 5;
const colunas = 8;
const colunasPorLinha = 8; 

let tabuleiro = new Array(linhas);

for (let i = 0; i < linhas; i++) {
    tabuleiro[i] = new Array(colunas).fill('-');
}

function mostrarTabuleiro() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Limpar o conteúdo do tabuleiro antes de atualizar

    for (let i = 0; i < linhas; i++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let j = 0; j < colunas; j++) {
            if (j % colunasPorLinha === 0 && j !== 0) {
                boardElement.appendChild(rowElement);
                rowElement = document.createElement('div');
                rowElement.classList.add('row');
            }

            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (tabuleiro[i][j] === 'P') {
                cell.classList.add('plant');
            } else if (tabuleiro[i][j] === 'Z') {
                cell.classList.add('zombie');
            }

            cell.textContent = tabuleiro[i][j];
            rowElement.appendChild(cell);
        }

        boardElement.appendChild(rowElement);
    }
}

// Atualizando algumas células para representar plantas e zumbis
tabuleiro[0][0] = 'P';
tabuleiro[0][7] = 'Z';

// Exibindo o tabuleiro inicializado
mostrarTabuleiro();

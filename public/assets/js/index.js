const linhas = 5;
const colunas = 10;
const colunasPorLinha = 10;

let tabuleiro = new Array(linhas);

for (let i = 0; i < linhas; i++) {
    tabuleiro[i] = new Array(colunas).fill('');
}

function mostrarTabuleiro() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Limpar o conteúdo do tabuleiro antes de atualizar

    for (let i = 0; i < linhas; i++) {
        let rowElement = document.createElement('div');
        rowElement.classList.add('row');
        rowElement.classList.add('linha' + (i + 1)); // Adicionando classe para identificar a linha

        for (let j = 0; j < colunas; j++) {
            if (j % colunasPorLinha === 0 && j !== 0) {
                boardElement.appendChild(rowElement);
                rowElement = document.createElement('div');
                rowElement.classList.add('row');
                rowElement.classList.add('linha' + (i + 1)); // Adicionando classe para identificar a linha
            }

            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = tabuleiro[i][j];
            rowElement.appendChild(cell);
        }

        boardElement.appendChild(rowElement);
    }
}

mostrarTabuleiro();
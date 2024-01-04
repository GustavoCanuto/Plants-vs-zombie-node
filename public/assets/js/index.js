const linhas = 5;
const colunas = 10;
const colunasPorLinha = 10;

let tabuleiro = new Array(linhas);

for (let i = 0; i < linhas; i++) {
    tabuleiro[i] = new Array(colunas).fill('-');
}

// Adicionando carrinhos de grama em posições específicas
tabuleiro[0][0] = 'C';
tabuleiro[1][0] = 'C';
tabuleiro[2][0] = 'C';
tabuleiro[3][0] = 'C';
tabuleiro[4][0] = 'C';

function mostrarTabuleiro() {
    const boardElement = document.getElementById('tabuleiroID');
    boardElement.innerHTML = ''; // Limpar o conteúdo do tabuleiro antes de atualizar

    for (let i = 0; i < linhas; i++) {
        const rowElement = document.createElement('div');
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

            if(i==0 && j ==1){
                cell.id = 'cell1';

            }

            if (tabuleiro[i][j] instanceof HTMLElement) {
                // Se a célula contiver um elemento HTML, adicioná-lo diretamente à célula
                cell.appendChild(tabuleiro[i][j]);
            } else {
                // Caso contrário, tratar os valores normais como texto
                cell.textContent = tabuleiro[i][j];

                // Adicionar classes com base no conteúdo da célula
                if (tabuleiro[i][j] === 'P') {
                    cell.classList.add('plant');
                } else if (tabuleiro[i][j] === 'Z') {
                    cell.classList.add('zombies');
                } else if (tabuleiro[i][j] === 'C') {
                    cell.classList.add('grass-cutter');
                }
            }

            rowElement.appendChild(cell);
        }

        boardElement.appendChild(rowElement);
    }
}

// Crie um elemento HTML para a célula desejada
const divSeletor = document.createElement('div');
divSeletor.id = 'seletorTabuleiro';
divSeletor.innerHTML = '<div class="superior-esquerdo"></div>' +
                      '<div class="superior-direito"></div>' +
                      '<div class="inferior-esquerdo"></div>' +
                      '<div class="inferior-direito"></div>';

// Atribua o conteúdo criado à célula do tabuleiro
tabuleiro[0][1] = divSeletor;
tabuleiro[0][8] = 'Z';

mostrarTabuleiro();

// // Limitando o movimento do zombie somente na linha 1
// if (tabuleiro[0][8] === 'Z') {
//     const zombieCell = document.querySelector('.linha1 .cell:nth-child(8)'); // Encontra a célula do zombie na linha 1

//     // Verificando se há um carrinho de grama ('C') na mesma posição que o zombie
//     if (tabuleiro[0][8] === 'C') {
//         // Lógica para remover o zombie ou ações específicas ao ser morto pelo carrinho de grama
//         tabuleiro[0][8] = '-'; // Remover o zombie da posição
//     } else {
//         // Lógica de movimento padrão do zombie
//         zombieCell.textContent = '-';
//         tabuleiro[0][7] = '-';
//         tabuleiro[0][6] = 'Z';
//     }

//     mostrarTabuleiro(); // Atualizar o tabuleiro após o movimento
// }

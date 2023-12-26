document.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    moveContent(key);
});

var rowIndex = 1;
var cellIndex = 1;

function moveContent(direction) {
  
    rowIndex = celulaAtual.parentElement.classList[1].replace('linha', '');
    cellIndex = Array.from(celulaAtual.parentElement.children).indexOf(celulaAtual);

    switch (direction) {
        case 'arrowup':
            rowIndex = Math.max(1, parseInt(rowIndex) - 1);
            break;
        case 'arrowdown':
            rowIndex = Math.min(5, parseInt(rowIndex) + 1);

            break;
        case 'arrowleft':
            cellIndex = Math.max(1, cellIndex - 1);
         
            break;
        case 'arrowright':
            cellIndex = Math.min(9, cellIndex + 1);
          
            break;
        case 'arrowupleft':
            rowIndex = Math.max(1, parseInt(rowIndex) - 1);
            cellIndex = Math.max(1, cellIndex - 1);
            break;
        case 'arrowupright':
            rowIndex = Math.max(1, parseInt(rowIndex) - 1);
            cellIndex = Math.min(9, cellIndex + 1);
            break;
        case 'arrowdownleft':
            rowIndex = Math.min(5, parseInt(rowIndex) + 1);
            cellIndex = Math.max(1, cellIndex - 1);
            break;
        case 'arrowdownright':
            rowIndex = Math.min(5, parseInt(rowIndex) + 1);
            cellIndex = Math.min(9, cellIndex + 1);
            break;
    }

    var targetRow = document.querySelector('.linha' + rowIndex);
    var targetCell = targetRow.children[cellIndex];



    if (!targetCell.classList.contains('grass-cutter')) {


        setTimeout(function () {
            targetCell.appendChild(conteudo1);
            conteudo1.style.opacity = '1';
            centerImage(celulaAtual);
            console.log("Oi")
        }, 80);

        celulaAnterior = celulaAtual;
        celulaAtual = targetCell;

     

    }

    analogMoveX = 0;
    analogMoveY = 0;

    
}
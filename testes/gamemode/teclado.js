document.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    moveContent(key);
});

var rowIndex = 1;
var cellIndex = 1;

var moveTimeout;
var moveTimeout2;
var moveTimeout3;
var apagado = true;
var aux1;
var aux2;
var primeiraVez = true;

var verificadorPrev = true;

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

        

        celulaAnterior = celulaAtual;
        celulaAtual = targetCell;

        const prevConteudo2 = conteudo1.cloneNode(true);
        prevConteudo2.style.opacity = '0.11';

        if (aux1 && aux2 && !(aux1.contains(aux2))) {
            // alert("fui rapido")
           
            targetCell.appendChild(prevConteudo2);

        }

        aux1 = targetCell;
        aux2 = prevConteudo2;

        primeiraVez = false;

        clearTimeout(moveTimeout);
  
        moveTimeout = setTimeout(function () {

            

            centerImage(celulaAtual);

            targetCell.appendChild(conteudo1);

      

           
           

        }, 30);


          setTimeout(function () {

            if(targetCell.contains(prevConteudo2)){

            targetCell.removeChild(prevConteudo2);

            }

         }, 3);


    }

}





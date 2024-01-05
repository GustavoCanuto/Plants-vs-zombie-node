export function clickCelula(){

cells.forEach(function (cell) {

    
    if (!cell.classList.contains('grass-cutter')) {

    cell.addEventListener('click', function () {
        
    if (!cell.classList.contains('ocupado')) {

        const elemento = document.createElement('div');
        elemento.classList.add("personagem");
        var imgPersonagem = document.createElement('img');
        imgPersonagem.src = imgPreviaPersonagem.src;
        elemento.appendChild(imgPersonagem);
        cell.appendChild(elemento);
        elemento.closest('.cell').classList.add("ocupado");

        }
    }
    );
    }
});
}
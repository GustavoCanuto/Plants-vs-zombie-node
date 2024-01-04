

// const rect = casa.getBoundingClientRect();
// const centerX = rect.left + rect.width / 2;
// const centerY = rect.top + rect.height / 2;

// // Exibe a posição do centro em um alerta
// alert(`Posição do centro: (${centerX}, ${centerY})`);

// Crie uma instância da classe Planta

const casas = document.querySelectorAll(".cell");

casas.forEach(function (casa) {
    casa.addEventListener("click", function (event) {
        const minhaPlanta = new Planta('pea', './game/img/Peashooter.gif');
        const imgElement = document.createElement('img');
        imgElement.src = minhaPlanta.cursorTabuleiro;
        casa.appendChild(imgElement);

        minhaPlanta.iniciar(imgElement); 
    });
});
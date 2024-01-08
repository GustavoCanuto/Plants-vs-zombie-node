
var listaTeclasPlantas = {
    arrowUpPlanta: "arrowup",
    arrowDownPlanta: "arrowdown",
    arrowLeftPlanta: "arrowleft",
    arrowRightPlanta: "arrowright",
    cardEsquerdaPlanta: "1",
    cardDireitaPlanta: "2",
    colcoarPersonagemPlanta: "space",
};

var listaTeclasZombies = {
    arrowUpZombie: "w",
    arrowDownZombie: "s",
    arrowLeftZombie: "a",
    arrowRightZombie: "d",
    cardEsquerdaZombie: "q",
    cardDireitaZombie: "e",
    colcoarPersonagemZombie: "g"
}

function trocarTecla(id) {

    let botoesTrocar = document.querySelectorAll('.button-trocar');

    for (let i = 0; i < botoesTrocar.length; i++) {
        botoesTrocar[i].disabled = true;
    }

    const mensagem = `Pressione a tecla para configurar ${id}`;
    const divMensagemTecla = document.getElementById('mensagemTecla');
    divMensagemTecla.innerHTML = mensagem;

    document.addEventListener('keydown', function (event) {
        let teclaPresionada = event.key;
        divMensagemTecla.innerHTML = " ";

        for (let i = 0; i < botoesTrocar.length; i++) {
            botoesTrocar[i].disabled = false;
        }

        var tecla = document.getElementById(id).value;

        if (teclaPresionada == " ") {
            teclaPresionada = "space"
        }

        if (tecla != teclaPresionada) {

            if (Object.values(listaTeclasPlantas).includes(teclaPresionada)|| Object.values(listaTeclasZombies).includes(teclaPresionada)) {
                alert("Essa tecla já está sendo utilizada");
            } else {
                document.getElementById(id).value = teclaPresionada.toLowerCase();;
            }
        }

        atualizarTeclas();
    }, { once: true });
}

var teclaPersonalizada = false;

function gravarTecla() {
    atualizarTeclas();
    teclaPersonalizada = true;
    alert("gravado com sucesso");
}

function atualizarTeclas() {
    listaTeclasPlantas.arrowUpPlanta = document.getElementById('moveUp').value;
    listaTeclasPlantas.arrowDownPlanta = document.getElementById('moveDown').value;
    listaTeclasPlantas.arrowLeftPlanta = document.getElementById('moveLeft').value;
    listaTeclasPlantas.arrowRightPlanta = document.getElementById('moveRight').value;
    listaTeclasPlantas.cardEsquerdaPlanta = document.getElementById('moveCardLeft').value;
    listaTeclasPlantas.cardDireitaPlanta = document.getElementById('moveCardRight').value;
    listaTeclasPlantas.colcoarPersonagemPlanta = document.getElementById('colocarPersonagem').value;
}


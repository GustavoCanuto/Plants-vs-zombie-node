
var listaTeclas = {
    arrowUpPlanta: "arrowup",
    arrowDownPlanta: "arrowdown",
    arrowLeftPlanta: "arrowleft",
    arrowRightPlanta: "arrowright",
    cardEsquerdaPlanta: "1",
    cardDireitaPlanta: "2",
    colcoarPersonagemPlanta: "space",
    arrowUpZombie: "w",
    arrowDownZombie: "s",
    arrowLeftZombie: "a",
    arrowRightZombie: "d",
    cardEsquerdaZombie: "q",
    cardDireitaZombie: "e",
    colcoarPersonagemZombie: "g"
};

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

            if (Object.values(listaTeclas).includes(teclaPresionada)) {
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
    listaTeclas.arrowUpPlanta = document.getElementById('moveUp').value;
    listaTeclas.arrowDownPlanta = document.getElementById('moveDown').value;
    listaTeclas.arrowLeftPlanta = document.getElementById('moveLeft').value;
    listaTeclas.arrowRightPlanta = document.getElementById('moveRight').value;
    listaTeclas.cardEsquerdaPlanta = document.getElementById('moveCardLeft').value;
    listaTeclas.cardDireitaPlanta = document.getElementById('moveCardRight').value;
    listaTeclas.colcoarPersonagemPlanta = document.getElementById('colocarPersonagem').value;
}


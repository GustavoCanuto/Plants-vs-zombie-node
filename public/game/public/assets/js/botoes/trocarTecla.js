
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

var tecladoBloqueado = false;
var ladoPlayerGamePad = 0;

function trocarTecla(id) {

    let botoesTrocar = document.querySelectorAll('.button-trocar');

    for (let i = 0; i < botoesTrocar.length; i++) {
        botoesTrocar[i].disabled = true;
    }

    const mensagem = `Pressione a tecla para configurar ${id}`;
    const divMensagemTecla = document.getElementById('mensagemTecla');
    divMensagemTecla.innerHTML = mensagem;

    document.addEventListener('keydown', function (event) {

        if (tecladoBloqueado) {
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

                if (Object.values(listaTeclasPlantas).includes(teclaPresionada.toLowerCase()) || Object.values(listaTeclasZombies).includes(teclaPresionada.toLowerCase())) {
                    alert("Essa tecla já está sendo utilizada");
                } else {
                    document.getElementById(id).value = teclaPresionada.toLowerCase();
                }
            }

            atualizarTeclas(ladoConfigTeclado);
        }
    }, { once: true });
}

var teclaPersonalizada = false;

function gravarTecla() {
    atualizarTeclas(ladoConfigTeclado);
    teclaPersonalizada = true;
    alert("gravado com sucesso");
    tecladoBloqueado = false;
    voltarMenu();
    toggleConfig();
}

function atualizarTeclas(ladoConfigTeclado) {

    if(ladoConfigTeclado == 0){
    listaTeclasPlantas.arrowUpPlanta = document.getElementById('moveUp').value;
    listaTeclasPlantas.arrowDownPlanta = document.getElementById('moveDown').value;
    listaTeclasPlantas.arrowLeftPlanta = document.getElementById('moveLeft').value;
    listaTeclasPlantas.arrowRightPlanta = document.getElementById('moveRight').value;
    listaTeclasPlantas.cardEsquerdaPlanta = document.getElementById('moveCardLeft').value;
    listaTeclasPlantas.cardDireitaPlanta = document.getElementById('moveCardRight').value;
    listaTeclasPlantas.colcoarPersonagemPlanta = document.getElementById('colocarPersonagem').value;
    }
    else{
        listaTeclasZombies.arrowUpZombie = document.getElementById('moveUp').value;
        listaTeclasZombies.arrowDownZombie = document.getElementById('moveDown').value;
        listaTeclasZombies.arrowLeftZombie = document.getElementById('moveLeft').value;
        listaTeclasZombies.arrowRightZombie = document.getElementById('moveRight').value;
        listaTeclasZombies.cardEsquerdaZombie = document.getElementById('moveCardLeft').value;
        listaTeclasZombies.cardDireitaZombie = document.getElementById('moveCardRight').value;
        listaTeclasZombies.colcoarPersonagemZombie = document.getElementById('colocarPersonagem').value;

    }
}

function limparTeclas(ladoConfigTeclado) {

    if(ladoConfigTeclado == 1){
    listaTeclasPlantas.arrowUpPlanta = "";
    listaTeclasPlantas.arrowDownPlanta = "";
    listaTeclasPlantas.arrowLeftPlanta = "";
    listaTeclasPlantas.arrowRightPlanta = "";
    listaTeclasPlantas.cardEsquerdaPlanta = "";
    listaTeclasPlantas.cardDireitaPlanta = "";
    listaTeclasPlantas.colcoarPersonagemPlanta = "";
    }
    else{
        listaTeclasZombies.arrowUpZombie = "";
        listaTeclasZombies.arrowDownZombie = "";
        listaTeclasZombies.arrowLeftZombie = "";
        listaTeclasZombies.arrowRightZombie = "";
        listaTeclasZombies.cardEsquerdaZombie = "";
        listaTeclasZombies.cardDireitaZombie = "";
        listaTeclasZombies.colcoarPersonagemZombie = "";

    }
}


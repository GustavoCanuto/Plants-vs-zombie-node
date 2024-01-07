var listaTeclas = {
    arrowUpPlanta: "arrowup",
    arrowDownPlanta: "arrowdown",
    arrowLeftPlanta: "arrowleft",
    arrowRightPlanta: "arrowright",
    cardEsquerdaPlanta: "1",
    cardDireitaPlanta: "2",
    colcoarPersonagemPlanta: "space"
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

function gravarOpcaoMouse() {
    var opcoesMouse = document.getElementsByName('opcaoMouse');

    for (var i = 0; i < opcoesMouse.length; i++) {
        if (opcoesMouse[i].checked) {
           
           if(opcoesMouse[i].value == "plantas") LadoQueUsaMouse = 0;
           else if(opcoesMouse[i].value == "zombies") LadoQueUsaMouse = 1;
           else LadoQueUsaMouse = 2;

           break; 
        }
    }
    console.log("Lado que usa o mouse: " + LadoQueUsaMouse);
    alert("alterado com sucesso")
    chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
    cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo: cursorTabuleiroAzul;
    mouseEnterCelula();

}
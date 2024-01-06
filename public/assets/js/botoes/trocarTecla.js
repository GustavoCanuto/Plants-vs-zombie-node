function trocarTecla(id) {
    const mensagem = `Pressione a tecla para configurar ${id}`;
    document.getElementById(id).value = '';

    const divMensagemTecla = document.getElementById('mensagemTecla');
    divMensagemTecla.innerHTML = mensagem;

    document.addEventListener('keydown', function(event) {
        document.getElementById(id).value = event.key;
        divMensagemTecla.innerHTML = " ";
    }, { once: true });
}

var arrowUp;
var arrowDown;
var arrowLeft;
var arrowRight;
var teclaPersonalizada = false;

function gravarTecla(){

     arrowUp = document.getElementById('moveUp').value;
     arrowDown = document.getElementById('moveDown').value;
     arrowLeft = document.getElementById('moveLeft').value;
     arrowRight = document.getElementById('moveRight').value;

     teclaPersonalizada = true;

     alert("gravado com suscesso")
    

}
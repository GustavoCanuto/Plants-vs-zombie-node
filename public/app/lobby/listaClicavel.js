var elementosClicaveis = [];

function atualizarClicavel() {
    // Remove os ouvintes de evento antigos
    elementosClicaveis.forEach(function (elemento) {
        elemento.removeEventListener('click', elemento.clicavelHandler);
    });

    elementosClicaveis = document.querySelectorAll('.clicavel li');

    // Adiciona um ouvinte de evento a cada elemento li clicável
    elementosClicaveis.forEach(function (elemento) {

        elemento.clicavelHandler = function () {

            if (elemento.classList.contains('block')) {

                alert("usuario com convite pendente! não é possivel enviar solicitação")

            }
            else {

                //pegar posição lista     
                let listaOrdenada = Array.from(elemento.parentNode.children).filter(e => e.tagName === "LI");
                let indice = listaOrdenada.indexOf(elemento);
                var numero = indice + 1;

                //pega nome do usuario
                let partes = elemento.textContent.split('|');
                let nome = partes[0].trim();

                //cria convite
                let conviteEnviado = `<p class="${elemento.id}xy ${elemento.id}" > Convite Enviado para <strong>${nome} </strong> (posição ${numero}) ! Aguarde o retorno <button class="cancelarConvite" style="color: red; font-size: 1vw; " onclick="cancelarPendente(this)">Cancelar</button> </p>`;

                $(`#mandadoSolitacao`).append(conviteEnviado);

                //envia convite socket
                socket.emit('convidarParaJogar', elemento.id);

                $(`#${elemento.id}`).closest('ol').removeClass("clicavel");

                atualizarClicavel();

            }

        };

        elemento.addEventListener('click', elemento.clicavelHandler);
       
    });
}
//cancelar pendente 
function cancelarPendente(esse) {

    let elementoPai = $(esse).closest('p');

    // Obtenha o id do elemento pai
    let idDoElementoPai = elementoPai.attr('class');

    let partes = idDoElementoPai.split(' ');
    let idPai = partes[1].trim();

    let idSocket = socket.id;

    let elementosSeraoCancelado = { id1: idPai, id2: idSocket }
   
    socket.emit('cancelarPendente', elementosSeraoCancelado);

    $(`.${idDoElementoPai}xy`).remove();

    $(`#${idPai}`).closest('ol').addClass("clicavel");
    atualizarClicavel();

}

//aceitar solicitacao 
function aceitarSolicitacao(esse) {

    let elementoPai = $(esse).closest('p');

    // Obtenha o id do elemento pai
    let idDoElementoPai = elementoPai.attr('class');

    let partes = idDoElementoPai.split(' ');
    let idPai = partes[1].trim();

    let idSocket = socket.id;

    let elementosIraoJogar = { id1: idPai, id2: idSocket }
    //alert(idPai +" "+idSocket);
    socket.emit('aceitarConvite', elementosIraoJogar);

    //retirar da lista
}
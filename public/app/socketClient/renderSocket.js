//cria usuario plants
function renderPlant(usuario) {
  let clienteLista = document.createElement("li");

  let pontuacaoUsuario;
  if (usuario.ipMaquina.length >= 3) {
    clienteLista.classList.add('textoPlantas');
  } 

  clienteLista.textContent = usuario.nome;
  clienteLista.id = usuario.socketID;
  $(".plants").append(clienteLista);

  atualizarClicavel();

}

//cria usuario zombies
function renderZombie(usuario) {
  let clienteLista = document.createElement("li");

  let pontuacaoUsuario;
  if (usuario.ipMaquina.length >= 7) {
    clienteLista.classList.add('textoZombies');
  }

  clienteLista.textContent = usuario.nome;
  clienteLista.id = usuario.socketID;
  $(".zombies").append(clienteLista);

  atualizarClicavel();
}

//retirar usuario desconectado da Lista 
function renderusuarioDisconnect(usuario) {

  let liParaRemover = $("#" + usuario);
  liParaRemover.remove();

}

//renderizar convite
function renderConvite(usuario) {

  $('.menssagens').css('display','block');
  $('.efeito').css('display','block');
 // alert("teste")

  let convite = `
    <p class="${usuario.id}xy ${usuario.id} mensagem-convites"><strong>${usuario.nome} #${usuario.posicao}</strong>  convidou para jogar
        <button class = "aceitaSolicitacao" onclick="aceitarSolicitacao(this)">&#10004;</button>
        <button class = "recusarSolicitacao" onclick="cancelarPendente(this)">&#10007;</button>
        </p>  `;

  document.getElementById("convite").innerHTML += convite;

  //retirar click 
  // Remover classe "clicavel" do elemento pai pelo ID
  $(`#${usuario.id}`).closest('ol').removeClass("clicavel");
  atualizarClicavel();
}

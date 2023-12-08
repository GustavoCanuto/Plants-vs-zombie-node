//cria usuario plants
function renderPlant(usuario) {
  let clienteLista = document.createElement("li");

  let pontuacaoUsuario;
  if (usuario.ipMaquina.length >= 3) {
    pontuacaoUsuario =  usuario.ipMaquina;
    clienteLista.style.color = "red";

  } else {
    pontuacaoUsuario = " 0 pontos (Você) "
  }

  clienteLista.textContent = usuario.nome + " | " + pontuacaoUsuario;
  clienteLista.id = usuario.socketID;
  $(".plants").append(clienteLista);

  atualizarClicavel();

}

//cria usuario zombies
function renderZombie(usuario) {
  let clienteLista = document.createElement("li");

  let pontuacaoUsuario;
  if (usuario.ipMaquina.length >= 7) {
    pontuacaoUsuario = usuario.ipMaquina;
    clienteLista.style.color = "blue";

  } else {
    pontuacaoUsuario = " 0 pontos (Você) "
  }

  clienteLista.textContent = usuario.nome + " | " + pontuacaoUsuario;
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

  let convite = `
    <p class="${usuario.id}xy ${usuario.id}">Solicitação de <strong>${usuario.nome}  </strong> (posição ${usuario.posicao}) para jogar
        <button style="color: green; font-size: 1vw;" onclick="aceitarSolicitacao(this)">Aceitar</button>
        <button style="color: red; font-size: 1vw;" onclick="cancelarPendente(this)">Recusar</button>
    </p> `;

  document.getElementById("convite").innerHTML += convite;

  //retirar click 
  // Remover classe "clicavel" do elemento pai pelo ID
  $(`#${usuario.id}`).closest('ol').removeClass("clicavel");
  atualizarClicavel();
}

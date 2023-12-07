  //cria usuario plants
  function renderPlant(message) {
    let clienteLista = document.createElement("li");

    let maquinaUsuario;
    if (message.ipMaquina.length >= 7){
      maquinaUsuario = "IP máquina: " + (message.ipMaquina).substring(7);
      clienteLista.style.color = "red";

    }else{
      maquinaUsuario = " (Você) "
    }

    clienteLista.textContent = message.nome + " | " + maquinaUsuario;
    clienteLista.id = message.socketID;
    $(".plants").append(clienteLista);

    atualizarClicavel();
  

  }

//cria usuario zombies
function renderZombie(message) {
      let clienteLista = document.createElement("li");
  
      let maquinaUsuario;
      if (message.ipMaquina.length >= 7){
        maquinaUsuario = "IP máquina: " + (message.ipMaquina).substring(7);
        clienteLista.style.color = "blue";

      }else{
        maquinaUsuario = "(Você)"
      }
  
      clienteLista.textContent = message.nome + " | " + maquinaUsuario;
      clienteLista.id = message.socketID;
      $(".zombies").append(clienteLista);
  
      atualizarClicavel();

    }

  //retirar usuario desconectado da Lista 
  function renderMessageDisconnect(message) {

    let liParaRemover = $("#" + message);
    // let liParaRemover = $(".lista-conectados li:contains('" + message + "')");

    liParaRemover.remove();
  }

  //renderizar convite
  function renderConvite(usuario){

   let convite = `
    <p class="${usuario.id}xy ${usuario.id}">Solicitação de <strong>${usuario.nome}  </strong> (posição ${usuario.posicao}) para jogar
        <button style="color: green; font-size: 1vw;" onclick="aceitarSolicitacao()">Aceitar</button>
        <button style="color: red; font-size: 1vw;" onclick="cancelarPendente(this)">Recusar</button>
    </p>
  

`;

  document.getElementById("convite").innerHTML += convite;

   //retirar click 
  // Remover classe "clicavel" do elemento pai pelo ID
 // $(`#${usuario.id}`).closest('ol').removeClass("clicavel");
 // atualizarClicavel();


  }

  //render usuario Aguardando retorno solicitação 
  function renderAguardandoRetorno(){

  }
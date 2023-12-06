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
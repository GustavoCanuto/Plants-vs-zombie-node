function toggleConfig() {
  tecladoBloqueado = false;
  voltarMenu();
    let configDiv = document.querySelector('.config');
    if (configDiv.style.display === 'none' || configDiv.style.display === '') {
      configDiv.style.display = 'block';
      if(local) $('.mouseJogador').css("display", "block");
      else $('.mouseJogador').css("display", "none");
    } else {
      configDiv.style.display = 'none';
    }
  }


  function voltarLobby() {
    window.location.href = `/?nome=${nome}&lado=${ladoJogador}`
  }
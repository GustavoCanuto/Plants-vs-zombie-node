
let ladoConfigTeclado;
//controle Planta
function carregarControle(lado) {
  // Esconder os botões
  $(".config button").css("display", "none");
  $(".mouseJogador").css("display", "none");

  ladoConfigTeclado = lado;

  // Carregar o conteúdo do controlePlanta.html na div telaAjax
  $(".telaAjax").load("./assets/js/ajax/personalizaTeclado.html", function () {
    // Callback executado após o carregamento completo do conteúdo
    if (lado == 0) atualizarValueTeclasPlantas();
    else atualizarValueTeclasZombies();

    tecladoBloqueado = true;
  });
}



// Função para voltar e mostrar os botões novamente
function voltarMenu() {
  // Limpar o conteúdo da div telaAjax
  $(".telaAjax").html("");
  tecladoBloqueado = false;
  // Mostrar os botões novamente
  $(".config button").css("display", "block");
  if (local) $('.mouseJogador').css("display", "block");
  else $('.mouseJogador').css("display", "none");
  $("#mensagemTecla").html("");
}

// Atribuir a função carregarControlePlantas ao clique do botão "Controle Plantas"
$("#btnControlePlantas").on("click", () => carregarControle(0));
$("#btnControleZombies").on("click", () => carregarControle(1));


function atualizarValueTeclasPlantas() {
  document.getElementById("moveUp").value = listaTeclasPlantas.arrowUpPlanta;
  document.getElementById("moveDown").value = listaTeclasPlantas.arrowDownPlanta;
  document.getElementById("moveLeft").value = listaTeclasPlantas.arrowLeftPlanta;
  document.getElementById("moveRight").value = listaTeclasPlantas.arrowRightPlanta;
  document.getElementById("moveCardLeft").value = listaTeclasPlantas.cardEsquerdaPlanta;
  document.getElementById("moveCardRight").value = listaTeclasPlantas.cardDireitaPlanta;
  document.getElementById("colocarPersonagem").value = listaTeclasPlantas.colcoarPersonagemPlanta;

}

function atualizarValueTeclasZombies() {
  document.getElementById("moveUp").value = listaTeclasZombies.arrowUpZombie;
  document.getElementById("moveDown").value = listaTeclasZombies.arrowDownZombie;
  document.getElementById("moveLeft").value = listaTeclasZombies.arrowLeftZombie;
  document.getElementById("moveRight").value = listaTeclasZombies.arrowRightZombie;
  document.getElementById("moveCardLeft").value = listaTeclasZombies.cardEsquerdaZombie;
  document.getElementById("moveCardRight").value = listaTeclasZombies.cardDireitaZombie;
  document.getElementById("colocarPersonagem").value = listaTeclasZombies.colcoarPersonagemZombie;

}



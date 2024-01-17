function carregarControlePlantas() {
    // Esconder os botões
    $(".config button").css("display", "none");
    $(".mouseJogador").css("display", "none");
    

    // Carregar o conteúdo do controlePlanta.html na div telaAjax
    $(".telaAjax").load("controlePlanta.html", function() {
        // Callback executado após o carregamento completo do conteúdo
        atualizarValueTeclas();
    });
  }

  // Função para voltar e mostrar os botões novamente
  function voltarMenu() {
    // Limpar o conteúdo da div telaAjax
    $(".telaAjax").html("");

    // Mostrar os botões novamente
    $(".config button").css("display", "block");
    $(".mouseJogador").css("display", "block");
  }

  // Atribuir a função carregarControlePlantas ao clique do botão "Controle Plantas"
  $("#btnControlePlantas").on("click", carregarControlePlantas);


  function atualizarValueTeclas() {
    document.getElementById("moveUp").value = listaTeclasPlantas.arrowUpPlanta;
    document.getElementById("moveDown").value = listaTeclasPlantas.arrowDownPlanta;
    document.getElementById("moveLeft").value = listaTeclasPlantas.arrowLeftPlanta;
    document.getElementById("moveRight").value = listaTeclasPlantas.arrowRightPlanta;
    document.getElementById("moveCardLeft").value = listaTeclasPlantas.cardEsquerdaPlanta;
    document.getElementById("moveCardRight").value = listaTeclasPlantas.cardDireitaPlanta;
    document.getElementById("colocarPersonagem").value = listaTeclasPlantas.colcoarPersonagemPlanta;
   
}
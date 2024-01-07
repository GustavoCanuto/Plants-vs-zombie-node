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
    document.getElementById("moveUp").value = listaTeclas.arrowUpPlanta;
    document.getElementById("moveDown").value = listaTeclas.arrowDownPlanta;
    document.getElementById("moveLeft").value = listaTeclas.arrowLeftPlanta;
    document.getElementById("moveRight").value = listaTeclas.arrowRightPlanta;
    document.getElementById("moveCardLeft").value = listaTeclas.cardEsquerdaPlanta;
    document.getElementById("moveCardRight").value = listaTeclas.cardDireitaPlanta;
    document.getElementById("colocarPersonagem").value = listaTeclas.colcoarPersonagemPlanta;
   
}
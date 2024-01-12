

self.addEventListener('message', function (e) {
  var porcentagemRecarregado = 100;
  
  //recebe mensagem do client
    var tempoRecarga = e.data.tempoRecarga;
  
    setInterval(function () {
     // faz conta
     //devolve para o client
      self.postMessage({ porcentagem: porcentagemRecarregado });
    }, tempoRecarga / 100);
  
  });
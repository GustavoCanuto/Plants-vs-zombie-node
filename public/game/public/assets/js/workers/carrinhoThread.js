let intervaloCarrinho;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startCarrinho') {
        //console.log("thread carrinho começou")

      intervaloCarrinho = setInterval(() => {

            self.postMessage({ comando: "carrinhoProcessado"});
            
        }, 100);
    }

    if (e.data.comando === 'stopCarrinho') {
        //console.log("thread carrinho parou")
        clearInterval(intervaloCarrinho);
    }
});
 
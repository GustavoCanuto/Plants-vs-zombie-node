let intervaloCarrinho;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startCarrinho') {


        intervaloCarrinho = setInterval(() => {

            self.postMessage({ comando: "carrinhoProcessado" });

        }, 100);
    }

    if (e.data.comando === 'stopCarrinho') {

        clearInterval(intervaloCarrinho);
    }
});

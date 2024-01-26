let carrinhoAndando;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startCarrinhoAndando') {
       // console.log("thread carrinho Andando começou")

        carrinhoAndando = setInterval(() => {

            self.postMessage({ comando: "carrinhoAndandoProcessado"});
            
        }, 70);
    }

    if (e.data.comando === 'stopCarrinhoAndando') {
     //   console.log("thread carrinho Andando parou")
        clearInterval(carrinhoAndando);
    }
});
 
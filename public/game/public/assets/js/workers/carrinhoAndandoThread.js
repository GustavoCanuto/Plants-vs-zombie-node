let carrinhoAndando;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startCarrinhoAndando') {
    

        carrinhoAndando = setInterval(() => {

            self.postMessage({ comando: "carrinhoAndandoProcessado"});
            
        }, 70);
    }

    if (e.data.comando === 'stopCarrinhoAndando') {

        clearInterval(carrinhoAndando);
    }
});
 
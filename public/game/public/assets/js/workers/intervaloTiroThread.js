let intervaloTiro;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startIntervaloTiro') {

        intervaloTiro = setInterval(() => {
            self.postMessage({ comando: "intervaloTiroProcessado" });
        }, 50);
    }

    if (e.data.comando === 'stopIntervaloTiro') {

        clearInterval(intervaloTiro);
    }
});

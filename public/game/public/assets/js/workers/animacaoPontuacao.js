

let setIntervalSolCaindo = [];

self.addEventListener('message', function (e) {

    if (e.data.comando === 'velocidadePontuacao') {
        setIntervalSolCaindo[e.data.lado] = setInterval(function () {
            self.postMessage({ comando: "velocidadePontuacaoProcessado", lado: e.data.lado });

        }, 130);
    }

    if (e.data.comando === 'stopVelocidadePontuacao') {

        clearInterval(setIntervalSolCaindo[e.data.lado]);
    }
});

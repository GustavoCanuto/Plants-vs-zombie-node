self.addEventListener('message', function (e) {

    if (e.data.comando === 'solCaindo') {
        setInterval(function () {
            self.postMessage("pontuacaoSolCaindoProcessado");
        }, 10000);
    }

    if (e.data.comando === 'cerebroCaindo') {
        setInterval(function () {
            self.postMessage("pontuacaoCerebroCaindoProcessado");
        }, 11000);
    }

});

let sequenciaTiro;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startSequenciaTiro') {

        setTimeout(() => {

            self.postMessage({ comando: "sequenciaTiroProcessado" });

        }, 500);

        sequenciaTiro = setInterval(() => {

            self.postMessage({ comando: "sequenciaTiroProcessado" });
            primeiroTiro = false;

        }, 4000);
    }

    if (e.data.comando === 'stopSequenciaTiro') {

        clearInterval(sequenciaTiro);
    }
});

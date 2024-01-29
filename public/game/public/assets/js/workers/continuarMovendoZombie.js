let tempoRestante = 5;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startContinuaMovendoZombie') {


        zombieAtacando = setInterval(() => {
            tempoRestante--;
            self.postMessage({ comando: "continuaMovendoZombieProcessado", tempoRestante: tempoRestante });
        }, 100);
    }

    if (e.data.comando === 'stopContinuaMovendoZombie') {

        clearInterval(zombieAtacando);
    }
});

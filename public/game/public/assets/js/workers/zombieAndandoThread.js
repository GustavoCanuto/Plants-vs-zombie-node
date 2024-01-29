let zombieAndando;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startZombieAndando') {
       

        zombieAtacando = setInterval(() => {

            self.postMessage({ comando: "zombieAndandoProcessado"});
            
        }, 100);
    }

    if (e.data.comando === 'stopZombieAndando') {

        clearInterval(zombieAtacando);
    }
});
 
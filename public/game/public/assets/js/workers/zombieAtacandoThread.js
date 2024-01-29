let zombieAtacando;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startZombieAtacando') {


        zombieAtacando = setInterval(() => {

            self.postMessage({ comando: "zombieAtacandoProcessado"});
            
        }, 1000);
    }

    if (e.data.comando === 'stopZombieAtacando') {
    
        clearInterval(zombieAtacando);
    }
});
 
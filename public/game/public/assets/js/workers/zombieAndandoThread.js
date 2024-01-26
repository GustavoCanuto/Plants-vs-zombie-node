let zombieAndando;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startZombieAndando') {
        //console.log("thread zombie Andando começou")

        zombieAtacando = setInterval(() => {

            self.postMessage({ comando: "zombieAndandoProcessado"});
            
        }, 100);
    }

    if (e.data.comando === 'stopZombieAndando') {
       // console.log("thread sequencia tiro parou")
        clearInterval(zombieAtacando);
    }
});
 
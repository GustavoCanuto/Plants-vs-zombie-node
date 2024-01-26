let zombieAtacando;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startZombieAtacando') {
      //  console.log("thread zombie Atacando começou")

        zombieAtacando = setInterval(() => {

            self.postMessage({ comando: "zombieAtacandoProcessado"});
            
        }, 1000);
    }

    if (e.data.comando === 'stopZombieAtacando') {
      //  console.log("thread Atacando parou")
        clearInterval(zombieAtacando);
    }
});
 
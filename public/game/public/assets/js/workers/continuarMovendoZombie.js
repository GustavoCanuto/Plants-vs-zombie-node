let tempoRestante = 5;
    
self.addEventListener('message', function (e) {

    if (e.data.comando === 'startContinuaMovendoZombie') {
       // console.log("thread continuar Movendo Zombie começou")

        zombieAtacando = setInterval(() => {
            tempoRestante--;
            self.postMessage({ comando: "continuaMovendoZombieProcessado", tempoRestante: tempoRestante});
        }, 100);
    }

    if (e.data.comando === 'stopContinuaMovendoZombie') {
      //  console.log("thread continuar Movendo Zombie Para")
        clearInterval(zombieAtacando);
    }
});
 
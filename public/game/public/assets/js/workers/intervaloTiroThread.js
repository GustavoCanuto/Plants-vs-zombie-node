let intervaloTiro;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startIntervaloTiro') {
      //  console.log("thread intervalo tiro começou")
         intervaloTiro = setInterval(() => {
            self.postMessage({ comando: "intervaloTiroProcessado"});
        }, 50);
    }

    if (e.data.comando === 'stopIntervaloTiro') {
       // console.log("thread intervalo tiro parou")
        clearInterval(intervaloTiro);
    }
});

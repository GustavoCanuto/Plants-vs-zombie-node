
let setIntervalRecarga = []; 

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startRecarga') {
        setIntervalRecarga[e.data.lado] = setInterval(function () {
            self.postMessage({ comando: "recargarProcessada", lado: e.data.lado });
    
        }, e.data.tempoRecarga);
    }

    if (e.data.comando === 'stopRecarga') {
     
        clearInterval(setIntervalRecarga[e.data.lado]);
    }
});

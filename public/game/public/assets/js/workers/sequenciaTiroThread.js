
let sequenciaTiro;

self.addEventListener('message', function (e) {

    if (e.data.comando === 'startSequenciaTiro') {
      //  console.log("thread sequencia tiro começou")

        setTimeout(() => {

         self.postMessage({ comando: "sequenciaTiroProcessado"});

        },500);

           sequenciaTiro = setInterval(() => {
       
            self.postMessage({ comando: "sequenciaTiroProcessado"});
            primeiroTiro = false;
            
        }, 4000);
    }

    if (e.data.comando === 'stopSequenciaTiro') {
       // console.log("thread sequencia tiro parou")
        clearInterval(sequenciaTiro);
    }
});

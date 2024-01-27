function loadingPersonalizado(lado){

    const loadingPlanta = document.querySelector(".loading-planta")
    const loadingZombie = document.querySelector(".loading-zombie")
    const loadingNormal = document.querySelector(".loading-spinner")
    const textoCarregando = document.querySelector(".loading-personalizado") 
    textoCarregando.style.display = "flex";
    document.getElementById("loadingOverlay").style.display = "flex";
   


    if(lado==0){
       //alert("lado 0")
    loadingZombie.style.display = "none"
    loadingNormal.style.display = "none"
    loadingPlanta.style.display = "block"

    }else if(lado==1){
       // alert("lado 1")
    loadingNormal.style.display = "none"
    loadingPlanta.style.display = "none"
    loadingZombie.style.display = "block"

    }else{
       // alert("lado null")
        loadingPlanta.style.display = "none"
        loadingZombie.style.display = "none"
        textoCarregando.style.display = "none"
        loadingNormal.style.display = "block"

    }
    
    setTimeout(() => {
    // Lista de URLs das imagens
    var imageUrls = ["./assets/img/public_assets_img_brackground_gameLobby2.png", 
     "./assets/img/public_assets_img_brackground_gameLobby2Antig.webp"
    ];

    // Função para pré-carregar uma imagem
    function preloadImage(url) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve();
            };
            img.onerror = function () {
                reject();
            };
            img.src = url;
        });
    }

    // Array de Promises para todas as imagens
    var preloadPromises = imageUrls.map(function (url) {
        return preloadImage(url);
    });

    // Quando todas as Promises forem resolvidas (imagens carregadas)
    Promise.all(preloadPromises).then(function () {
        // Esconder a tela de loading e mostrar a página principal
        document.getElementById("loadingOverlay").style.display = "none";
        if(!local){
        socket2.emit('iniciarSala', sala, ladoJogador)
        }

    }).catch(function () {
        // Lidar com erro de carregamento de imagem, se necessário
        console.error("Erro ao carregar uma ou mais imagens.");
    });

}, 800);

}
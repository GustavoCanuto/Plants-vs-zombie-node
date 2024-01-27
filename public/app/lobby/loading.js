
document.addEventListener("DOMContentLoaded", function () {

        // Lista de URLs das imagens
        var imageUrls = ["./assets/img/brackground/menu-principal2.webp", 
        "./assets/img/dialog/usuarioDialog.webp",
        "./assets/img/chooseSide/plantSide.webp",
        "./assets/img/chooseSide/zombieSide.webp"
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

        }).catch(function () {
            // Lidar com erro de carregamento de imagem, se necessário
            console.error("Erro ao carregar uma ou mais imagens.");
        });



});
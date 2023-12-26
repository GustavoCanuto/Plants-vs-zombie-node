
        // controle pelo mouse
        var main = document.querySelector('main');

        var imagem = document.getElementById('follow-image');
        var conteudo1 = document.getElementById('conteudo1');
        var conteudo2 = document.getElementById('conteudo2');
        var cells = document.querySelectorAll('.cell');
        var timeoutId;
        var celulaAtual = document.getElementById('cell1');
        var celulaAnterior = document.getElementById('cell1');
        let verificador;
        let verificador2 = 0;
        var contador = 0;
        var carrinho = false;

        var centerImage = function (container) {

            if (!container.classList.contains('grass-cutter')) {

                var rect = container.getBoundingClientRect();
                var mainRect = main.getBoundingClientRect(); // Adicione isso para obter as coordenadas do main

                var xPercentage = ((rect.left - mainRect.left + rect.width / 2 - imagem.width / 2) / mainRect.width) * 100;
                var yPercentage = ((rect.top - mainRect.top) / mainRect.height) * 100;

                imagem.style.left = xPercentage + '%';
                imagem.style.top = yPercentage + '%';

                carrinho = false;

            }
        };

        centerImage(celulaAtual);

        cells.forEach(function (cell) {
            cell.addEventListener('mouseenter', function () {
                // Mova a div conteudo1 para a célula atual

                celulaAtual = cell;

                if (!celulaAtual.classList.contains('grass-cutter')) {

                    verificador = 1;
                    const prevConteudo1 = conteudo1.cloneNode(true);

                    setTimeout(function () {
                    cell.appendChild(prevConteudo1);

                  
                    prevConteudo1.style.opacity = '0.3';
                }, 130);

                    setTimeout(function () {
                        cell.appendChild(conteudo1);
                        verificador = 2;
                        conteudo1.style.opacity = '1';
                        cell.removeChild(prevConteudo1);
                    }, 150);

                    celulaAnterior = celulaAtual;

                }

            });
        });

        document.body.addEventListener('mousemove', function (e) {

            imagem.style.transition = 'left 0.05s, top 0.05s';

            var xPercentage = (e.clientX / window.innerWidth) * 100;
            var yPercentage = (e.clientY / window.innerHeight) * 100;


            var rect1 = conteudo2.getBoundingClientRect();

            var isInsideContent1 = (
                e.clientX >= rect1.left &&
                e.clientX <= rect1.right &&
                e.clientY >= rect1.top &&
                e.clientY <= rect1.bottom
            );

            if (isInsideContent1) {
                document.body.style.cursor = 'none';
                imagem.style.left = xPercentage + '%';
                imagem.style.top = yPercentage + '%';

                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {

                    centerImage(celulaAtual);

                }, 400);

            } else {
                document.body.style.cursor = 'pointer';

                centerImage(celulaAtual);


                // Se o mouse parar por 500 milissegundos, centralize conteudo1

            }

            if (celulaAtual.classList.contains('grass-cutter')) {
                centerImage(celulaAnterior);
                document.body.style.cursor = 'pointer';
            }



        });
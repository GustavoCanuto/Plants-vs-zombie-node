import { criarPontos } from "../pontuacao.js";

export function iniciarAnimacaoPontuacao(cellElement, nomeClasse, idNovoPersonagem) {

    const divPontosElement = document.createElement('div');
    const pontosElement = document.createElement('img');
    let caminhoImagem;
    let tamanho;
    let lado;
    let opacity;
    let brilho;

    if (nomeClasse === 'sunflower') {
        caminhoImagem = './assets/img/pontuacao/Sun.gif';
        tamanho = '70%';
        lado = 0;
        opacity = "90%"
        brilho = 'brightness(1.8)'
    } else if (nomeClasse === 'cardtombstone') {
        caminhoImagem = './assets/img/pontuacao/cerebroPotos.webp';
        tamanho = '50%';
        lado = 1;
        opacity = "75%"
        brilho = 'brightness(1.8)'

    }

    if (caminhoImagem) {


        let gerandoPontuacao = setInterval(() => {

            const pontosElementClone = pontosElement.cloneNode();
            let divPontosElementClone = divPontosElement.cloneNode();
            pontosElementClone.src = caminhoImagem;
            divPontosElementClone.classList.add('pontos');
            divPontosElementClone.appendChild(pontosElementClone);

            cellElement.style.transition = 'filter 1.8s ease';
            cellElement.style.filter = brilho
            let verificaFilho;
            let eleminado;
            let eleminadoPorTempo;
            let setTimeoutConflito;
            let jaColidiuUmaVez;

            setTimeout(() => {

                cellElement.appendChild(divPontosElementClone);

                let verificaConflito = setInterval(() => {


                    if (lado == 0) verificaFilho = cellElement.querySelector('.tamanho-sunflower')
                    else verificaFilho = cellElement.querySelector('.tamanho-cardtombstone')

                    if (!verificaFilho) {
                        if(cellElement.contains(divPontosElementClone))cellElement.removeChild(divPontosElementClone);
                        clearInterval(gerandoPontuacao)
                        clearInterval(verificaConflito)
                        clearTimeout(setTimeoutConflito)

                    }

                    if (!eleminado) {
                        //verifique se cell contem elemento 
                        var chaveLado = Object.keys(celulaAtual[lado]);

                        if (verificaColisaoPersonagemPontos(celulaAtual[lado][chaveLado], cellElement)) {

                            eleminado = true;

                            let board = document.querySelector('.board')
                            let cellRect = cellElement.getBoundingClientRect();
                            let boardRect = board.getBoundingClientRect();

                            // Calcule as coordenadas relativas
                            let relativeTop = cellRect.top - boardRect.top;
                            let relativeLeft = cellRect.left - boardRect.left;



                            // Ajuste as coordenadas de divPontosElementClone

                            let clonePontos = divPontosElementClone.cloneNode();
                            let imgPontos = pontosElementClone.cloneNode();
                            imgPontos.style.width = "8%"
                            clonePontos.appendChild(imgPontos)

                            if(cellElement.contains(divPontosElementClone))cellElement.removeChild(divPontosElementClone);

                            clonePontos.style.top = `${relativeTop}px`;
                            clonePontos.style.left = `${relativeLeft}px`;


                            board.appendChild(clonePontos);


                            setTimeoutConflito = setTimeout(() => {

                                clonePontos.style.transition = 'all 0.5s ease'
                                clonePontos.style.top = lado == 0 ? "-21%" : "-21%";
                                clonePontos.style.left = lado == 0 ? "12%" : "105%";
                                setTimeout(() => {
                                    clonePontos.style.opacity = 0;
                                    setTimeout(() => {
                                        if (clonePontos) {
                                            board.removeChild(clonePontos);
                                            clearInterval(verificaConflito)
                                        }
                                    }, 600);
                                }, 400);

                                //socket 
                                criarPontos(lado);
                                socket2.emit('atualizaPontuacao', lado, sala)

                                clearInterval(verificaConflito)
                            }, 50);


                        }


                    }
                }, 130);

                divPontosElementClone.style.top = `50%`;
                divPontosElementClone.style.left = `25%`;

                setTimeout(() => {
                    divPontosElementClone.style.top = `-15%`;
                    divPontosElementClone.style.left = `${Math.floor(Math.random() * 58) + 1}%`; //randon 1 a 60
                    divPontosElementClone.style.transform = "scale(1.15)"
                    divPontosElementClone.style.filter = "brightness(1.2)"


                }, 50);

                setTimeout(() => {
                    cellElement.style.filter = 'brightness(1)'
                    divPontosElementClone.style.transition = "all 3s ease"
                    divPontosElementClone.style.top = `40%`;
                    divPontosElementClone.style.left = `${Math.floor(Math.random() * 39) + 1}%`; //randon 1 a 40
                    divPontosElementClone.style.opacity = opacity

                }, 1400);

                setTimeout(() => {
                    if(cellElement.contains(divPontosElementClone)) cellElement.removeChild(divPontosElementClone);
                    eleminadoPorTempo = true;
                }, 12000);

                divPontosElementClone.style.width = tamanho;

            }, 1400)




        }, 10500)



    }


    function verificaColisaoPersonagemPontos(elementoA, elementoB) {
        const aEsquerda = elementoA.getBoundingClientRect().left;
        const aTopo = elementoA.getBoundingClientRect().top;
        const aDireita = aEsquerda + elementoA.offsetWidth;
        const aBaixo = aTopo + elementoA.offsetHeight;

        const bEsquerda = elementoB.getBoundingClientRect().left;
        const bTopo = elementoB.getBoundingClientRect().top;
        const bDireita = bEsquerda + elementoB.offsetWidth;
        const bBaixo = bTopo + elementoB.offsetHeight;


        return (
            aEsquerda < bDireita &&
            aDireita > bEsquerda &&
            aTopo < bBaixo &&
            aBaixo > bTopo
        );

    }





}

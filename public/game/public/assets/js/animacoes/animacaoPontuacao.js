export function iniciarAnimacaoPontuacao(cellElement, nomeClasse) {

    const divPontosElement = document.createElement('div');
    const pontosElement = document.createElement('img');
    let caminhoImagem;
    let tamanho;
    let lado;
    let opacity;

    if (nomeClasse === 'sunflower') {
        caminhoImagem = './assets/img/pontuacao/Sun.gif';
        tamanho = '70%';
        lado = 0;
        opacity = "90%"
    } else if (nomeClasse === 'cardtombstone') {
        caminhoImagem = './assets/img/pontuacao/cerebroPotos.webp';
        tamanho = '50%';
        lado = 1;
        opacity = "75%"
    }

    if (caminhoImagem) {


        const pontosElementClone = pontosElement.cloneNode();
        pontosElementClone.src = caminhoImagem;
        divPontosElement.classList.add('pontos');
        divPontosElement.appendChild(pontosElementClone);
        cellElement.appendChild(divPontosElement);

        divPontosElement.style.top = `50%`;
        divPontosElement.style.left = `25%`;
        setTimeout(() => {
            divPontosElement.style.top = `-15%`;
            divPontosElement.style.left = `${Math.floor(Math.random() * 58) + 1}%`; //randon 1 a 60
            divPontosElement.style.transform = "scale(1.15)"
            divPontosElement.style.filter = "brightness(1.2)"
        }, 50);

        setTimeout(() => {
            divPontosElement.style.transition = "all 3s ease"
            divPontosElement.style.top = `40%`;
            divPontosElement.style.left = `${Math.floor(Math.random() * 39) + 1}%`; //randon 1 a 40
            divPontosElement.style.opacity = opacity

        }, 1400);





    }



    const intervaloTiro = setInterval(() => {
        // divPontosElement.style.top = `${movimentosTop[contador]}%`;
        //divPontosElement.style.left = `${movimentosLeft[contador]}%`;
       // contador++;
        // if (posicaoTop < 85) {
        //     posicaoTop += 1;
        //    // divPontosElement.style.top = `${posicaoTop}%`;
        // } else {
        //     clearInterval(intervaloTiro);
        //     //pontosElementClone.remove();
        // }
    }, 500);

    divPontosElement.style.width = tamanho;





}

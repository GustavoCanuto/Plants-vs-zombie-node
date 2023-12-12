class Planta {
    constructor(nome, imagem) {
        this.nome = nome;
        this.imagem = imagem;
    }

    iniciar(imgElement) {
        let imagemTiro = './game/img/PB00.gif';

        // Criar elemento de imagem para a imagem de tiro
        const imgTiroElement = document.createElement('img');
        imgTiroElement.src = imagemTiro;
        imgTiroElement.classList.add('img-tiro'); // Adiciona uma classe para estilizar a imagem de tiro

        // Adicionar a imagem de tiro nas coordenadas da imagem da planta
        const plantaRect = imgElement.getBoundingClientRect();
        const plantaParent = imgElement.parentElement;

        // Posicionar a imagem de tiro em relação às coordenadas da imagem da planta
        imgTiroElement.style.position = 'absolute';
        imgTiroElement.style.top = `${plantaRect.top}px`;
        imgTiroElement.style.left = `${plantaRect.left}px`;

        plantaParent.appendChild(imgTiroElement);

        // Calcular a distância total que o tiro deve percorrer
        const distanciaTotal = plantaParent.clientWidth; // Pode ser ajustado conforme necessário

        // Adicionar a classe de animação para o tiro
        imgTiroElement.style.animation = `shoot 4s linear infinite`; // Ajuste conforme necessário
    }
}


function criarCarrinhoETarget() {
    let contadorCarrinho = 0;
    let celulasCarinnho =  document.querySelectorAll('.grass-cutter');
    let celulasTarget = document.querySelectorAll('[id$="Coluna10"]');

    celulasCarinnho.forEach((cellElement) => {
        contadorCarrinho++;
        const divCarrinhoElement = document.createElement('div');
        const carrinhoElement = document.createElement('img');

        carrinhoElement.src = './assets/img/personagens/plants/LawnCleaner.png';
        divCarrinhoElement.classList.add('carrinho');
        divCarrinhoElement.appendChild(carrinhoElement);
        cellElement.appendChild(divCarrinhoElement);

        if(contadorCarrinho == 5){
            divCarrinhoElement.style.left = "10%"
        }
    });

    celulasTarget.forEach((cellElement) => {
    
        const divTargetElement = document.createElement('div');
        const targetElement = document.createElement('img');

        targetElement.src = './assets/img/personagens/zombies/Zombie_Target1.gif';
        divTargetElement.classList.add('target');
        divTargetElement.appendChild(targetElement);
        cellElement.appendChild(divTargetElement);

   
    });

}

criarCarrinhoETarget();

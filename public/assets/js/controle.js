let analogThreshold = 0.3; // Limiar para considerar movimento do analógico
let analogMoveSpeed = 0.45; // Velocidade de movimento do analógico

const rectCelula = celulaAtual.getBoundingClientRect();
const mainRect = main.getBoundingClientRect();

const centerXPercentage =
    ((rectCelula.left - mainRect.left + rectCelula.width / 2 - cursorTabuleiro.width / 2) /
        mainRect.width) *
    100;
const centerYPercentage =
    ((rectCelula.top - mainRect.top) / mainRect.height) * 100;

let analogMoveX = centerXPercentage;
let analogMoveY = centerYPercentage;

function updateImagePosition(gamepad) {
    if (
        Math.abs(gamepad.axes[0]) > analogThreshold ||
        Math.abs(gamepad.axes[1]) > analogThreshold
    ) {

        analogMoveX += gamepad.axes[0] * analogMoveSpeed;
        analogMoveY += gamepad.axes[1] * analogMoveSpeed;


        // Converte as porcentagens para pixels
        var rectTabuleiroID = tabuleiroID.getBoundingClientRect();

        var rectCursorTabuleiro = cursorTabuleiro.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var limiteTabuleiroLeft = (rectTabuleiroID.width * 10) / 100;
        var limiteTabuleiroBottom = (rectTabuleiroID.height * 8) / 100;

        var isInsideTabuleiro = (
            rectCursorTabuleiro.left >= rectTabuleiroID.left + limiteTabuleiroLeft &&
            rectCursorTabuleiro.right <= rectTabuleiroID.right &&
            rectCursorTabuleiro.top >= rectTabuleiroID.top &&
            rectCursorTabuleiro.bottom <= rectTabuleiroID.bottom - limiteTabuleiroBottom
        );


        // Limita o movimento dentro de tabuleiroID
        analogMoveX = Math.min(Math.max(analogMoveX, 15.5), 71.5);
        analogMoveY = Math.min(Math.max(analogMoveY, 14.5), 85.5);

        cursorTabuleiro.style.left = `${analogMoveX}%`;
        cursorTabuleiro.style.top = `${analogMoveY}%`;

        var rectCelulaAtual = celulaAtual.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var limiteBottomCelula = (rectCelulaAtual.height * 30) / 100;

        var isInsideCelulaAtual = (
            rectCursorTabuleiro.left >= rectCelulaAtual.left &&
            rectCursorTabuleiro.right <= rectCelulaAtual.right &&
            rectCursorTabuleiro.top >= rectCelulaAtual.top &&
            rectCursorTabuleiro.bottom <= rectCelulaAtual.bottom - limiteBottomCelula
        );



        if (!isInsideCelulaAtual) {

            calcularProximaCelula(rectCursorTabuleiro, rectCelulaAtual, rectTabuleiroID, limiteTabuleiroLeft, limiteBottomCelula);


        }

        isMouseActive = false;

    }

    else {


     // Calculate the center of the current cell in percentages
     const rect = celulaAtual.getBoundingClientRect();
     const mainRect = main.getBoundingClientRect();
     const centerXPercentage =
         ((rect.left - mainRect.left + rect.width / 2 - cursorTabuleiro.width / 2) /
             mainRect.width) *
         100;
     const centerYPercentage =
         ((rect.top - mainRect.top) / mainRect.height) * 100;

        if (!isMouseActive) {



            centerImage(celulaAtual);

            analogMoveX = centerXPercentage;
            analogMoveY = centerYPercentage;
        }



    }
}


window.addEventListener('gamepadconnected', (event) => {
    console.log(`Gamepad connected at index ${event.gamepad.index}`);
        
});

window.addEventListener('gamepaddisconnected', (event) => {
    console.log(`Gamepad disconnected from index ${event.gamepad.index}`);
  
});

function handleGamepad() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];

    if (gamepad) {
        updateImagePosition(gamepad);
    }

        requestAnimationFrame(handleGamepad);
}

handleGamepad();
//handleGamepad();

var liberadoBaixo = true, liberadoCima = true, liberadoEsquerda = true, liberadoDrieta = true;

function calcularProximaCelula(rectCursorTabuleiro, rectCelulaAtual, rectTabuleiroID, limiteTabuleiroLeft, limiteBottomCelula) {

    //movendo para cima
    if (rectCursorTabuleiro.top < (rectCelulaAtual.top - (rectCelulaAtual.height * 10) / 100)
        && rectCursorTabuleiro.top > rectTabuleiroID.top && liberadoBaixo) {
         //   alert("cima")
        console.log("cima")

        if (rectCursorTabuleiro.right > rectCelulaAtual.right - (rectCelulaAtual.width * 20) / 100
            && rectCursorTabuleiro.right < rectTabuleiroID.right) {
            moveContent('arrowupright');
        }
        else if (rectCursorTabuleiro.left < rectCelulaAtual.left + (rectCelulaAtual.width * 20) / 100
            && rectCursorTabuleiro.left > rectTabuleiroID.left + limiteTabuleiroLeft) {
            moveContent('arrowupleft');
        }
        else {
            moveContent('arrowup');
        }

        const rect = celulaAtual.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();
        const centerYPercentage =
            ((rect.top - mainRect.top + rect.height / 2 - cursorTabuleiro.height / 2) /
                mainRect.height) *
            100;

        const centerXPercentage =
            ((rect.left - mainRect.left + rect.width / 2 - cursorTabuleiro.width / 2) /
                mainRect.width) *
            100;

        analogMoveY = centerYPercentage;

        liberadoCima =false;

        setTimeout(() => {
            liberadoCima  = true;
           }, 100);
    }

    //movendo para baixo
    else if (rectCursorTabuleiro.bottom > rectCelulaAtual.bottom - limiteBottomCelula &&  liberadoCima) {
//alert("baixo")
        console.log("baixo")

        if (rectCursorTabuleiro.right > rectCelulaAtual.right && rectCursorTabuleiro.right < rectTabuleiroID.right) {
            moveContent('arrowdownright');
            console.log("para baixo direita")
        }
        else if (rectCursorTabuleiro.left < rectCelulaAtual.left
            && rectCursorTabuleiro.left > rectTabuleiroID.left + limiteTabuleiroLeft) {
            moveContent('arrowdownleft');
            console.log("para baixo esquerda")

        }
        else {
            moveContent('arrowdown');
            console.log("baixo")
        }

        const rect = celulaAtual.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        const centerYPercentage =
            ((rect.top - mainRect.top) / mainRect.height) * 100;

        const centerXPercentage =
            ((rect.left - mainRect.left + rect.width / 2 - cursorTabuleiro.width / 2) /
                mainRect.width) *
            100;

        analogMoveY = centerYPercentage;

        liberadoBaixo =false;

          setTimeout(() => {
            liberadoBaixo = true;
             }, 100);

    }

    //movendo para direita
    else if (rectCursorTabuleiro.right > rectCelulaAtual.right
        && rectCursorTabuleiro.right < rectTabuleiroID.right && liberadoDrieta) {

        moveContent('arrowright');
        console.log("direta")

         liberadoDrieta =false;

         setTimeout(() => {
        liberadoDrieta = true;
          }, 35);

        //movendo para esquerda
    } else if (rectCursorTabuleiro.left < rectCelulaAtual.left
        && rectCursorTabuleiro.left > rectTabuleiroID.left + limiteTabuleiroLeft && liberadoEsquerda) {

        moveContent('arrowleft');
        console.log("esquerda")

         liberadoEsquerda = false;

          setTimeout(() => {
        liberadoEsquerda = true;
            }, 35);

    }

}
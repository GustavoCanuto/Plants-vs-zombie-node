import {moveContent} from '../teclado/teclado.js';
import {botoesGamepad} from './comandosControle.js';

let analogThreshold = 0.3; // Limiar para considerar movimento do analógico
let analogMoveSpeed = 0.45; // Velocidade de movimento do analógico

const rectCelula = celulaAtualZombie.getBoundingClientRect();
var mainRect = main.getBoundingClientRect();

var centerXPercentage = ((rectCelula.left - mainRect.left + rectCelula.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
var centerYPercentage = ((rectCelula.top - mainRect.top) / mainRect.height) * 100;

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
        var rectcursorTabuleiroAzul = cursorTabuleiroAzul.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var limiteTabuleiroLeft = (rectTabuleiroID.width * 10) / 100;
       

        // Limita o movimento dentro de tabuleiroID
        analogMoveX = Math.min(Math.max(analogMoveX, 15.5), 71.5);
        analogMoveY = Math.min(Math.max(analogMoveY, 14.5), 85.5);

        cursorTabuleiroAzul.style.left = `${analogMoveX}%`;
        cursorTabuleiroAzul.style.top = `${analogMoveY}%`;

        var rectcelulaAtualZombie = celulaAtualZombie.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var limiteBottomCelula = (rectcelulaAtualZombie.height * 30) / 100;

        var isInsidecelulaAtualZombie = (
            rectcursorTabuleiroAzul.left >= rectcelulaAtualZombie.left &&
            rectcursorTabuleiroAzul.right <= rectcelulaAtualZombie.right &&
            rectcursorTabuleiroAzul.top >= rectcelulaAtualZombie.top &&
            rectcursorTabuleiroAzul.bottom <= rectcelulaAtualZombie.bottom - limiteBottomCelula
        );

        if (!isInsidecelulaAtualZombie) {

            calcularProximaCelula(rectcursorTabuleiroAzul, rectcelulaAtualZombie, rectTabuleiroID, 
                limiteTabuleiroLeft, limiteBottomCelula, mainRect);

        }

        isMouseActive = false;
    }
    else {

        const rect = celulaAtualZombie.getBoundingClientRect();
        centerXPercentage = ((rect.left - mainRect.left + rect.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
        centerYPercentage = ((rect.top - mainRect.top) / mainRect.height) * 100;

        if (!isMouseActive) {
            centerImage(celulaAtualZombie);
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

        const buttons = gamepad.buttons;
        
        botoesGamepad(buttons);
    }

    requestAnimationFrame(handleGamepad);
}

handleGamepad();

       // var limiteTabuleiroBottom = (rectTabuleiroID.height * 8) / 100;
        // var isInsideTabuleiro = (
        //     rectcursorTabuleiroAzul.left >= rectTabuleiroID.left + limiteTabuleiroLeft &&
        //     rectcursorTabuleiroAzul.right <= rectTabuleiroID.right &&
        //     rectcursorTabuleiroAzul.top >= rectTabuleiroID.top &&
        //     rectcursorTabuleiroAzul.bottom <= rectTabuleiroID.bottom - limiteTabuleiroBottom
        // );


// calculo proxima celula

var liberadoBaixo = true, liberadoCima = true, liberadoEsquerda = true, liberadoDrieta = true;

function calcularProximaCelula(rectcursorTabuleiroAzul, rectcelulaAtualZombie, rectTabuleiroID, 
    limiteTabuleiroLeft, limiteBottomCelula) {

    //movendo para cima
    if (rectcursorTabuleiroAzul.top < (rectcelulaAtualZombie.top - (rectcelulaAtualZombie.height * 10) / 100)
        && rectcursorTabuleiroAzul.top > rectTabuleiroID.top && liberadoBaixo) {

        // console.log("cima")
        if (rectcursorTabuleiroAzul.right > rectcelulaAtualZombie.right - (rectcelulaAtualZombie.width * 20) / 100
            && rectcursorTabuleiroAzul.right < rectTabuleiroID.right) {
            moveContent('arrowupright');
        }
        else if (rectcursorTabuleiroAzul.left < rectcelulaAtualZombie.left + (rectcelulaAtualZombie.width * 20) / 100
            && rectcursorTabuleiroAzul.left > rectTabuleiroID.left + limiteTabuleiroLeft) {
            moveContent('arrowupleft');
        }
        else {
            moveContent('arrowup');
        }

        const rect = celulaAtualZombie.getBoundingClientRect();
        centerYPercentage = ((rect.top - mainRect.top + rect.height / 2 - cursorTabuleiroAzul.height / 2) / mainRect.height) * 100;

        analogMoveY = centerYPercentage;
        liberadoCima = false;

        setTimeout(() => {
            liberadoCima = true;
        }, 100);
    }

    //movendo para baixo
    else if (rectcursorTabuleiroAzul.bottom > rectcelulaAtualZombie.bottom - limiteBottomCelula && liberadoCima) {

        //  console.log("baixo")
        if (rectcursorTabuleiroAzul.right > rectcelulaAtualZombie.right && rectcursorTabuleiroAzul.right < rectTabuleiroID.right) {
            moveContent('arrowdownright');
            console.log("para baixo direita")
        }
        else if (rectcursorTabuleiroAzul.left < rectcelulaAtualZombie.left
            && rectcursorTabuleiroAzul.left > rectTabuleiroID.left + limiteTabuleiroLeft) {
            moveContent('arrowdownleft');
            console.log("para baixo esquerda")
        }
        else {
            moveContent('arrowdown');
            console.log("baixo")
        }

        const rect = celulaAtualZombie.getBoundingClientRect();
        centerYPercentage = ((rect.top - mainRect.top) / mainRect.height) * 100;

        analogMoveY = centerYPercentage;
        liberadoBaixo = false;

        setTimeout(() => {
            liberadoBaixo = true;
        }, 100);
    }

    //movendo para direita
    else if (rectcursorTabuleiroAzul.right > rectcelulaAtualZombie.right
        && rectcursorTabuleiroAzul.right < rectTabuleiroID.right && liberadoDrieta) {

        moveContent('arrowright');
        // console.log("direta")
        liberadoDrieta = false;

        setTimeout(() => {
            liberadoDrieta = true;
        }, 35);

        //movendo para esquerda
    } else if (rectcursorTabuleiroAzul.left < rectcelulaAtualZombie.left
        && rectcursorTabuleiroAzul.left > rectTabuleiroID.left + limiteTabuleiroLeft && liberadoEsquerda) {

        moveContent('arrowleft');
        //console.log("esquerda")
        liberadoEsquerda = false;

        setTimeout(() => {
            liberadoEsquerda = true;
        }, 35);
    }
}
import { moveContent } from '../teclado/teclado.js';
import { botoesGamepad } from './comandosControle.js';

let analogThreshold = 0.3; // Limiar para considerar movimento do analógico
let analogMoveSpeed = 0.45; // Velocidade de movimento do analógico
let analogMoveX = [];
let analogMoveY = [];
var mainRect = main.getBoundingClientRect();

function centerAnalogico(lado) {
    mainRect = main.getBoundingClientRect();
    const chaveLado = Object.keys(celulaAtual[lado]);
    const rectCelula = celulaAtual[lado][chaveLado].getBoundingClientRect();

    var centerXPercentage = ((rectCelula.left - mainRect.left + rectCelula.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
    var centerYPercentage = ((rectCelula.top - mainRect.top) / mainRect.height) * 100;

    analogMoveX[lado] = centerXPercentage;
    analogMoveY[lado] = centerYPercentage;
}

centerAnalogico(0);
centerAnalogico(1);

function updateImagePosition(gamepad, lado) {

    var chaveLado = Object.keys(celulaAtual[lado]);

    if (
        Math.abs(gamepad.axes[0]) > analogThreshold ||
        Math.abs(gamepad.axes[1]) > analogThreshold
    ) {

        analogMoveX[lado] += gamepad.axes[0] * analogMoveSpeed;
        analogMoveY[lado] += gamepad.axes[1] * analogMoveSpeed;

        analogMoveX[lado] = Math.min(Math.max(analogMoveX[lado], 15.5), 71.5);
        analogMoveY[lado] = Math.min(Math.max(analogMoveY[lado], 14.5), 85.5);


        let cursorGamePad = movimentarCursorGamePad(lado, analogMoveX[lado], analogMoveY[lado])

        socket2.emit("movimentoGamePad", lado, analogMoveX[lado], analogMoveY[lado], sala);

        // Converte as porcentagens para pixels
        var rectTabuleiroID = tabuleiroID.getBoundingClientRect();
        var rectcursorTabuleiro = cursorGamePad.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var limiteTabuleiroLeft = (rectTabuleiroID.width * 10) / 100;

        var rectcelulaAtual = celulaAtual[lado][chaveLado].getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var limiteBottomCelula = (rectcelulaAtual.height * 30) / 100;

        var isInsidecelulaAtual = (
            rectcursorTabuleiro.left >= rectcelulaAtual.left &&
            rectcursorTabuleiro.right <= rectcelulaAtual.right &&
            rectcursorTabuleiro.top >= rectcelulaAtual.top &&
            rectcursorTabuleiro.bottom <= rectcelulaAtual.bottom - limiteBottomCelula
        );

        if (!isInsidecelulaAtual) {
            calcularProximaCelula(rectcursorTabuleiro, rectcelulaAtual, rectTabuleiroID,
                limiteTabuleiroLeft, limiteBottomCelula, lado, chaveLado);
        }

        isMouseActive = false;
    }
    else {
        centerImageGamePad(lado,chaveLado);
        socket2.emit("centerImageGamePad", lado,chaveLado, sala)
    }
}

window.addEventListener('gamepadconnected', (event) => {
    console.log(`Gamepad connected at index ${event.gamepad.index}`);
});

window.addEventListener('gamepaddisconnected', (event) => {
    console.log(`Gamepad disconnected from index ${event.gamepad.index}`);
    centerImage(celulaAtual[event.gamepad.index]);
});

function handleGamepad() {
    const gamepads = navigator.getGamepads();

    if (gamepads[0]) {
        jogadorGamePad(gamepads[0], ladoPlayerGamePad)
    }

    if (gamepads[1]) {
        let ladoPlayer2 = 1;
        if (ladoPlayerGamePad == 1) ladoPlayer2 = 0;
        jogadorGamePad(gamepads[1], ladoPlayer2)
    }

    requestAnimationFrame(handleGamepad);
}

function jogadorGamePad(gamepad, lado) {

    if(!gamePadBloqueado){
    updateImagePosition(gamepad, lado);
    const buttons = gamepad.buttons;
    botoesGamepad(buttons, lado);
    }
}

handleGamepad();

// calculo proxima celula
var liberadoBaixo = [true, true], liberadoCima = [true, true], liberadoEsquerda = [true, true], liberadoDrieta = [true, true];

function calcularProximaCelula(rectcursorTabuleiro, rectcelulaAtual, rectTabuleiroID,
    limiteTabuleiroLeft, limiteBottomCelula, lado, chaveLado) {

    // alert(lado)
    //movendo para cima
    if (rectcursorTabuleiro.top < (rectcelulaAtual.top - (rectcelulaAtual.height * 10) / 100)
        && rectcursorTabuleiro.top > rectTabuleiroID.top && liberadoBaixo[lado]) {

        // console.log("cima")
        if (rectcursorTabuleiro.right > rectcelulaAtual.right - (rectcelulaAtual.width * 20) / 100
            && rectcursorTabuleiro.right < rectTabuleiroID.right) {
            moveContent('arrowupright', lado);
        }
        else if (rectcursorTabuleiro.left < rectcelulaAtual.left + (rectcelulaAtual.width * 20) / 100
            && rectcursorTabuleiro.left > rectTabuleiroID.left + limiteTabuleiroLeft) {
            moveContent('arrowupleft', lado);
        }
        else {
            moveContent('arrowup', lado);
        }
        mainRect = main.getBoundingClientRect();
        const rect = celulaAtual[lado][chaveLado].getBoundingClientRect();
        const centerYPercentage = ((rect.top - mainRect.top + rect.height / 2 - cursorTabuleiroAzul.height / 2) / mainRect.height) * 100;

        analogMoveY[lado] = centerYPercentage;
        liberadoCima[lado] = false;

        setTimeout(() => {
            liberadoCima[lado] = true;
        }, 100);
    }

    //movendo para baixo
    else if (rectcursorTabuleiro.bottom > rectcelulaAtual.bottom - limiteBottomCelula && liberadoCima[lado]) {

        //  console.log("baixo")
        if (rectcursorTabuleiro.right > rectcelulaAtual.right && rectcursorTabuleiro.right < rectTabuleiroID.right) {
            moveContent('arrowdownright', lado);

        }
        else if (rectcursorTabuleiro.left < rectcelulaAtual.left
            && rectcursorTabuleiro.left > rectTabuleiroID.left + limiteTabuleiroLeft) {
            moveContent('arrowdownleft', lado);

        }
        else {
            moveContent('arrowdown', lado);

        }
        mainRect = main.getBoundingClientRect();
        const rect = celulaAtual[lado][chaveLado].getBoundingClientRect();
        const centerYPercentage = ((rect.top - mainRect.top) / mainRect.height) * 100;

        analogMoveY[lado] = centerYPercentage;
        liberadoBaixo[lado] = false;

        setTimeout(() => {
            liberadoBaixo[lado] = true;
        }, 100);
    }

    //movendo para direita
    else if (rectcursorTabuleiro.right > rectcelulaAtual.right
        && rectcursorTabuleiro.right < rectTabuleiroID.right && liberadoDrieta[lado]) {

        moveContent('arrowright', lado);

        liberadoDrieta[lado] = false;

        setTimeout(() => {
            liberadoDrieta[lado] = true;
        }, 35);

        //movendo para esquerda
    } else if (rectcursorTabuleiro.left < rectcelulaAtual.left
        && rectcursorTabuleiro.left > rectTabuleiroID.left + limiteTabuleiroLeft && liberadoEsquerda[lado]) {

        moveContent('arrowleft', lado);

        liberadoEsquerda[lado] = false;

        setTimeout(() => {
            liberadoEsquerda[lado] = true;
        }, 35);
    }
}

export function movimentarCursorGamePad(lado, analogMoveX, analogMoveY) {

    let cursorGamePad = lado == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;

    cursorGamePad.style.left = `${analogMoveX}%`;
    cursorGamePad.style.top = `${analogMoveY}%`;

    return cursorGamePad;

}

export function centerImageGamePad(lado,chaveLado){

    mainRect = main.getBoundingClientRect();
    const rect = celulaAtual[lado][chaveLado].getBoundingClientRect();
    const centerXPercentage = ((rect.left - mainRect.left + rect.width / 2 - cursorTabuleiroAzul.width / 2) / mainRect.width) * 100;
    const centerYPercentage = ((rect.top - mainRect.top) / mainRect.height) * 100;

    if (!isMouseActive) {
        centerImage(celulaAtual[lado]);
       
        analogMoveX[lado] = centerXPercentage;
        analogMoveY[lado] = centerYPercentage;
    }

}
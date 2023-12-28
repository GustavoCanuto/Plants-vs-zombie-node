let analogThreshold = 0.3; // Limiar para considerar movimento do analógico
let analogMoveSpeed = 0.25; // Velocidade de movimento do analógico


const rect = celulaAtual.getBoundingClientRect();
const mainRect = main.getBoundingClientRect();

const centerXPercentage =
    ((rect.left - mainRect.left + rect.width / 2 - imagem.width / 2) /
        mainRect.width) *
    100;
const centerYPercentage =
    ((rect.top - mainRect.top) / mainRect.height) * 100;

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
        var rect3 = conteudo2.getBoundingClientRect();

        var rectImage = imagem.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var marginPercentLeft = (rect3.width * 10) / 100;
        var marginPercentBottom = (rect3.height * 8) / 100;

        var isInsideContent2 = (
            rectImage.left >= rect3.left + marginPercentLeft &&
            rectImage.right <= rect3.right &&
            rectImage.top >= rect3.top &&
            rectImage.bottom <= rect3.bottom - marginPercentBottom
        );


        // Limita o movimento dentro de conteudo2
        analogMoveX = Math.min(Math.max(analogMoveX, 15.5), 71.5);
        analogMoveY = Math.min(Math.max(analogMoveY, 14.5), 85.5);

        imagem.style.left = `${analogMoveX}%`;
        imagem.style.top = `${analogMoveY}%`;

        var rect4 = celulaAtual.getBoundingClientRect();

        // Convertendo a porcentagem para pixels
        var marginPercentBottom5 = (rect4.height * 30) / 100;

        var isInsideContent3 = (
            rectImage.left >= rect4.left &&
            rectImage.right <= rect4.right &&
            rectImage.top >= rect4.top &&
            rectImage.bottom <= rect4.bottom - marginPercentBottom5
        );

        if (!isInsideContent3) {

            // console.log("esquedar celula Atual: " + rect4.left)
            // console.log("esquedar tabuleiro: " + rect3.left)
            // console.log(rectImage.left)
            // console.log("direta celula Atual: " + rect4.right)
            // console.log("direita tabuleiro: " + rect3.right)
            // console.log(rectImage.right)
            // console.log("top celula Atual: " + rect4.top)
            // console.log("top tabuleiro: " + rect3.top)
            // console.log(rectImage.top)
            // console.log("botom celula Atual: " + (rect4.bottom - marginPercentBottom5))
            // console.log(rectImage.bottom)
        }
        // Envie para a próxima célula (chame a função moveContent com a direção desejada)


        if (!isInsideContent3) {

       

            if (rectImage.top < (rect4.top - (rect4.height * 10) / 100) && rectImage.top > rect3.top) {


                if (rectImage.right > rect4.right - (rect4.width * 20) / 100 && rectImage.right < rect3.right) {
                    moveContent('arrowupright');
                }
                else if (rectImage.left < rect4.left + (rect4.width * 20) / 100 && rectImage.left > rect3.left + marginPercentLeft) {
                    moveContent('arrowupleft');

                }
                else {
                    moveContent('arrowup');
                }

                const rect = celulaAtual.getBoundingClientRect();
                const mainRect = main.getBoundingClientRect();
                const centerYPercentage =
                    ((rect.top - mainRect.top + rect.height / 2 - imagem.height / 2) /
                        mainRect.height) *
                    100;

                const centerXPercentage =
                    ((rect.left - mainRect.left + rect.width / 2 - imagem.width / 2) /
                        mainRect.width) *
                    100;

                analogMoveY = centerYPercentage;

            }

            else if (rectImage.bottom > rect4.bottom - marginPercentBottom5) {

                if (rectImage.right > rect4.right && rectImage.right < rect3.right) {
                    moveContent('arrowdownright');
                }
                else if (rectImage.left < rect4.left && rectImage.left > rect3.left + marginPercentLeft) {
                    moveContent('arrowdownleft');

                }
                else {
                    moveContent('arrowdown');
                }

                const rect = celulaAtual.getBoundingClientRect();
                const mainRect = main.getBoundingClientRect();

                const centerYPercentage =
                    ((rect.top - mainRect.top) / mainRect.height) * 100;

                const centerXPercentage =
                    ((rect.left - mainRect.left + rect.width / 2 - imagem.width / 2) /
                        mainRect.width) *
                    100;

                analogMoveY = centerYPercentage;

            }
            else if (rectImage.right > rect4.right && rectImage.right < rect3.right) {

                moveContent('arrowright');

            } else if (rectImage.left < rect4.left && rectImage.left > rect3.left + marginPercentLeft) {

                moveContent('arrowleft');

            }



        }

        isMouseActive = false;

    }

    else {

        // Calculate the center of the current cell in percentages
        const rect = celulaAtual.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();
        const centerXPercentage =
            ((rect.left - mainRect.left + rect.width / 2 - imagem.width / 2) /
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

function handleGamepad() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];

    if (gamepad) {
        updateImagePosition(gamepad);
    }

    requestAnimationFrame(handleGamepad);
}

window.addEventListener('gamepadconnected', (event) => {
    console.log(`Gamepad connected at index ${event.gamepad.index}`);
    handleGamepad();
});

window.addEventListener('gamepaddisconnected', (event) => {
    console.log(`Gamepad disconnected from index ${event.gamepad.index}`);
});


handleGamepad();

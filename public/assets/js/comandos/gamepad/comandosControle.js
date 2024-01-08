import { moveContent, moveCards } from '../teclado/teclado.js';


const tempoMinimoPressionado = 200;
//const tempoMinimoPressionado2 = 150;
var esperaButtons = true;
var esperaButtonsDuplo = true;
var timoutButton;

export function botoesGamepad(buttons, lado) {

    //var chaveLado = Object.keys(celulaAtual[lado]);

    // Função para verificar a duração da pressão e chamar a função correspondente
    function verificarBotaoPressionado(indice, funcao) {

        // Se o botão estiver sendo pressionado
        if (buttons[indice].pressed) {

            if (esperaButtons) {

                timoutButton = setTimeout(() => {
                    funcao();
                    esperaButtons = true;
                }, tempoMinimoPressionado);

                esperaButtons = false;

            }
        }
    }

    // Função para verificar a duração da pressão e chamar a função correspondente
    function verificarBotaoPressionadoDuplo(indice1, indice2, funcao) {

        // Se o botão estiver sendo pressionado
        if (buttons[indice1].pressed && buttons[indice2].pressed) {

            if (esperaButtonsDuplo) {
                clearTimeout(timoutButton);

                setTimeout(() => {
                    funcao();
                    esperaButtonsDuplo = true;
                    esperaButtons = true;
                }, tempoMinimoPressionado);

                esperaButtonsDuplo = false;

            }
        }
}

    // Exemplo de como usar a função para os botões específicos
    verificarBotaoPressionado(15, () => moveContent('arrowright', lado));
    verificarBotaoPressionado(14, () => moveContent('arrowleft', lado));
    verificarBotaoPressionado(13, () => moveContent('arrowdown', lado));
    verificarBotaoPressionado(12, () => moveContent('arrowup', lado));

    verificarBotaoPressionado(0, () => moveCards(' ', lado));
    verificarBotaoPressionado(4, () => moveCards('1', lado));
    verificarBotaoPressionado(5, () => moveCards('2', lado));

    verificarBotaoPressionadoDuplo(12, 14, () => moveContent('arrowupleft', lado));
    verificarBotaoPressionadoDuplo(12, 15, () => moveContent('arrowupright', lado));
    verificarBotaoPressionadoDuplo(13, 14, () => moveContent('arrowdownleft', lado));
    verificarBotaoPressionadoDuplo(13, 15, () => moveContent('arrowdownright', lado));
}

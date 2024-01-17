import { moveContent, moveCards } from '../teclado/teclado.js';


// const tempoMinimoPressionado = 200;
// //const tempoMinimoPressionado2 = 150;
// var esperaButtons = true;
// var esperaButtonsDuplo = true;
// var timoutButton;

export function botoesGamepad(buttons, lado) {

    if (lado == 0) jogadorPlantaComandos.atualizarComandos(buttons, lado)
    if (lado == 1) jogadorZombieComandos.atualizarComandos(buttons, lado)

}

class jogadorComandosGamePad {

    constructor() {
        this.tempoMinimoPressionado = 140;
        this.esperaButtons = true;
        this.esperaButtonsDuplo = true;
        this.timoutButton;
        this.buttons;
    }


    // Função para verificar a duração da pressão e chamar a função correspondente
    verificarBotaoPressionado(indice, funcao) {

        // Se o botão estiver sendo pressionado
        if (this.buttons[indice].pressed) {

            if (this.esperaButtons) {

                this.timoutButton = setTimeout(() => {
                    funcao();
                    this.esperaButtons = true;
                }, this.tempoMinimoPressionado);

                this.esperaButtons = false;

            }
        }
    }

    // Função para verificar a duração da pressão e chamar a função correspondente
    verificarBotaoPressionadoDuplo(indice1, indice2, funcao) {

        // Se o botão estiver sendo pressionado
        if (this.buttons[indice1].pressed && this.buttons[indice2].pressed) {

            if (this.esperaButtonsDuplo) {
                clearTimeout(this.timoutButton);

                setTimeout(() => {
                    funcao();
                    this.esperaButtonsDuplo = true;
                    this.esperaButtons = true;
                }, this.tempoMinimoPressionado);

                this.esperaButtonsDuplo = false;

            }
        }
    }

    atualizarComandos(buttons, lado) {

        this.buttons = buttons;

        // Exemplo de como usar a função para os botões específicos
        this.verificarBotaoPressionado(15, () => moveContent('arrowright', lado));
        this.verificarBotaoPressionado(14, () => moveContent('arrowleft', lado));
        this.verificarBotaoPressionado(13, () => moveContent('arrowdown', lado));
        this.verificarBotaoPressionado(12, () => moveContent('arrowup', lado));

        this.verificarBotaoPressionado(0, () => moveCards(' ', lado));
        this.verificarBotaoPressionado(4, () => moveCards('1', lado));
        this.verificarBotaoPressionado(5, () => moveCards('2', lado));

        this.verificarBotaoPressionadoDuplo(12, 14, () => moveContent('arrowupleft', lado));
        this.verificarBotaoPressionadoDuplo(12, 15, () => moveContent('arrowupright', lado));
        this.verificarBotaoPressionadoDuplo(13, 14, () => moveContent('arrowdownleft', lado));
        this.verificarBotaoPressionadoDuplo(13, 15, () => moveContent('arrowdownright', lado));
    }

}

export var jogadorPlantaComandos = new jogadorComandosGamePad();
export var jogadorZombieComandos = new jogadorComandosGamePad();

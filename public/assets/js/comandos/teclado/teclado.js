import * as comandosNavBar from '../comandosNavBar.js';
import { jogadorComandosTecladoPlanta, jogadorComandosTecladoZombie } from './tecladoPersonalizado.js';

// Adicione um objeto para rastrear o estado das teclas para cada jogador
const estadoTeclas = [true, true]
const estadoTeclasDupla = [true, true]
let setIntervalPlanta;
let setIntervalPlantaDuplo;
let setIntervalZombie;
let setIntervalZombieDuplo;
let teclaPressionadaPlanta;
let teclaPressionadaZombie;

document.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();

    //planta
    if (Object.values(listaTeclasPlantas).includes(key)) {

        if (estadoTeclas[0]) {
            jogadorComandosTecladoPlanta.jogadorPlanta(key);
            setIntervalPlanta = setInterval(() => {
                jogadorComandosTecladoPlanta.jogadorPlanta(key);
            }, 100);
            estadoTeclas[0] = false;
            teclaPressionadaPlanta = key;
        }

        if (key != teclaPressionadaPlanta) {
            if (estadoTeclasDupla[0]) {
                jogadorComandosTecladoPlanta.jogadorPlanta(key);
                setIntervalPlantaDuplo = setInterval(() => {
                    jogadorComandosTecladoPlanta.jogadorPlanta(key);
                }, 100);
                estadoTeclasDupla[0] = false;
            }
        }

    }

    //zombie
    if (Object.values(listaTeclasZombies).includes(key)) {

        if (estadoTeclas[1]) {
            jogadorComandosTecladoZombie.jogadorZombie(key);
            setIntervalZombie = setInterval(() => {
                jogadorComandosTecladoZombie.jogadorZombie(key);
            }, 100);
            estadoTeclas[1] = false;
            teclaPressionadaZombie = key;
        }

        if (key != teclaPressionadaZombie) {
            if (estadoTeclasDupla[1]) {
                jogadorComandosTecladoZombie.jogadorZombie(key);
                setIntervalZombieDuplo = setInterval(() => {
                    jogadorComandosTecladoZombie.jogadorZombie(key);
                }, 100);
                estadoTeclasDupla[1] = false;
            }
        }

    }
});

document.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase();

    if (Object.values(listaTeclasPlantas).includes(key)) {

        if (key == teclaPressionadaPlanta) {
            clearInterval(setIntervalPlanta)
            estadoTeclas[0] = true;
        }

        clearInterval(setIntervalPlantaDuplo)
        estadoTeclasDupla[0] = true;

    }

    if (Object.values(listaTeclasZombies).includes(key)) {

        if (key == teclaPressionadaZombie) {
            clearInterval(setIntervalZombie)
            estadoTeclas[1] = true;
        }

        clearInterval(setIntervalZombieDuplo)
        estadoTeclasDupla[1] = true;
    }
});

export function moveCards(key, lado) {
    if (lado == 0) jogadorPlanta.atualizarMoveCard(key, lado);
    if (lado == 1) jogadorZombie.atualizarMoveCard(key, lado);
}


export function moveContent(direction, lado) {
    if (lado == 0) jogadorPlanta.atualizarMove(direction, lado)
    if (lado == 1) jogadorZombie.atualizarMove(direction, lado)
}

class JogadorMove {

    constructor() {
        this.rowIndex = 1;
        this.cellIndex = 1;
        this.moveTimeout = null;
    }

    atualizarMove(direction, lado) {

        var chaveLado = Object.keys(celulaAtual[lado]);

        this.rowIndex = celulaAtual[lado][chaveLado].parentElement.classList[1].replace('linha', '');
        this.cellIndex = Array.from(celulaAtual[lado][chaveLado].parentElement.children).indexOf(celulaAtual[lado][chaveLado]);

        switch (direction) {
            case 'arrowup':
                this.rowIndex = Math.max(1, parseInt(this.rowIndex) - 1);
                break;
            case 'arrowdown':
                this.rowIndex = Math.min(5, parseInt(this.rowIndex) + 1);
                break;
            case 'arrowleft':
                this.cellIndex = Math.max(1, this.cellIndex - 1);
                break;
            case 'arrowright':
                this.cellIndex = Math.min(9, this.cellIndex + 1);
                break;
            case 'arrowupleft':
                this.rowIndex = Math.max(1, parseInt(this.rowIndex) - 1);
                this.cellIndex = Math.max(1, this.cellIndex - 1);
                break;
            case 'arrowupright':
                this.rowIndex = Math.max(1, parseInt(this.rowIndex) - 1);
                this.cellIndex = Math.min(9, this.cellIndex + 1);
                break;
            case 'arrowdownleft':
                this.rowIndex = Math.min(5, parseInt(this.rowIndex) + 1);
                this.cellIndex = Math.max(1, this.cellIndex - 1);
                break;
            case 'arrowdownright':
                this.rowIndex = Math.min(5, parseInt(this.rowIndex) + 1);
                this.cellIndex = Math.min(9, this.cellIndex + 1);
                break;

        }

        var targetRow = document.querySelector('.linha' + this.rowIndex);
        var targetCell = targetRow.children[this.cellIndex];

        if (!targetCell.classList.contains('grass-cutter')) {

            celulaAnterior[lado][chaveLado] = celulaAtual[lado][chaveLado];
            celulaAtual[lado][chaveLado] = targetCell;

            clearTimeout(this.moveTimeout);

            this.moveTimeout = setTimeout(function () {

                centerImage(celulaAtual[lado]);
                targetCell.appendChild(seletorTabuleiro[lado][chaveLado]);
                targetCell.appendChild(divPreviaPersonagem[lado][chaveLado]);

            }, 30);

        }


    }


    atualizarMoveCard(key, lado) {
        const classeSeletor = lado == 0 ? "seletorTabuleiroAmarelo" : "seletorTabuleiroAzul"

        switch (key) {
            case '2':
                comandosNavBar.moveNavBar(1, lado);
                break;
            case '1':
                comandosNavBar.moveNavBar(-1, lado);
                break;
            case ' ':
                const celulaAtual = document.getElementById(`${classeSeletor}`);
                comandosNavBar.dropPersonagem(celulaAtual.closest('.cell'), imgPreviaPersonagem[lado]);
                break;
        }
    }

}

export var jogadorPlanta = new JogadorMove();
export var jogadorZombie = new JogadorMove();
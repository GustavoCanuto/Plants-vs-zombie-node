import { Personagens, personagens } from "./personagens.js";
import AnimacaoCartas from './animacaoCartas.js';

class ArrastarCards {

    constructor() {

        this.socket = io();
        this.classedragItems = LadoQueUsaMouse == 0 ? '.navbar-planta' : '.navbar-zombie'
        this.dragItems = document.querySelectorAll(`${this.classedragItems} > .card`);
        this.dropBoxes = document.querySelectorAll(".cell");
        this.classToPersonagem = personagens;
        this.funcoesDragItems = [];

        this.dragItems.forEach(item => {

            const handle = this.dragStart.bind(this);

            this.funcoesDragItems.push(handle);

            item.addEventListener('dragstart', handle);

        });


        this.dropBoxes.forEach(box => {
            box.addEventListener('dragover', this.dragOver.bind(this));
            box.addEventListener('drop', this.dropEvent.bind(this));
            box.addEventListener('dragleave', this.dragLeave.bind(this));
        });

        this.cellAnimators = {};

        this.framesPorClasse = {
            sunflower: 25,
            peashooter: 25,
            showpea: 25,
            repeater: 25,
            wallnut: 17,
            cherrybomb: 14,
            potatomine: 11,
            cardtombstone: 1,
            zombie: 47,
            conehead: 47,
            buckethead: 47,
            flagzombie: 47,
            football: 30,
            screendoor: 47,
        };

        this.socket.on('itemPlaced', this.onItemPlaced.bind(this));
    }

    atualizarLado() {

        let contador = 0;

        this.dragItems.forEach(item => {
            item.removeEventListener('dragstart', this.funcoesDragItems[contador]);
            contador++;
        });

        this.classedragItems = LadoQueUsaMouse == 0 ? '.navbar-planta' : '.navbar-zombie'
        //alert(this.classedragItems)
        this.dragItems = document.querySelectorAll(`${this.classedragItems} .card`);
        this.dropBoxes = document.querySelectorAll(".cell");

        this.funcoesDragItems = [];

        this.dragItems.forEach(item => {

            const handle = this.dragStart.bind(this);

            this.funcoesDragItems.push(handle);

            item.addEventListener('dragstart', handle);
        });
    }

    dragStart(ev) {
        const dragClass = ev.target.classList[1];
        console.log(dragClass);

        const personagem = this.classToPersonagem[dragClass];
        if (personagem instanceof Personagens) {

            const imgElement = personagem.renderImage();
            imgElement.style.width = '100px';
            imgElement.style.height = '100px';
            document.body.appendChild(imgElement);

            ev.dataTransfer.setData('text/plain', personagem.imagePath);
            ev.dataTransfer.setDragImage(imgElement, 0, 0);
        } else {
            console.error('Personagem não encontrado ou não é uma instância de Personagens:', personagem);
        }
    }

    dragOver = (ev) => {

        if (!ev.target.closest('.cell').classList.contains('grass-cutter')) {
            ev.preventDefault();


            if (seletorTabuleiro[LadoQueUsaMouse][chaveMouse]) {
                ev.target.closest('.cell').appendChild(seletorTabuleiro[LadoQueUsaMouse][chaveMouse]);
                ev.target.closest('.cell').appendChild(divPreviaPersonagem[LadoQueUsaMouse][chaveMouse]);
                //var overAtual      =  [{planta:ev.target.closest('.cell')}, {zombie:ev.target.closest('.cell')}]
                celulaAtual[LadoQueUsaMouse][chaveMouse] = ev.target.closest('.cell')
                centerImage(celulaAtual[LadoQueUsaMouse]);
                celulaAnterior[LadoQueUsaMouse][chaveMouse] = ev.target.closest('.cell')

            }
        }
    }
    
    criarElementoPersonagem() {
        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        const gifElement = document.createElement('img');
        elemento.appendChild(gifElement);
        return elemento;
    }
    
    dropEvent = (ev) => {
        if (!ev.target.closest('.cell').classList.contains('ocupado')) {
            ev.preventDefault();

            ev.target.classList.remove('enter');
            const imgSrc = ev.dataTransfer.getData('text/plain');
            const img = new Image();
            img.src = imgSrc;

            this.criarAnimacaoCarta(ev, img);
        }
    }

    dragLeave(ev) {
        ev.preventDefault();
    }

    criarAnimacaoCarta(ev, img) {
        AnimacaoCartas.criarAnimacaoCarta(ev, img, this.framesPorClasse);
    }

    onItemPlaced(data) {
        const [i, j] = data.position;
        const cell = document.querySelector(`.linha${i + 1} .cell:nth-child(${j + 1})`);

        const dragClass = data.imageSrc.split('/').pop().split('.')[0];

        const personagem = this.classToPersonagem[dragClass];
        if (personagem instanceof Personagens) {
            const imgSrc = personagem.imagePath;
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;

            const elemento = document.createElement('div');
            elemento.classList.add("personagem");
            elemento.appendChild(imgElement);
            cell.appendChild(elemento);
            cell.classList.add('ocupado');
            document.body.style.cursor = 'none';
        } else {
            console.error('Tipo de card não reconhecido:', dragClass);
        }
    }
}

export var game = new ArrastarCards();

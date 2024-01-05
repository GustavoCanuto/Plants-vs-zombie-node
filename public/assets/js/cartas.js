import { Personagens, personagens } from "./personagens.js";

class ArrastarCards {
    constructor() {

        this.socket = io();
        this.dragItems = document.querySelectorAll(".card");
        this.dropBoxes = document.querySelectorAll(".cell");

        this.classToPersonagem = personagens;

        this.dragItems.forEach(item => {
            item.addEventListener('dragstart', this.dragStart.bind(this));
        });

        this.dropBoxes.forEach(box => {
            box.addEventListener('dragover', this.dragOver.bind(this));
            box.addEventListener('drop', this.dropEvent.bind(this));
            box.addEventListener('dragleave', this.dragLeave.bind(this));
        });

        this.socket.on('itemPlaced', this.onItemPlaced.bind(this));
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
        
        if (! ev.target.closest('.cell').classList.contains('grass-cutter')) {
            ev.preventDefault();


            if (seletorTabuleiro) {
                ev.target.closest('.cell').appendChild(seletorTabuleiro);
                ev.target.closest('.cell').appendChild(divPreviaPersonagem);
                centerImage( ev.target.closest('.cell'));
            }
        }
    }

    dropEvent = (ev) => {
        if (!ev.target.closest('.cell').classList.contains('ocupado')) {
            ev.preventDefault();

            ev.target.classList.remove('enter');

            const imgSrc = ev.dataTransfer.getData('text/plain');
            const img = new Image();
            img.src = imgSrc;

            const rowElement = ev.target.closest('.row');
            const cellElement = ev.target.closest('.cell');

            if (rowElement && cellElement) {
                const rowIndex = Array.from(rowElement.parentNode.children).indexOf(rowElement);
                const cellIndex = Array.from(rowElement.children).indexOf(cellElement);

                const elemento = document.createElement('div');
                elemento.classList.add("personagem");
                elemento.appendChild(img);

                const cellOcupada =   ev.target.closest('.cell');

                cellOcupada.classList.add("ocupado");
                cellOcupada.appendChild(elemento);

                this.socket.emit('draggedItem', { position: [rowIndex, cellIndex], imageSrc: imgSrc });
            } else {
                console.error('Não foi possível obter os índices do tabuleiro.');
            }
        }
    }


    dragLeave(ev) {
        ev.preventDefault();
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

const game = new ArrastarCards();

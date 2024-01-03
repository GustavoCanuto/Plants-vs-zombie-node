const socket = io();

const dragItems = document.querySelectorAll(".card");
const dropBoxes = document.querySelectorAll(".cell");

const classToImage = {
    'sunflower': '../../assets/img/personagens/plants/sunflower.png',
    'peashooter': '../../assets/img/personagens/plants/peashooter.png',
    'showpea': '../../assets/img/personagens/plants/showpea.png',
    'repeater': '../../assets/img/personagens/plants/repeater.png',
    'wallnut': '../../assets/img/personagens/plants/wallnut.png',
    'cherrybomb': '../../assets/img/personagens/plants/cherrybomb.png',
    'potatomine': '../../assets/img/personagens/plants/potatomine.png',
    'cardtombstone': '../../assets/img/personagens/zombies/cardtombstone.png',
    'zombie': '../../assets/img/personagens/zombies/zombie.png',
    'conehead': '../../assets/img/personagens/zombies/conehead.png',
    'buckethead': '../../assets/img/personagens/zombies/buckethead.png',
    'flagzombie': '../../assets/img/personagens/zombies/flagzombie.png',
    'football': '../../assets/img/personagens/zombies/football.png',
    'screendoor': '../../assets/img/personagens/zombies/screendoor.png',
};

dragItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

dropBoxes.forEach(box => {
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', dropEvent);
    box.addEventListener('dragleave', dragLeave);
});


function dragStart(ev){
    const dragClass = ev.target.classList[1];

    const div = document.createElement('div');
    div.style.backgroundImage = `url('${classToImage[dragClass]}')`;
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat'
    div.style.width = '100px';
    div.style.height = '100px';
    document.body.appendChild(div);

    ev.dataTransfer.setData('text/plain', classToImage[dragClass]);
    ev.dataTransfer.setDragImage(div, 0, 0);
}



function dragOver(ev){
    if (!this.classList.contains('grass-cutter')) {
    ev.preventDefault();
   

        if (conteudo1) {
            this.appendChild(conteudo1);
            centerImage(this);
        }
    }
}

function dropEvent(ev) {
    if(!this.classList.contains('ocupado')){
        ev.preventDefault();

    this.classList.remove('enter');

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

        this.classList.add("ocupado");
        this.appendChild(elemento);

        socket.emit('draggedItem', { position: [rowIndex, cellIndex], imageSrc: imgSrc });
    } else {
        console.error('Não foi possível obter os índices do tabuleiro.');
    }
}
}


function dragLeave(ev){
    ev.preventDefault();  
}

socket.on('itemPlaced', (data) => {
    const [i, j] = data.position;
    const cell = document.querySelector(`.linha${i + 1} .cell:nth-child(${j + 1})`);

    const dragClass = data.imageSrc.split('/').pop().split('.')[0];

    if (classToImage[dragClass]) {
        const imgSrc = classToImage[dragClass];
        const img = new Image();
        img.src = imgSrc;

        const elemento = document.createElement('div');
        elemento.classList.add("personagem");
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        elemento.appendChild(imgElement);

        tabuleiro[i][j] = dragClass.includes('plants') ? 'P' : 'Z';
        cell.appendChild(elemento);

        cell.classList.add('ocupado');
    } else {
        console.error('Tipo de card não reconhecido:', dragClass);
    }
});

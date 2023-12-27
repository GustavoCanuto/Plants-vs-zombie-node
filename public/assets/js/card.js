const socket = io();

const dragItems = document.querySelectorAll(".card");
const dropBoxes = document.querySelectorAll(".cell");

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
    const classToImage = {
        'sunflower': '../../assets/img/personagens/plants/sunflower.png',
        'peashooter': '../../assets/img/personagens/plants/peashooter.png',
        'showpea': '../../assets/img/personagens/plants/showpea.png',
        'repeater': '../../assets/img/personagens/plants/repeater.png',
        'wallnut': '../../assets/img/personagens/plants/wallnut.png',
        'cherrybomb': '../../assets/img/personagens/plants/cherrybomb.png',
        'potatomine': '../../assets/img/personagens/plants/potatomine.png',
        'cardtombstone': '../../assets/img/personagens/zombies/gravestone.png',
        'zombies': '../../assets/img/personagens/zombies/zombie.png',
        'conehead': '../../assets/img/personagens/zombies/conehead.png',
        'buckethead': '../../assets/img/personagens/zombies/buckethead.png',
        'flagzombie': '../../assets/img/personagens/zombies/flagzombie.png',
        'football': '../../assets/img/personagens/zombies/football.png',
        'screendoor': '../../assets/img/personagens/zombies/screendoor.png',
    };
    
    /*
    const img = new Image();
    img.src = classToImage[dragClass];
    
    ev.dataTransfer.setData('text/plain', img.src);
    ev.dataTransfer.setDragImage(img, 10, 10);
    */

    const div = document.createElement('div');
    div.style.backgroundImage = `url('${classToImage[dragClass]}')`;
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat'
    div.style.width = '100px';
    div.style.height = '100px';
    document.body.appendChild(div);

    ev.dataTransfer.setData('text/plain', classToImage[dragClass]);
    ev.dataTransfer.setDragImage(div, 0, 0);

   /*
    setTimeout(() => {
        document.body.removeChild(div);
    }, 0);
    */
}

function dragOver(ev){
    ev.preventDefault();
    this.className += " enter";
    console.log("Dragging")
}

function dropEvent(ev) {
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
        elemento.className = 'card';
        elemento.appendChild(img);
        cellElement.appendChild(elemento);

        socket.emit('draggedItem', { position: [rowIndex, cellIndex], imageSrc: imgSrc });
    } else {
        console.error('Não foi possível obter os índices do tabuleiro.');
    }
}

function dragLeave(ev){
    ev.preventDefault();
    this.className = 'cell';
}

socket.on('itemPlaced', (data) => {
    const [i, j] = data.position;
    const cell = document.querySelector(`.linha${i + 1} .cell:nth-child(${j + 1})`);

    if (data.imageSrc && data.imageSrc.includes('personagens/plants')) {
        tabuleiro[i][j] = 'P';
        const img = renderizarImagem('P');
        cell.innerHTML = '';
        cell.appendChild(img);
    } else if (data.imageSrc && data.imageSrc.includes('personagens/zombies')) {
        tabuleiro[i][j] = 'Z';
        const img = renderizarImagem('Z');
        cell.innerHTML = '';
        cell.appendChild(img)
    } else {
    }
});

function renderizarImagem(type) {
    const img = new Image();
    if (type === 'P') {
        img.src = '../../assets/img/personagens/plants/sunflower.png';
    } else if (type === 'Z') {
        img.src = '../../assets/img/personagens/zombies/zombie.png';
    }
    return img;
}

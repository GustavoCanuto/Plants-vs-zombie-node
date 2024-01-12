export class Personagens {
    constructor(imagePath, tempoRecarga, valorCard) {
        this.imagePath = imagePath;
        this.tempoRecarga = tempoRecarga;
        this.recarregado = true;
        this.valorCard = valorCard;
    }

    renderImage() {
        const imgElement = document.createElement('div');
        imgElement.style.backgroundImage = `url('${this.imagePath}')`;
        imgElement.style.backgroundSize = 'contain';
        imgElement.style.backgroundRepeat = 'no-repeat'
        return imgElement;
    }

}

const sunflower = new Personagens('../../assets/img/personagens/plants/sunflower.png', 7500, 50);
const peashooter = new Personagens('../../assets/img/personagens/plants/peashooter.png', 20000, 100);
const showpea = new Personagens('../../assets/img/personagens/plants/showpea.png', 20000, 150);
const repeater = new Personagens('../../assets/img/personagens/plants/repeater.png', 20000, 150);
const wallnut = new Personagens('../../assets/img/personagens/plants/wallnut.png', 30000, 50);
const cherrybomb = new Personagens('../../assets/img/personagens/plants/cherrybomb.png',20000, 150);
const potatomine = new Personagens('../../assets/img/personagens/plants/potatomine.png',10000, 25);
const cardtombstone = new Personagens('../../assets/img/personagens/zombies/cardtombstone.png', 7, 50);
const zombie = new Personagens('../../assets/img/personagens/zombies/zombie.png', 7000, 25);
const conehead = new Personagens('../../assets/img/personagens/zombies/conehead.png', 10000, 75);
const buckethead = new Personagens('../../assets/img/personagens/zombies/buckethead.png', 10000, 100);
const flagzombie = new Personagens('../../assets/img/personagens/zombies/flagzombie.png', 30000, 300);
const football = new Personagens('../../assets/img/personagens/zombies/football.png', 10000, 150);
const screendoor = new Personagens('../../assets/img/personagens/zombies/screendoor.png', 5000, 100);

export const personagens = {
    sunflower: sunflower,
    peashooter: peashooter,
    showpea: showpea,
    repeater: repeater,
    wallnut: wallnut,
    cherrybomb: cherrybomb,
    potatomine: potatomine,
    cardtombstone: cardtombstone,
    zombie: zombie,
    conehead: conehead,
    buckethead: buckethead,
    flagzombie: flagzombie,
    football: football,
    screendoor: screendoor
};
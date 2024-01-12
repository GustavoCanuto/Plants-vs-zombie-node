export class Personagens {
    constructor(imagePath, tempoRecarga) {
        this.imagePath = imagePath;
        this.tempoRecarga = tempoRecarga;
        this.recarregado = true;
    }

    renderImage() {
        const imgElement = document.createElement('div');
        imgElement.style.backgroundImage = `url('${this.imagePath}')`;
        imgElement.style.backgroundSize = 'contain';
        imgElement.style.backgroundRepeat = 'no-repeat'
        return imgElement;
    }

}

const sunflower = new Personagens('../../assets/img/personagens/plants/sunflower.png', 7);
const peashooter = new Personagens('../../assets/img/personagens/plants/peashooter.png', 2);
const showpea = new Personagens('../../assets/img/personagens/plants/showpea.png', 2);
const repeater = new Personagens('../../assets/img/personagens/plants/repeater.png', 2);
const wallnut = new Personagens('../../assets/img/personagens/plants/wallnut.png', 30);
const cherrybomb = new Personagens('../../assets/img/personagens/plants/cherrybomb.png',20);
const potatomine = new Personagens('../../assets/img/personagens/plants/potatomine.png',10);
const cardtombstone = new Personagens('../../assets/img/personagens/zombies/cardtombstone.png', 7);
const zombie = new Personagens('../../assets/img/personagens/zombies/zombie.png', 7);
const conehead = new Personagens('../../assets/img/personagens/zombies/conehead.png', 10);
const buckethead = new Personagens('../../assets/img/personagens/zombies/buckethead.png', 10);
const flagzombie = new Personagens('../../assets/img/personagens/zombies/flagzombie.png', 30);
const football = new Personagens('../../assets/img/personagens/zombies/football.png', 10);
const screendoor = new Personagens('../../assets/img/personagens/zombies/screendoor.png', 5);

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
export class Personagens {
    constructor(imagePath) {
        this.imagePath = imagePath;
    }

    renderImage() {
        const imgElement = document.createElement('div');
        imgElement.style.backgroundImage = `url('${this.imagePath}')`;
        imgElement.style.backgroundSize = 'contain';
        imgElement.style.backgroundRepeat = 'no-repeat'
        return imgElement;
    }
}

const sunflower = new Personagens('../../assets/img/personagens/plants/sunflower.png');
const peashooter = new Personagens('../../assets/img/personagens/plants/peashooter.png');
const showpea = new Personagens('../../assets/img/personagens/plants/showpea.png');
const repeater = new Personagens('../../assets/img/personagens/plants/repeater.png');
const wallnut = new Personagens('../../assets/img/personagens/plants/wallnut.png');
const cherrybomb = new Personagens('../../assets/img/personagens/plants/cherrybomb.png');
const potatomine = new Personagens('../../assets/img/personagens/plants/potatomine.png');
const cardtombstone = new Personagens('../../assets/img/personagens/zombies/cardtombstone.png');
const zombie = new Personagens('../../assets/img/personagens/zombies/zombie.png');
const conehead = new Personagens('../../assets/img/personagens/zombies/conehead.png');
const buckethead = new Personagens('../../assets/img/personagens/zombies/buckethead.png');
const flagzombie = new Personagens('../../assets/img/personagens/zombies/flagzombie.png');
const football = new Personagens('../../assets/img/personagens/zombies/football.png');
const screendoor = new Personagens('../../assets/img/personagens/zombies/screendoor.png');

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
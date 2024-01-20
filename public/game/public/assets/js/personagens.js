export class Personagens {
    constructor(imagePath, tempoRecarga, valorCard,vida) {
        this.imagePath = imagePath;
        this.tempoRecarga = tempoRecarga;
        this.valorCard = valorCard;
        this.vida = vida;
        this.recarregado = true;
        this.framesAnimation;
    }

    renderImage() {
        const imgElement = document.createElement('div');
        imgElement.style.backgroundImage = `url('${this.imagePath}')`;
        imgElement.style.backgroundSize = 'contain';
        imgElement.style.backgroundRepeat = 'no-repeat'
        return imgElement;
    }

    reduzirVida(dano) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.morrer();
        }
    }

    morrer() {
        // Lógica para quando o personagem morrer
        console.log(`${this.constructor.name} morreu.`);
    }

    clone() {
        // Cria uma nova instância da classe Personagens com os mesmos valores
        const clonedPersonagem = new Personagens(
            this.imagePath,
            this.tempoRecarga,
            this.valorCard,
            this.vida
        );

        // Se você tiver mais propriedades na classe, certifique-se de cloná-las também

        return clonedPersonagem;
    }

}

const sunflower = new Personagens('./assets/img/personagens/plants/sunflower.webp', 7500, 50,5);
const peashooter = new Personagens('./assets/img/personagens/plants/peashooter.webp', 20000, 100,5);
const showpea = new Personagens('./assets/img/personagens/plants/showpea.webp', 20000, 150,5);
const repeater = new Personagens('./assets/img/personagens/plants/repeater.webp', 20000, 150,5);
const wallnut = new Personagens('./assets/img/personagens/plants/wallnut.webp', 30000, 50,5);
const cherrybomb = new Personagens('./assets/img/personagens/plants/cherrybomb.webp',20000, 150,5);
const potatomine = new Personagens('./assets/img/personagens/plants/potatomine.webp',10000, 25,5);
const cardtombstone = new Personagens('./assets/img/personagens/zombies/cardtombstone.webp', 7500, 50,5);
const zombie = new Personagens('./assets/img/personagens/zombies/zombie.webp', 7000, 25,5);
const conehead = new Personagens('./assets/img/personagens/zombies/conehead.webp', 10000, 75,5);
const buckethead = new Personagens('./assets/img/personagens/zombies/buckethead.webp', 10000, 100,5);
const flagzombie = new Personagens('./assets/img/personagens/zombies/flagzombie.webp', 30000, 300,5);
const football = new Personagens('./assets/img/personagens/zombies/football.webp', 10000, 150,5);
const screendoor = new Personagens('./assets/img/personagens/zombies/screendoor.webp', 5000, 100,5);

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
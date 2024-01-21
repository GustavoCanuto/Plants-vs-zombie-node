export class Personagens {

    static contadorId = 0;

    constructor(imagePath, tempoRecarga, valorCard,vida, velocidadeCaminhar, ataque) {
        this.imagePath = imagePath;
        this.tempoRecarga = tempoRecarga;
        this.valorCard = valorCard;
        this.vida = vida;
        this.velocidadeCaminhar = velocidadeCaminhar;
        this.ataque = ataque;
        this.recarregado = true;
        this.framesAnimation;
        this.id = `pN${Personagens.contadorId++}ID` ;
        
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
        console.log(this.vida)
        if (this.vida <= 0) {
            console.log(this.vida)
          return true;
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
            this.vida,
            this.velocidadeCaminhar,
            this.ataque
        );

        // Se você tiver mais propriedades na classe, certifique-se de cloná-las também

        return clonedPersonagem;
    }

}

const sunflower = new Personagens('./assets/img/personagens/plants/sunflower.webp', 7500, 50,7,0,0);
const peashooter = new Personagens('./assets/img/personagens/plants/peashooter.webp', 20000, 100,10,0,1);
const showpea = new Personagens('./assets/img/personagens/plants/showpea.webp', 20000, 150,5,0,1);
const repeater = new Personagens('./assets/img/personagens/plants/repeater.webp', 20000, 150,5,0,1);
const wallnut = new Personagens('./assets/img/personagens/plants/wallnut.webp', 30000, 50,30,0,0);
const cherrybomb = new Personagens('./assets/img/personagens/plants/cherrybomb.webp',20000, 150,5,0,30);
const potatomine = new Personagens('./assets/img/personagens/plants/potatomine.webp',10000, 25,5,);
const cardtombstone = new Personagens('./assets/img/personagens/zombies/cardtombstone.webp', 7500, 50,5,0);
const zombie = new Personagens('./assets/img/personagens/zombies/zombie.webp', 7000, 25,5 ,0.15,1);
const conehead = new Personagens('./assets/img/personagens/zombies/conehead.webp', 10000, 75,8,0.25,3);
const buckethead = new Personagens('./assets/img/personagens/zombies/buckethead.webp', 10000, 100,10,0.15,1);
const flagzombie = new Personagens('./assets/img/personagens/zombies/flagzombie.webp', 30000, 300,7,0.35,2);
const football = new Personagens('./assets/img/personagens/zombies/football.webp', 10000, 150,7,0.6,2);
const screendoor = new Personagens('./assets/img/personagens/zombies/screendoor.webp', 5000, 100,12,0.15,1);

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
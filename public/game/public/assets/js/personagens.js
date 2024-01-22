import { pararAnimacao } from "./animacoes/framesAnimacao.js";

export class Personagens {

    static contadorId = 0;

    constructor(imagePath, tempoRecarga, valorCard, vida, velocidadeCaminhar, ataque) {
        this.imagePath = imagePath;
        this.tempoRecarga = tempoRecarga;
        this.valorCard = valorCard;
        this.vida = vida;
        this.velocidadeCaminhar = velocidadeCaminhar;
        this.ataque = ataque;
        this.recarregado = true;
        this.framesAnimation;
        this.id = `pN${Personagens.contadorId++}ID`;
        this.nomePersonagem = this.imagePath.split('/').pop().split('.')[0];
        this.mastigando = false;


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
        console.log(this.nomePersonagem)

        //wallnut
        if (this.nomePersonagem == 'wallnut') {
            let gifElement = document.getElementById(this.id).firstChild;
            if (this.vida > 8 && this.vida < 22) {
                pararAnimacao(this.id)
                gifElement.src = 'assets/img/danoPersonagens/wallnut/Wallnut_cracked1.gif'
            } else if ((this.vida > 0 && this.vida <= 8)) {
                pararAnimacao(this.id)
                gifElement.src = 'assets/img/danoPersonagens/wallnut/Wallnut_cracked2.gif'
            }
        }

        //potatomine
        if (this.nomePersonagem == 'potatomine') {
            let divImage = document.getElementById(this.id);
            let gifElement2 = document.createElement('img');
            let gifElement = divImage.firstChild;
            pararAnimacao(this.id)
            gifElement.src = 'assets/img/danoPersonagens/potatoMine/PotatoMine_mashed.gif'
            gifElement2.src = 'assets/img/danoPersonagens/potatoMine/ExplosionSpudow.gif'
            gifElement2.style.position = 'absolute'
            // gifElement2.style.opacity = '1'
            gifElement2.style.transform = "scale(0.4)"
            gifElement2.style.transition = "all 2s ease"
            gifElement2.style.width = '180%'
            gifElement2.style.left = '-40%'
            divImage.appendChild(gifElement2);
            divImage.style.transform = "scale(1.4)"


            setTimeout(() => {
                gifElement2.style.opacity = '0'
            }, 100);

            setTimeout(() => {
                divImage.removeChild(gifElement2);
            }, 1800);

        }

        //chomper
        if (this.nomePersonagem == 'cherrybomb') {

      
        if(!this.mastigando){

            let intervalMastigando;

            let divImage = document.getElementById(this.id);

            let gifElement = divImage.firstChild;

            pararAnimacao(this.id)

            gifElement.src = 'assets/img/danoPersonagens/chomper/ChomperAttack.gif'

            setTimeout(() => {

                intervalMastigando = setInterval(() => {
                    gifElement.src = 'assets/img/danoPersonagens/chomper/ChomperDigest.gif'
                }, 500);
                this.ataque = 0;
                this.mastigando = true;
            }, 700);

            setTimeout(() => {
                clearInterval(intervalMastigando)
                this.ataque = 30;
                gifElement.src = 'assets/img/danoPersonagens/chomper/Chomper.gif'
                this.mastigando = false;
            }, 10000); // 40s

        }
      
        }


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

const sunflower = new Personagens('./assets/img/personagens/plants/sunflower.webp', 7500, 50, 7, 0, 0);
const peashooter = new Personagens('./assets/img/personagens/plants/peashooter.webp', 20000, 100, 10, 0, 0);
const showpea = new Personagens('./assets/img/personagens/plants/showpea.webp', 20000, 150, 5, 0, 1);
const repeater = new Personagens('./assets/img/personagens/plants/repeater.webp', 20000, 150, 5, 0, 1);
const wallnut = new Personagens('./assets/img/personagens/plants/wallnut.webp', 30000, 50, 30, 0, 0);
const cherrybomb = new Personagens('./assets/img/personagens/plants/cherrybomb.png', 20000, 150, 15, 0, 30); //ataque muda para 0 
const potatomine = new Personagens('./assets/img/personagens/plants/potatomine.webp', 10000, 25, 0, 0, 30);
const cardtombstone = new Personagens('./assets/img/personagens/zombies/cardtombstone.webp', 7500, 50, 14, 0);
const zombie = new Personagens('./assets/img/personagens/zombies/zombie.webp', 7000, 25, 5, 0.15, 1);
const conehead = new Personagens('./assets/img/personagens/zombies/conehead.webp', 10000, 75, 8, 0.25, 3);
const buckethead = new Personagens('./assets/img/personagens/zombies/buckethead.webp', 10000, 100, 10, 0.15, 1);
const flagzombie = new Personagens('./assets/img/personagens/zombies/flagzombie.webp', 30000, 300, 7, 0.35, 2);
const football = new Personagens('./assets/img/personagens/zombies/football.webp', 10000, 150, 7, 0.6, 2);
const screendoor = new Personagens('./assets/img/personagens/zombies/screendoor.webp', 5000, 100, 12, 0.15, 1);

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
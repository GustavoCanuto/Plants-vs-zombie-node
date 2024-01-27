import { pararAnimacao } from "./animacoes/framesAnimacao.js";
import { pararAnimacaoTiro } from "./animacoes/animacaoTiro.js";

export class Personagens {

    static contadorId = 0;
    static contadorVitoriaPlanta = 0;

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
        this.vivo = true;
        this.velocidadeCaminharDefinitiva = this.velocidadeCaminhar;


    }

    renderImage() {
        const imgElement = document.createElement('div');
        imgElement.style.backgroundImage = `url('${this.imagePath}')`;
        imgElement.style.backgroundSize = 'contain';
        imgElement.style.backgroundRepeat = 'no-repeat'
        return imgElement;
    }

    golpeEspecial(especial,zombieElemento) {

        if (this.velocidadeCaminhar > 0) {
            if (especial) {
                let novaVelocidade = this.velocidadeCaminharDefinitiva * 0.7;
                this.velocidadeCaminhar = novaVelocidade;
              //  zombieElemento.style.filter = 'grayscale(100%) brightness(50%) sepia(100%)'; //efeito para morte 
              zombieElemento.style.filter = 'brightness(120%) hue-rotate(190deg)';
                setTimeout(() => {
                    this.velocidadeCaminhar = this.velocidadeCaminharDefinitiva;
                    zombieElemento.style.filter = 'none';
                }, 2000)
            }
        }
    }
    reduzirVida(dano) {

        if (this.vivo) {
            this.vida -= dano;
            //  console.log(this.vida)
            //  console.log(this.nomePersonagem)

            //wallnut
            if (this.nomePersonagem == 'wallnut') {
                let div = document.getElementById(this.id);
                if (div) {
                    let gifElement = div.firstChild;
                    if (this.vida > 8 && this.vida < 22) {
                        pararAnimacao(this.id)
                        gifElement.src = 'assets/img/danoPersonagens/wallnut/Wallnut_cracked1.gif'
                    } else if ((this.vida > 0 && this.vida <= 8)) {
                        pararAnimacao(this.id)
                        gifElement.src = 'assets/img/danoPersonagens/wallnut/Wallnut_cracked2.gif'
                    }
                }
            }

            //cardstone and target 
            //'brightness(70%) sepia(20%)';
            if (this.nomePersonagem == 'cardtombstone'||this.nomePersonagem == 'Zombie_Target1') {
                let div = document.getElementById(this.id);
             
                if(div){
                    if (this.vida < 5) {
                        div.style.filter = 'brightness(70%) sepia(20%)';
                    } 
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


                if (!this.mastigando) {



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
                    }, 25000); // 40s

                }

            }



            if (this.vida <= 0) {

                if (this.nomePersonagem == 'Zombie_Target1') {

                    // console.log("planta ganhou um tagert");
                    // console.log(Personagens.contadorVitoriaPlanta);

                    Personagens.contadorVitoriaPlanta++;

                    if (Personagens.contadorVitoriaPlanta >= 3) {

                        alert("Plantas Venceu!")
                        location.reload();
                        return;
                    }
                }

                if (this.nomePersonagem === 'peashooter') {
                    pararAnimacaoTiro(this.id);
                } else if (this.nomePersonagem === 'showpea') {
                    pararAnimacaoTiro(this.id);
                } else if (this.nomePersonagem === 'repeater') {
                    pararAnimacaoTiro(this.id);
                }

                if (this.vivo) {
                    this.vivo = false;
                    return true;
                }
            }
        }
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

const sunflower = new Personagens('./assets/img/personagens/plants/sunflower.webp', 15000, 50, 10, 0, 0);
const peashooter = new Personagens('./assets/img/personagens/plants/peashooter.webp', 25000, 100, 13, 0, 0);
const showpea = new Personagens('./assets/img/personagens/plants/showpea.webp', 25000, 150, 13, 0, 1);
const repeater = new Personagens('./assets/img/personagens/plants/repeater.webp', 25000, 150, 13, 0, 1);
const wallnut = new Personagens('./assets/img/personagens/plants/wallnut.webp', 35000, 50, 33, 0, 0);
const cherrybomb = new Personagens('./assets/img/personagens/plants/cherrybomb.png', 35000, 150, 15, 0, 30); //ataque muda para 0 
const potatomine = new Personagens('./assets/img/personagens/plants/potatomine.webp', 25000, 25, 0, 0, 30);
const cardtombstone = new Personagens('./assets/img/personagens/zombies/cardtombstone.webp', 15000, 50, 14, 0);
const zombie = new Personagens('./assets/img/personagens/zombies/zombie.webp', 20000, 25, 7, 0.14, 1);
const conehead = new Personagens('./assets/img/personagens/zombies/conehead.png', 65000, 75, 12, 0.25, 3);
const buckethead = new Personagens('./assets/img/personagens/zombies/buckethead.webp', 20000, 100, 12, 0.17, 1);
const flagzombie = new Personagens('./assets/img/personagens/zombies/flagzombie.png', 2000, 300, 8, 0.35, 2);
const football = new Personagens('./assets/img/personagens/zombies/football.webp', 35000, 150, 10, 0.6, 2);
const screendoor = new Personagens('./assets/img/personagens/zombies/screendoor.webp', 22000, 100, 13, 0.15, 1);
const carrinho = new Personagens('./assets/img/personagens/plants/LawnCleaner.png', 0, 0, 5000, 0, 5000);
const target = new Personagens('./assets/img/personagens/zombies/Zombie_Target1.gif', 0, 0, 7, 0, 10);

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
    screendoor: screendoor,
    carrinho: carrinho,
    target: target
};
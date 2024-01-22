import * as comandosNavBar from '../comandos/comandosNavBar.js';
import { personagens } from "../personagens.js";
import { pontuacaoLado } from "../pontuacao.js";
import { criarAnimacaoZombie } from "./animacaoZombie.js";
import { iniciarAnimacaoTiro } from "./animacaoTiro.js";
import { recargaCard } from "./recarga.js";
import { iniciarAnimacao,carregarFrames } from "./framesAnimacao.js";
import { iniciarAnimacaoPontuacao } from "./animacaoPontuacao.js";

export class AnimacaoCartas {

    static personagensJogando = [];
    static zombieNaLinha = {linha1: 0, linha2: 0, linha3: 0, linha4: 0, linha5: 0};

    static framesPorClasse = {
        sunflower: 25,
        peashooter: 25,
        showpea: 25,
        repeater: 25,
        wallnut: 17,
        cherrybomb: 25,
        potatomine: 11,
        cardtombstone: 1,
        zombie: 47,
        conehead: 20,
        buckethead: 47,
        flagzombie: 20,
        football: 30,
        screendoor: 47,
    };

    static criarAnimacaoCarta(cellElement, img) {
        const imgSrc = img;

        if (!imgSrc.includes('/img/personagens/')) {
            console.error('Imagem Inválida');
            return;
        }

        if (!cellElement) {
            console.error('Não foi possível obter os índices do tabuleiro.');
            return;
        }

        const nomeClasse = imgSrc.split('/').pop().split('.')[0];
        const isPlanta = ['sunflower', 'peashooter', 'showpea', 'repeater', 'wallnut', 'cherrybomb', 'potatomine'].includes(nomeClasse);

        if (isPlanta) {
           
            const personagemNome = comandosNavBar.cellNavBarAtual[0].getAttribute('data-personagem');

            if (personagens[personagemNome].valorCard <= pontuacaoLado[0] && personagens[personagemNome].recarregado) {

                this.criarAnimacaoPlanta(cellElement, nomeClasse, personagemNome);

                let listaCard = document.querySelectorAll('.navbar-planta .card');

                recargaCard(0, personagens[personagemNome], listaCard)

            } else {
                console.log("carta indisponivel")
            }

        } else {

            const personagemNome = comandosNavBar.cellNavBarAtual[1].getAttribute('data-personagem');

            if (personagens[personagemNome].valorCard <= pontuacaoLado[1]
                && personagens[personagemNome].recarregado) {

                this.criarAnimacaoZombie(cellElement, nomeClasse, personagemNome,personagens[personagemNome]);

                let listaCard = document.querySelectorAll('.navbar-zombie .card');

                recargaCard(1, personagens[personagemNome],listaCard)

            } else {
                console.log("carta indisponivel")
            }

        }
    }

    static criarAnimacaoPlanta(cellElement, nomeClasse,personagemNome) {

        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        let novoPersonagem = personagens[personagemNome].clone();
        let idNovoPersonagem =  novoPersonagem.id;
        console.log(novoPersonagem.id)
        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        elemento.id = idNovoPersonagem
        elemento.style.width = '90%';
        //console.log(`tamanho-${personagemNome}`)
        elemento.classList.add(`tamanho-${personagemNome}`);
        const gifElement = document.createElement('img');

        if(nomeClasse != 'potatomine') {
            
            elemento.classList.add('personagemPlanta');
        }

        else if(nomeClasse == 'potatomine'){
            gifElement.src = 'assets/img/danoPersonagens/potatoMine/PotatoMineNotReady.gif';
            setTimeout(() => { 
                elemento.classList.add('personagemPlanta');
                iniciarAnimacao(frames, gifElement,idNovoPersonagem);
            },10000);

        }

        elemento.appendChild(gifElement);
        cellElement.appendChild(elemento);
        elemento.closest('.cell').classList.add('ocupado')

        AnimacaoCartas.personagensJogando.push({idNovoPersonagem : novoPersonagem })
        if(nomeClasse != 'potatomine') iniciarAnimacao(frames, gifElement,idNovoPersonagem);
        iniciarAnimacaoTiro(cellElement, nomeClasse, idNovoPersonagem);
        iniciarAnimacaoPontuacao(cellElement, nomeClasse);
    }

 
    static criarAnimacaoZombie(cellElement, nomeClasse,personagemNome) {


        let novoPersonagem = personagens[personagemNome].clone();
        let idNovoPersonagem =  novoPersonagem.id;

        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        elemento.classList.add('personagemZombie');
        elemento.id = idNovoPersonagem
        elemento.style.width = '10%';
        elemento.classList.add(`tamanho-${personagemNome}`);
        const gifElement = document.createElement('img');
        gifElement.style.width = '100%';
        elemento.appendChild(gifElement);
        let tabuleiro = document.querySelector('.board');
        AnimacaoCartas.personagensJogando.push({idNovoPersonagem : novoPersonagem })

        let classeLinha = cellElement.closest(".row").className.split(' ');
        let linhaAtiva = classeLinha[1];

        AnimacaoCartas.zombieNaLinha[linhaAtiva] += 1;

        console.log(linhaAtiva + " " + AnimacaoCartas.zombieNaLinha[linhaAtiva]);

        if (!tabuleiro) {
            console.error('Elemento .board não encontrado.');
            return;
        }

        tabuleiro.appendChild(elemento);

        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        criarAnimacaoZombie(cellElement,gifElement, elemento, tabuleiro,frames,personagens[personagemNome], idNovoPersonagem)

        iniciarAnimacaoPontuacao(cellElement, nomeClasse);

        elemento.classList.remove('adicionado');
    }
  
}

export default AnimacaoCartas;

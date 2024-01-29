import * as comandosNavBar from '../comandos/comandosNavBar.js';
import { personagens } from "../personagens.js";
import { pontuacaoLado } from "../pontuacao.js";
import { criarAnimacaoZombie } from "./animacaoZombie.js";
import { iniciarAnimacaoTiro } from "./animacaoTiro.js";
import { recargaCard } from "./recarga.js";
import { iniciarAnimacao, carregarFrames } from "./framesAnimacao.js";
import { iniciarAnimacaoPontuacao } from "./animacaoPontuacao.js";

export class AnimacaoCartas {

    static personagensJogando = [];
    static zombieNaLinha = { linha1: 0, linha2: 0, linha3: 0, linha4: 0, linha5: 0 };

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
            return;
        }

        if (!cellElement) {
            console.error('Não foi possível obter os índices do tabuleiro.');
            return;
        }

        const nomeClasse = imgSrc.split('/').pop().split('.')[0];
        const isPlanta = ['sunflower', 'peashooter', 'showpea', 'repeater', 'wallnut', 'cherrybomb', 'potatomine'].includes(nomeClasse);

        if (isPlanta) {


            if (cellElement.classList.contains('plant')) {

                const personagemNome = comandosNavBar.cellNavBarAtual[0].getAttribute('data-personagem');

                if (personagens[personagemNome].valorCard <= pontuacaoLado[0] && personagens[personagemNome].recarregado) {

                    //usar socket aqui
                    AnimacaoCartas.dropPersonagemEmit(cellElement.id, nomeClasse, personagemNome, 0);
                    socket2.emit("dropPersonagem", { cellID: cellElement.id, nomeClasse: nomeClasse, personagemNome: personagemNome, lado: 0, sala: sala });

                } else {
                    // console.log("carta indisponivel")
                }
            }

        } else {

            if (cellElement.classList.contains('zombies')) {

                const personagemNome = comandosNavBar.cellNavBarAtual[1].getAttribute('data-personagem');

                if (personagens[personagemNome].valorCard <= pontuacaoLado[1]
                    && personagens[personagemNome].recarregado) {

                    AnimacaoCartas.dropPersonagemEmit(cellElement.id, nomeClasse, personagemNome, 1);
                    socket2.emit("dropPersonagem", { cellID: cellElement.id, nomeClasse: nomeClasse, personagemNome: personagemNome, lado: 1, sala: sala });

                } else {
                    // console.log("carta indisponivel")
                }
            }

        }
    }

    static dropPersonagemEmit(cellElementID, nomeClasse, personagemNome, lado) {

        let cellElement = document.getElementById(cellElementID);
        let listaCard;

        if (lado == 1) {

            let tumba = false;

            if (nomeClasse == 'cardtombstone') {

          

                if (!cellElement.classList.contains('tumba')) {
                    tumba = true;
           
                }else{
      
                    return;
                }
            }
            //console.log(tumba)
            this.criarAnimacaoZombie(cellElement, nomeClasse, personagemNome,tumba);
            listaCard = document.querySelectorAll('.navbar-zombie .card');

        }

        else if (lado == 0) {
            this.criarAnimacaoPlanta(cellElement, nomeClasse, personagemNome);
            listaCard = document.querySelectorAll('.navbar-planta .card');
        }

        recargaCard(lado, personagens[personagemNome], listaCard);

    }
    static criarAnimacaoPlanta(cellElement, nomeClasse, personagemNome) {

        const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
        const frames = carregarFrames(nomeClasse, numberOfFrames);

        if (frames.length === 0) {
            console.error('Não foi possível carregar os frames da animação.');
            return;
        }

        let novoPersonagem = personagens[personagemNome].clone();
        let idNovoPersonagem = novoPersonagem.id;
    
        const elemento = document.createElement('div');
        elemento.classList.add('personagem');
        elemento.id = idNovoPersonagem
        elemento.style.width = '90%';

        elemento.classList.add(`tamanho-${personagemNome}`);
        const gifElement = document.createElement('img');

        if (nomeClasse != 'potatomine') {

            elemento.classList.add('personagemPlanta');
        }

        else if (nomeClasse == 'potatomine') {
            gifElement.src = 'assets/img/danoPersonagens/potatoMine/PotatoMineNotReady.gif';
            setTimeout(() => {
                elemento.classList.add('personagemPlanta');
                iniciarAnimacao(frames, gifElement, idNovoPersonagem);
            }, 10000);

        }

        elemento.appendChild(gifElement);
        cellElement.appendChild(elemento);
        elemento.closest('.cell').classList.add('ocupado')

        AnimacaoCartas.personagensJogando.push({ idNovoPersonagem: novoPersonagem })
        if (nomeClasse != 'potatomine') iniciarAnimacao(frames, gifElement, idNovoPersonagem);
        iniciarAnimacaoTiro(cellElement, nomeClasse, idNovoPersonagem);
        iniciarAnimacaoPontuacao(cellElement, nomeClasse);
    }


    static criarAnimacaoZombie(cellElement, nomeClasse, personagemNome,tumba) {
 

        if (tumba) {

            
                let novoPersonagem = personagens[personagemNome].clone();
                let idNovoPersonagem = novoPersonagem.id;

                const elemento = document.createElement('div');
                elemento.classList.add('personagem');
                elemento.id = idNovoPersonagem
                elemento.style.width = '100%';
              
                elemento.classList.add(`tamanho-${personagemNome}`);
                const gifElement = document.createElement('img');
                elemento.classList.add('personagemZombie');

                elemento.appendChild(gifElement);
                cellElement.appendChild(elemento);
                elemento.closest('.cell').classList.add('tumba')
                const numberOfFrames = this.framesPorClasse[nomeClasse] || 0;
                const frames = carregarFrames(nomeClasse, numberOfFrames);

                iniciarAnimacao(frames, gifElement, idNovoPersonagem);
                iniciarAnimacaoPontuacao(cellElement, nomeClasse, idNovoPersonagem);
                AnimacaoCartas.personagensJogando.push({ idNovoPersonagem: novoPersonagem })

                let classeLinha = cellElement.closest(".row").className.split(' ');
                let linhaAtiva = classeLinha[1];

                AnimacaoCartas.zombieNaLinha[linhaAtiva] += 1;

        } else {

            let novoPersonagem = personagens[personagemNome].clone();
            let idNovoPersonagem = novoPersonagem.id;

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
            AnimacaoCartas.personagensJogando.push({ idNovoPersonagem: novoPersonagem })

            let classeLinha = cellElement.closest(".row").className.split(' ');
            let linhaAtiva = classeLinha[1];

            AnimacaoCartas.zombieNaLinha[linhaAtiva] += 1;

   

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

            criarAnimacaoZombie(cellElement, gifElement, elemento, tabuleiro, frames, personagens[personagemNome], idNovoPersonagem)

            iniciarAnimacaoPontuacao(cellElement, nomeClasse, idNovoPersonagem);

            elemento.classList.remove('adicionado');
        }
    }

}

export default AnimacaoCartas;

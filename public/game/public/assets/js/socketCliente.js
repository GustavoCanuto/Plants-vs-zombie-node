import AnimacaoCartas from './animacaoCartas.js';
import { criarPreviaPersonagem, moveNavBar, dropPersonagem } from './comandos/comandosNavBar.js';
import {criarPontos} from "./pontuacao.js";
import {atualizarLadoOnline} from "./botoes/trocaMouseLado.js";

socket2.on('fazerAnimacao', (data) => {
  AnimacaoCartas.criarAnimacaoCarta(data.cell, data.img);
});

socket2.on('atualizaPontuacaoClient', (lado) => {
    criarPontos(lado);
});

socket2.on('mouseMoveDentroDoTabuleiroClient', (data) => {
  movimentoMouseFuction(data.clientX, data.clientY, data.alturaDoBody, data.larguraDoBody, data.LadoQueUsaMouse)
});

socket2.on('mouseEnterCelulaClient', (data) => {
  functionMouseEnterCelula(data.cellID, data.LadoQueUsaMouse, data.chaveMouse)
});

socket2.on('navBarEnterClient', (data) => {
  criarPreviaPersonagem(data.cellID, data.LadoQueUsaMouse)
});


socket2.on('wheelNavBarClient', (data) => {
  moveNavBar(data.direction, data.LadoQueUsaMouse)
});


socket2.on('dropPersonagemClient', (data) => {
  dropPersonagem(data.cellID, data.imgPreviaPersonagem)
});

socket2.on('iniciarJogo', () => {
  atualizarLadoOnline();
});
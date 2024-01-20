import AnimacaoCartas from './animacoes/animacaoCartas.js';
import { criarPreviaPersonagem, moveNavBar, dropPersonagem } from './comandos/comandosNavBar.js';
import {criarPontos} from "./pontuacao.js";
import {atualizarLadoOnline, jogarLocal} from "./botoes/trocaMouseLado.js";
import {moverSeletor} from "./comandos/teclado/teclado.js";
import {movimentarCursorGamePad, centerImageGamePad} from "./comandos/gamepad/movimentosControle.js";

socket2.on('fazerAnimacao', (data) => {
  AnimacaoCartas.criarAnimacaoCarta(data.cell, data.img);
});

socket2.on('atualizaPontuacaoClient', (lado) => {
    criarPontos(lado);
});

socket2.on('mouseMoveDentroDoTabuleiroClient', (data) => {
  movimentoMouseFuction(data.chaveMouse,data.rectTabuleiro, data.mainTop, data.mainAltura, data.clientX, data.clientY, data.alturaDoBody, data.larguraDoBody, data.LadoQueUsaMouse)
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

socket2.on('movimentoTecladoClient', (targetCell,lado,chaveLado) => {
  moverSeletor(targetCell,lado,chaveLado);
});

socket2.on('movimentoGamePadClient', (lado, analogMoveX, analogMoveY) => {
  movimentarCursorGamePad(lado, analogMoveX, analogMoveY);
});

socket2.on('centerImageGamePadClient', (lado,chaveLado) => {
  centerImageGamePad(lado,chaveLado);
});

socket2.on('iniciarJogo', () => {
  atualizarLadoOnline();
});

jogarLocal(local);
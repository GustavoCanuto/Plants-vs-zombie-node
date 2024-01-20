import { navBarEnter } from '../comandos/mouse/mouseNavBar.js';
import { game } from '../cartas.js';
import { cairPontuacao } from "../pontuacao.js";

var btnGravarOpcaoMouse = document.getElementById('gravarOpcaoMouse');

btnGravarOpcaoMouse.addEventListener('click', gravarOpcaoMouse);

var btnGravarOpcaoGamePad = document.getElementById('gravarOpcaoGamePad');

btnGravarOpcaoGamePad.addEventListener('click', GravarOpcaoGamePad);

function GravarOpcaoGamePad() {

    var opcoesGamePad = document.getElementsByName('opcaoGamePad');

    for (var i = 0; i < opcoesGamePad.length; i++) {
        if (opcoesGamePad[i].checked) {

            if (opcoesGamePad[i].value == "plantas") ladoPlayerGamePad = 0;
            else if (opcoesGamePad[i].value == "zombies") ladoPlayerGamePad = 1;


            break;
        }
    }
    console.log("Lado que usa o gamepad: " + ladoPlayerGamePad);
    alert("alterado com sucesso")
    // chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
    // cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;
    // mouseEnterCelula();
    // navBarEnter();
    // game.atualizarLado();

}

function gravarOpcaoMouse() {

    var opcoesMouse = document.getElementsByName('opcaoMouse');

    for (var i = 0; i < opcoesMouse.length; i++) {
        if (opcoesMouse[i].checked) {

            if (opcoesMouse[i].value == "plantas") LadoQueUsaMouse = 0;
            else if (opcoesMouse[i].value == "zombies") LadoQueUsaMouse = 1;
            else LadoQueUsaMouse = 2;

            break;
        }
    }
    console.log("Lado que usa o mouse: " + LadoQueUsaMouse);
    alert("alterado com sucesso")
    chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
    cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;
    mouseEnterCelula();
    navBarEnter();
    game.atualizarLado();

}

export function atualizarLadoOnline() {

    $(".messagemCarregamento").css("display", "none"); 
    $(".contagemJogo").css("display", "flex");

   let contador = 3;

   let intervalID = setInterval(() => {

    contador--;

     if (contador != 0) $('#contadorInicioJogo').text(contador);

       
        if (contador == 0) { 
           clearInterval(intervalID);
        }

    }, 1000);

    setTimeout(() => {

        if(ladoJogador==0) $('#contadorInicioJogo').text("Plante!");
        else $('#contadorInicioJogo').text("Ataque!");
        $(".carregamento").css("backgroundColor", "rgba(8, 8, 8, 0.007)");
        $(".contagemJogo").css("opacity", "0");
    
    }, 3000);

    setTimeout(() => {
        $(".carregamento").css("display", "none");
        gamePadBloqueado = false;
        tecladoBloqueado = false;
        console.log("iniciar Jogo")
        console.log(ladoJogador)
        LadoQueUsaMouse = ladoJogador;
        chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
        cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo : cursorTabuleiroAzul;
        mouseEnterCelula();
        navBarEnter();
        game.atualizarLado();
        cairPontuacao(false, true);
        limparTeclas(LadoQueUsaMouse)
        ladoPlayerGamePad = ladoJogador;


        if (ladoJogador == 1) $('#btnControlePlantas').prop("disabled", true);
        else $('#btnControleZombies').prop("disabled", true);

        local = false;
    
    }, 4000);


}

export function jogarLocal(local) {
    cairPontuacao(local)
}
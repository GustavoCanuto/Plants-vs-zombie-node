socket2.on('iniciarJogo', () => {
    console.log("iniciar Jogo")
    LadoQueUsaMouse = ladoJogador;
    chaveMouse = Object.keys(celulaAtual[LadoQueUsaMouse]);
    cursorTabuleiroMouse = LadoQueUsaMouse == 0 ? cursorTabuleiroAmarelo: cursorTabuleiroAzul;
    mouseEnterCelula();
    navBarEnter();
    game.atualizarLado();
});
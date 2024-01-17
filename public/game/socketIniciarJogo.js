socket2.on('iniciarJogo', () => {
    console.log("iniciar Jogo")
    LadoQueUsaMouse = ladoJogador;
    chaveMouse = Object.keys(celulaAtual[ladoJogador]);
    cursorTabuleiroMouse = ladoJogador == 0 ? cursorTabuleiroAmarelo: cursorTabuleiroAzul;
});

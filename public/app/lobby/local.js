let jogarLocal = document.querySelector(".jogar-local");
let nomeUsuario;

jogarLocal.addEventListener("click", ()=>{
    window.location.href = `game/public/index.html?local=true&lado=${ladoJogador}&cenario=${cenario}&nome=${nomeUsuario}`
})
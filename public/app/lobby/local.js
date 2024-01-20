let jogarLoal = document.querySelector(".jogar-local");

jogarLoal.addEventListener("click", ()=>{
    window.location.href = `game/public/index.html?local=true`
})
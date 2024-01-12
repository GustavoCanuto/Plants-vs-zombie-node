import { personagens } from "./personagens.js";


var pontoPlantas = document.getElementById("pontosPlanta");
var pontoZombies = document.getElementById("pontosZombie");
export var pontuacaoLado = [5000, 5000];
export var pontosLado = [pontoPlantas, pontoZombies]
var board = document.querySelector('.board')

var desativarCodigoTemporariamente = true;

function cairPontos(lado) {

  let posicaoTop = -7
  let topLimite = Math.random() < 0.75 ? 83 : 51;
  let pontuacao;
  let posicaoLeft;
  let listaCard;
  if (lado == 0) {
    posicaoLeft = Math.floor(Math.random() * (48 - 18 + 1)) + 18;
    pontuacao = criarSol();
    pontuacao.style.left = `${posicaoLeft}%`
    listaCard = document.querySelectorAll('.navbar-planta .card');
  }else{
    listaCard = document.querySelectorAll('.navbar-zombie .card');
    posicaoLeft = Math.floor(Math.random() * (95 - 68 + 1)) + 68;
    pontuacao = criarCerebro();
    pontuacao.style.left = `${posicaoLeft}%`
  }

  pontuacao.style.top = "-7%"
  let setIntervalSolCaindo = setInterval(() => {

    var chaveLado = Object.keys(celulaAtual[lado]);
    if (verificaColisaoCelular(pontuacao, celulaAtual[lado][chaveLado])) {
      setTimeout(() => {
        pontuacao.style.transition = 'all 0.5s ease'
        pontuacao.style.top = lado == 0 ? "-21%": "-21%";
        pontuacao.style.left = lado == 0 ? "6%": "100%";
        setTimeout(() => {
          pontuacao.style.opacity = 0;
          setTimeout(() => {
            board.removeChild(pontuacao);
          }, 600);
        }, 400);
        pontuacaoLado[lado] += 50;
        pontosLado[lado].textContent = pontuacaoLado[lado];
        listaCard.forEach(cardNome=> {
          console.log(cardNome.getAttribute('data-personagem'))
          console.log(personagens[cardNome.getAttribute('data-personagem')].valorCard )
          console.log('pontuacao' + pontuacaoLado[lado] )
          if(personagens[cardNome.getAttribute('data-personagem')].valorCard <= pontuacaoLado[lado]){
            console.log('adicionou')
              cardNome.classList.remove('semSaldo')
          }else{
            console.log('removeu')
            cardNome.classList.add('semSaldo')
          }
        
       });

      }, 50);

      clearInterval(setIntervalSolCaindo)
    }

    posicaoTop++;

    //console.log(posicaoTop)
    if (posicaoTop < topLimite) {
      pontuacao.style.top = `${posicaoTop}%`
    } else {
      setTimeout(() => {
        pontuacao.style.opacity = 0.7;
      }, 2000);
      setTimeout(() => {
        if (board.contains(pontuacao)) {
          board.removeChild(pontuacao);
        }
        clearInterval(setIntervalSolCaindo)
      }, 6000);


    }

  }, 130);
}


function criarSol() {
  const solPontuacao = document.createElement("img");
  solPontuacao.src = "./assets/img/pontuacao/Sun.webp";
  solPontuacao.alt = "sol pontuacao";
  solPontuacao.id = 'solPontuacao'

  board.appendChild(solPontuacao)

  return solPontuacao;
}
function criarCerebro() {
  const cerebroPontuacao = document.createElement("img");
  cerebroPontuacao.src = "./assets/img/pontuacao/cerebroPotos.webp";
  cerebroPontuacao.alt = "cerebro pontuacao";
  cerebroPontuacao.id = 'cerebroPontuacao'

  board.appendChild(cerebroPontuacao)

  return cerebroPontuacao;
}

if (!desativarCodigoTemporariamente) {
  // Se a variável de controle não estiver definida como verdadeira, execute este trecho de código
  setInterval(function () {
      cairPontos(0);
  }, 5000);

  setInterval(function () {
      cairPontos(1);
  }, 6000);
}


function verificaColisaoCelular(elementoA, elementoB) {
  const aEsquerda = elementoA.offsetLeft;
  const aTopo = elementoA.offsetTop;
  const aDireita = aEsquerda + elementoA.offsetWidth;
  const aBaixo = aTopo + elementoA.offsetHeight;

  const bEsquerda = elementoB.offsetLeft;
  const bTopo = elementoB.offsetTop;
  const bDireita = bEsquerda + elementoB.offsetWidth;
  const bBaixo = bTopo + elementoB.offsetHeight;

  return (
    aEsquerda < bDireita &&
    aDireita > bEsquerda &&
    aTopo < bBaixo &&
    aBaixo > bTopo
  );
}


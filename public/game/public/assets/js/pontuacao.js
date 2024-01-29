import { personagens } from "./personagens.js";

let pontoPlantas = document.getElementById("pontosPlanta");
let pontoZombies = document.getElementById("pontosZombie");
export let pontuacaoLado = [7500, 7500];
export let pontosLado = [pontoPlantas, pontoZombies]
let board = document.querySelector('.board')

const workerPontuacao = new Worker('/game/public//assets/js/workers/pontuacaoThread.js');

function cairPontos(lado) {

const workerPontuacaoAnimacao = new Worker('/game/public//assets/js/workers/animacaoPontuacao.js');

  let parametrosStop = { comando: 'stopVelocidadePontuacao', lado: lado}
  let parametrosStart = { comando: 'velocidadePontuacao', lado: lado}
  let posicaoTop = -7
  let topLimite = Math.random() < 0.75 ? 83 : 51;
  let pontuacao;
  let posicaoLeft;

  if (lado == 0) {
    posicaoLeft = Math.floor(Math.random() * (48 - 18 + 1)) + 18;
    pontuacao = criarSol();
    pontuacao.style.left = `${posicaoLeft}%`

  } else {
 
    posicaoLeft = Math.floor(Math.random() * (95 - 68 + 1)) + 68;
    pontuacao = criarCerebro();
    pontuacao.style.left = `${posicaoLeft}%`
  }

  pontuacao.style.top = "-7%"
  
  workerPontuacaoAnimacao.postMessage(parametrosStart);

    workerPontuacaoAnimacao.addEventListener('message', function (e) {
   
    if (e.data.comando === 'velocidadePontuacaoProcessado' && e.data.lado == lado) {

      let chaveLado = Object.keys(celulaAtual[lado]);
      if (verificaColisaoPontos(pontuacao, celulaAtual[lado][chaveLado])) {
        setTimeout(() => {
          pontuacao.style.transition = 'all 0.5s ease'
          pontuacao.style.top = lado == 0 ? "-21%" : "-21%";
          pontuacao.style.left = lado == 0 ? "6%" : "100%";
          setTimeout(() => {
            pontuacao.style.opacity = 0;
            setTimeout(() => {
              board.removeChild(pontuacao);
            }, 600);
          }, 400);

          //socket 
          criarPontos(lado);
          socket2.emit('atualizaPontuacao', lado, sala)

        }, 50);

        workerPontuacaoAnimacao.postMessage(parametrosStop);
        workerPontuacaoAnimacao.terminate();

      }

      posicaoTop++;


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
        
          
          workerPontuacaoAnimacao.postMessage(parametrosStop);
          workerPontuacaoAnimacao.terminate();
        }, 6000);


      }

   
    }
  });
}


function criarSol() {
  const solPontuacao = document.createElement("img");
  solPontuacao.src = "./assets/img/pontuacao/Sun.gif";
  solPontuacao.alt = "sol pontuacao";
  solPontuacao.id = 'solPontuacao'

  board.appendChild(solPontuacao)

  return solPontuacao;
}

function criarCerebro() {
  const cerebroPontuacao = document.createElement("img");
  cerebroPontuacao.src = "./assets/img/pontuacao/cerebroPontos.png";
  cerebroPontuacao.alt = "cerebro pontuacao";
  cerebroPontuacao.id = 'cerebroPontuacao'

  board.appendChild(cerebroPontuacao)

  return cerebroPontuacao;
}

export function cairPontuacao(local, iniciado) {


  if (local) {
   
    workerPontuacao.postMessage({comando: 'solCaindo'});

    workerPontuacao.addEventListener('message', function (e) {
      if (e.data === 'pontuacaoSolCaindoProcessado') {
        cairPontos(0);
      }
    });

    workerPontuacao.postMessage({comando:'cerebroCaindo'});

    workerPontuacao.addEventListener('message', function (e) {
      if (e.data === 'pontuacaoCerebroCaindoProcessado') {
        cairPontos(1);
      }
    });

   
  } else {
   
    if (ladoJogador == 0 && iniciado) {
      
      workerPontuacao.postMessage({comando: 'solCaindo'});

      workerPontuacao.addEventListener('message', function (e) {
        if (e.data === 'pontuacaoSolCaindoProcessado') {
          cairPontos(0);
        }
      });

    }
    else if (ladoJogador == 1 && iniciado) {

      workerPontuacao.postMessage({comando:'cerebroCaindo'});

      workerPontuacao.addEventListener('message', function (e) {
        if (e.data === 'pontuacaoCerebroCaindoProcessado') {
          cairPontos(1);
        }
      });

    }

  }
}


export function verificaColisaoPontos(elementoA, elementoB) {
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

export function criarPontos(lado) {

  let listaCard;
  if (lado == 0) {
    listaCard = document.querySelectorAll('.navbar-planta .card');
  } else {
    listaCard = document.querySelectorAll('.navbar-zombie .card');
  }

  pontuacaoLado[lado] += 25;
  pontosLado[lado].textContent = pontuacaoLado[lado];

  listaCard.forEach(cardNome => {
    const cardNomeImg = cardNome.querySelector('.cardIMG');
    if (personagens[cardNome.getAttribute('data-personagem')].valorCard <= pontuacaoLado[lado]) {
      cardNomeImg.classList.remove('semSaldo')
    } else {
      cardNomeImg.classList.add('semSaldo')
    }

  });



}
import { verificaColisaoTiro,removerZombie } from "./conflitoZombie.js";
import { AnimacaoCartas } from "./animacaoCartas.js";

 let listaIntervalTiro = [];

export function iniciarAnimacaoTiro(cellElement, nomeClasse, idNovoPersonagem) {

    const divTiroElement = document.createElement('div');
    const tiroElement = document.createElement('img');
    let caminhoImagem;
    let numeroTiros = 1;
    let tabuleiro = document.querySelector('.board')
    let classeLinha = cellElement.closest(".row").className.split(' ');
    let linhaAtiva = classeLinha[1];

    if (nomeClasse === 'peashooter') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
    } else if (nomeClasse === 'showpea') {
        caminhoImagem = './assets/img/peashooter_tiro_gelo.gif';
    } else if (nomeClasse === 'repeater') {
        caminhoImagem = './assets/img/peashooter_tiro.gif';
        numeroTiros = 2;
    }

    for (let i = 0; i < numeroTiros; i++) {

        const sequenciaTiro = setInterval(() => {

        if(AnimacaoCartas.zombieNaLinha[linhaAtiva] > 0){

            const tiroElementClone = tiroElement.cloneNode();
            const divTiroElementClone = divTiroElement.cloneNode();
            let posicaoLeft = 20; // Defina a posição inicial do tiro (ajuste conforme necessário)

            // verificar se há zombie na linha 

            setTimeout(() => {

                tiroElementClone.src = caminhoImagem;
                divTiroElementClone.classList.add('tiro');
                divTiroElementClone.appendChild(tiroElementClone);
                cellElement.appendChild(divTiroElementClone);


                const intervaloTiro = setInterval(() => {
                    let colidiu = false;
                    //verificar conflito aqui

                    const zombieElements = document.querySelectorAll('.personagemZombie');
                    
                    zombieElements.forEach((zombieElemento) => {
                    
                        if (verificaColisaoTiro(zombieElemento,divTiroElementClone)) {
                            let morreu;
                            colidiu = true;
                            
                            console.log("conflitou")
                            clearInterval(intervaloTiro);
                            divTiroElementClone.remove();

                            //ao acontecer conflito com o zombie
                    
                            const personagemEncontrado = AnimacaoCartas.personagensJogando.find(personagem => personagem.idNovoPersonagem.id == zombieElemento.id);
                    
                            console.log(personagemEncontrado.idNovoPersonagem.id)
                           
                    
                            morreu = personagemEncontrado.idNovoPersonagem.reduzirVida(1)

                           
                    
                            if (morreu) {
                                removerZombie(zombieElemento);
                                AnimacaoCartas.zombieNaLinha[linhaAtiva] -= 1;

                            }
                   
                        }
                    });

                
                    if(!colidiu){
                    //comportamento  do tiro
                    const tabuleiroRect = tabuleiro.getBoundingClientRect();
                    const cellRect = cellElement.getBoundingClientRect();
                    const tabuleiroWidth = tabuleiroRect.width;
                    const tiroWidth = (divTiroElementClone.offsetWidth / tabuleiroWidth) * 100; // Convertendo para porcentagem

                    const posicaoFinal = ((tabuleiroRect.left + tabuleiroWidth - cellRect.left - tiroWidth) / tabuleiroWidth) * 1000; // Convertendo para porcentagem

                    if (posicaoLeft < posicaoFinal) {
                        posicaoLeft += 7; // Ajuste para um movimento mais suave, você pode ajustar conforme necessário
                        divTiroElementClone.style.left = `${posicaoLeft}%`;
                    } else {
                        clearInterval(intervaloTiro);
                        divTiroElementClone.remove();
                    }

                }

                }, 50);

             
            
                divTiroElementClone.style.width = '46%';
                divTiroElementClone.style.height = '23%';
            

            }, i * 500);


        }
        }, 3500);

        listaIntervalTiro.push({ idNovoPersonagem: idNovoPersonagem, intervalId: sequenciaTiro });
    
    }
}



export function pararAnimacaoTiro(idNovoPersonagem) {
    const intervalObj = listaIntervalTiro.find(item => item.idNovoPersonagem == idNovoPersonagem);

    if (intervalObj) {
        clearInterval(intervalObj.intervalId);
        listaIntervalTiro = listaIntervalTiro.filter(item => item.idNovoPersonagem != idNovoPersonagem);
    } else {
        console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
    }
}
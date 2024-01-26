import { pararAnimacaoTiro } from "./animacaoTiro.js";
import { AnimacaoCartas } from "./animacaoCartas.js";
import { pararAnimacao } from "./framesAnimacao.js";


export function verificaColisao(elementoA, elementoB) {
    const aEsquerda = elementoA.offsetLeft;
    const aTopo = elementoA.offsetTop;
    const aDireita = aEsquerda + elementoA.offsetWidth;
    const aBaixo = aTopo + elementoA.offsetHeight;

    const bEsquerda = elementoB.offsetLeft;
    const bTopo = elementoB.offsetTop;
    const bDireita = bEsquerda + elementoB.offsetWidth * 0.6;
    const bBaixo = bTopo + elementoB.offsetHeight * 0.5;

    return (
        aEsquerda < bDireita &&
        aDireita > bEsquerda &&
        aTopo < bBaixo &&
        aBaixo > bTopo
    );

}

export function verificaColisaoTiro(elementoA, elementoB) {
    const aEsquerda = elementoA.getBoundingClientRect().left;
    const aTopo = elementoA.getBoundingClientRect().top;
    const aDireita = aEsquerda + elementoA.offsetWidth;
    const aBaixo = aTopo + elementoA.offsetHeight;

    const bEsquerda = elementoB.getBoundingClientRect().left;
    const bTopo = elementoB.getBoundingClientRect().top;
    const bDireita = bEsquerda + elementoB.offsetWidth;
    const bBaixo = bTopo + elementoB.offsetHeight;


    return (
        aEsquerda < bDireita &&
        aDireita > bEsquerda &&
        aTopo < bBaixo &&
        aBaixo > bTopo
    );

}

export function verificaColisaoCarrinho(elementoA, elementoB) {
    const aEsquerda = elementoA.getBoundingClientRect().left;
    const aTopo = elementoA.getBoundingClientRect().top  + (elementoA.offsetHeight - (celulaAtualZombie.offsetHeight));
    const aDireita = aEsquerda + elementoA.offsetWidth;
    const aBaixo = aTopo + celulaAtualZombie.offsetHeight;

    const bEsquerda = elementoB.getBoundingClientRect().left;
    const bTopo = elementoB.getBoundingClientRect().top ;
    const bDireita = bEsquerda + elementoB.offsetWidth;
    const bBaixo = bTopo  + elementoB.offsetHeight*0.5;


    return (
        aEsquerda < bDireita &&
        aDireita > bEsquerda &&
        aTopo < bBaixo &&
        aBaixo > bTopo
    );

}

// console.log("elemento A:" + " esqueda: " + aEsquerda +  " topo: " + aTopo+  " direta: " +aDireita +  " baixo: " + aBaixo)
// console.log("elemento B:"  + " esqueda: " + bEsquerda +  " topo: " + bTopo+  " direta: " + bDireita +  " baixo: " + bBaixo)

export function removerPlanta(plantaElemento, idNovoPersonagem, plantaSendoAtacada) {
    // console.log('planta removida');
    // console.log(plantaSendoAtacada.idNovoPersonagem.nomePersonagem )
    pararAnimacao(plantaElemento.id)

    plantaElemento.closest('.cell').classList.remove('ocupado');

    if (plantaSendoAtacada.idNovoPersonagem.nomePersonagem != 'potatomine') { plantaElemento.remove(); }
    else if (plantaSendoAtacada.idNovoPersonagem.nomePersonagem == 'potatomine') {

        setTimeout(() => {
            plantaElemento.remove()
        }, 3500);
    }

    pararAnimacaoTiro(idNovoPersonagem);
    socket2.emit('paraAnimacaoTiro', idNovoPersonagem, sala)


}

export function removerZombie(zombieElemento, numeroLinha, idZombie) {


    pararAnimacao(idZombie)

  //  console.log(`Antes linha${numeroLinha} : `+  AnimacaoCartas.zombieNaLinha[`linha${numeroLinha}`])
        if (zombieElemento.classList.contains('tamanho-cardtombstone')) {
            zombieElemento.closest('.cell').classList.remove('tumba');
        }
        // console.log('zombie removido ' + zombieElemento.classList );
        // console.log("linha"+ numeroLinha)
        zombieElemento.remove();
        AnimacaoCartas.zombieNaLinha[`linha${numeroLinha}`] -= 1;
 //   console.log(`Depois morte linha${numeroLinha} `+  AnimacaoCartas.zombieNaLinha[`linha${numeroLinha}`])

    

}
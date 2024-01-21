export function verificaColisao(elementoA, elementoB) {
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

// console.log("elemento A:" + " esqueda: " + aEsquerda +  " topo: " + aTopo+  " direta: " +aDireita +  " baixo: " + aBaixo)
// console.log("elemento B:"  + " esqueda: " + bEsquerda +  " topo: " + bTopo+  " direta: " + bDireita +  " baixo: " + bBaixo)

export function removerPlanta(plantaElemento) {
    console.log('removido');
    plantaElemento.closest('.cell').classList.remove('ocupado');
    plantaElemento.remove();
 
}

export function removerZombie(zombieElemento) {
    console.log('removido');
    zombieElemento.remove();
 
}
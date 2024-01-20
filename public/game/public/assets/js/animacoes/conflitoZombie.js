export function verificaColisao(elementoA, elementoB) {
    const aEsquerda = elementoA.offsetLeft;
    const aTopo = elementoA.offsetTop;
    const aDireita = aEsquerda + elementoA.offsetWidth;
    const aBaixo = aTopo + elementoA.offsetHeight;

    const bEsquerda = elementoB.offsetLeft;
    const bTopo = elementoB.offsetTop;
    const bDireita = bEsquerda + elementoB.offsetWidth;
    const bBaixo = bTopo + elementoB.offsetHeight - 50;

    return (
        aEsquerda < bDireita &&
        aDireita > bEsquerda &&
        aTopo < bBaixo &&
        aBaixo > bTopo
    );

}

export function removerPlanta(plantaElemento) {
    console.log('removido');
    plantaElemento.closest('.cell').classList.remove('ocupado');
    plantaElemento.remove();
 
}
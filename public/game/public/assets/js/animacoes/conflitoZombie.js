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
    const bDireita = bEsquerda + elementoB.offsetWidth * 0.1;
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
    const aTopo = elementoA.getBoundingClientRect().top + (elementoA.offsetHeight - (celulaAtualZombie.offsetHeight));
    const aDireita = aEsquerda + elementoA.offsetWidth;
    const aBaixo = aTopo + celulaAtualZombie.offsetHeight;

    const bEsquerda = elementoB.getBoundingClientRect().left;
    const bTopo = elementoB.getBoundingClientRect().top;
    const bDireita = bEsquerda + elementoB.offsetWidth;
    const bBaixo = bTopo + elementoB.offsetHeight * 0.5;


    return (
        aEsquerda < bDireita &&
        aDireita > bEsquerda &&
        aTopo < bBaixo &&
        aBaixo > bTopo
    );

}

export function removerPlanta(plantaElemento, idNovoPersonagem, plantaSendoAtacada) {

    let celulaDaPlanta = plantaElemento.closest('.cell');
    let nomePersonagemPlanta = plantaSendoAtacada.idNovoPersonagem.nomePersonagem

    removerPlantaEmit(celulaDaPlanta.id, plantaElemento.id, nomePersonagemPlanta)


}

export function removerPlantaEmit(celulaDaPlantaID, plantaElementoID, nomePersonagemPlanta) {

    pararAnimacao(plantaElementoID)
    let plantaElemento = document.getElementById(plantaElementoID)
    let celulaDaPlanta = document.getElementById(celulaDaPlantaID)
    celulaDaPlanta.classList.remove('ocupado');

    if (nomePersonagemPlanta != 'potatomine') { plantaElemento.remove(); }
    else if (nomePersonagemPlanta == 'potatomine') {

        setTimeout(() => {
            plantaElemento.remove()
        }, 3500);
    }

}

export function removerZombieEmit(celulaZombieTumbaID, numeroLinha, idZombie, zombieElementoID) {

    pararAnimacao(idZombie)

    let celulaZombieTumba;
    if (celulaZombieTumbaID) {

        celulaZombieTumba = document.getElementById(celulaZombieTumbaID);
        celulaZombieTumba.classList.remove('tumba');
    }

    let zombieElemento = document.getElementById(zombieElementoID);
    zombieElemento.remove();
    AnimacaoCartas.zombieNaLinha[`linha${numeroLinha}`] -= 1;
}


export function removerZombie(zombieElemento, numeroLinha, idZombie) {

    let celulaZombieTumba;

    if (zombieElemento.classList.contains('tamanho-cardtombstone')) {
        celulaZombieTumba = zombieElemento.closest('.cell').id


    } else {
        celulaZombieTumba = false;
    }

    let verificaExistenciaZombie = document.getElementById(idZombie);

    if (verificaExistenciaZombie) {
        removerZombieEmit(celulaZombieTumba, numeroLinha, idZombie, zombieElemento.id)
    }

}
let listaInterval = []

export function iniciarAnimacao(frames, gifElement, idNovoPersonagem) {
    let frameIndex = 0;
    const frameDuration = 50;
    gifElement.style.width = '100%';
    const animationInterval = setInterval(() => {
        if (gifElement) {
            gifElement.src = frames[frameIndex].src;
            frameIndex = (frameIndex + 1) % frames.length;
        } else {
            clearInterval(animationInterval);
            console.error('Elemento gifElement não encontrado.');
        }
    }, frameDuration);

    // Armazena o ID no objeto animationInterval
    listaInterval.push({ idNovoPersonagem: idNovoPersonagem, intervalId: animationInterval });

    return animationInterval;


}

export function pararAnimacao(idNovoPersonagem) {
    const intervalObj = listaInterval.find(item => item.idNovoPersonagem == idNovoPersonagem);

    if (intervalObj) {
        clearInterval(intervalObj.intervalId);
        listaInterval = listaInterval.filter(item => item.idNovoPersonagem != idNovoPersonagem);
       // console.log("animacao Parada")
    } else {
        //console.log(`Intervalo com idNovoPersonagem ${idNovoPersonagem} não encontrado.`);
    }
}
export function carregarFrames(nomeClasse, numberOfFrames) {
    const frames = [];

    for (let i = 1; i <= numberOfFrames; i++) {
        const imgFrame = new Image();
        imgFrame.src = `./assets/img/frames/${nomeClasse}/andando/frame-${i}.webp`;
        frames.push(imgFrame);
    }

    return frames;
}
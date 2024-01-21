export function iniciarAnimacao(frames, gifElement) {
    let frameIndex = 0;
    const frameDuration = 50;
    let animationInterval;
    return animationInterval = setInterval(() => {
        if (gifElement) {
            gifElement.src = frames[frameIndex].src;
            frameIndex = (frameIndex + 1) % frames.length;
        } else {
            clearInterval(animationInterval);
            console.error('Elemento gifElement não encontrado.');
        }
    }, frameDuration);

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
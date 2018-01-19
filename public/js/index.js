function tickClock(letter){
    const now = new Date();
    const top = letter.children[0];
    const bottom = letter.children[1];    
    
    const topFront = top.querySelector(':not(.-isback)');
    const topBack = top.querySelector('.-isback');
    const bottomFront = bottom.querySelector('.-isrotated');

    if(!topFront || !bottomFront || !topBack) return;
    
    topFront.classList.add('-isrotated');
    topBack.textContent = now.getSeconds() % 10;
    bottomFront.textContent = now.getSeconds() % 10;
}

document.addEventListener("DOMContentLoaded", (e) => {
    
    const letter = document.querySelector(".letter");
    const layers = letter.querySelectorAll('.l-layer');
    for(let i=0; i < layers.length; i++){
        layers[i].addEventListener("transitionend",(e) => {            
            if (e.propertyName !== 'transform') return;
            const layer = e.target;
            if (layer.classList.contains('-isdown')){
                if(layer.classList.contains('-isrotated')){                    
                    const front = layer.parentNode.querySelector(':not(.-isback)');
                    front.classList.add('-isback');
                    layer.classList.remove('-isback');
                }else{
                    const back = layer.parentNode.querySelector('.-isback');
                    back.classList.add('-isrotated');
                }
            }else {
                if(layer.classList.contains('-isrotated')){
                    const back = layer.parentNode.querySelector('.-isback');
                    back.classList.remove('-isback');
                    layer.classList.add('-isback');
                    layer.classList.remove('-isrotated');
                    const down = layer.parentNode.parentNode.children[1].querySelector('.-isrotated');
                    if(!down) return;
                    down.classList.remove('-isrotated');
                }
            }
        });
    }

    setInterval(tickClock,1000, letter);
});
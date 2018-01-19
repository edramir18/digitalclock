'use strict'
'use strict'
function Clock(clockIdName){
    function intDivision(num, div){
        return (num - num%div) / div;
    }
    const clockHandler = function(e){
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
    }    
    const clockIds = [
        "#clock-hour-ten","#clock-hour-unit",
        "#clock-minute-ten","#clock-minute-unit",
        "#clock-second-ten","#clock-second-unit"
    ];
    const clockNames = [
        "hourTen", "hourUnit", 
        "minuteTen", "minuteUnit", 
        "secondTen", "secondUnit"
    ]
    const clockObject = { 
        name: clockIdName,
        intervalID: ""
    }
    try {
        const clock = document.querySelector('#' + clockIdName);
        if(!clock) throw `Clock ID #${clockIdName} not existed`;
        clockIds.forEach((id, index) => {
            const letter = clock.querySelector(id);
            if(!letter) throw `Clock Letter ID ${id} not existed`;
            clockObject[clockNames[index]] = {
                value: 0,
                letter: letter
            };
            const layers = letter.querySelectorAll('.l-layer');
            for(let i=0; i < layers.length; i++){
                layers[i].addEventListener("transitionend",clockHandler);
            }
        });
        clockObject.clockLetter= function(letter, newValue){
            if(letter.value !== newValue){
                letter.value = newValue;
                
                const top = letter.children[0];
                const bottom = letter.children[1];
                
                const topFront = top.querySelector(':not(.-isback)');
                const topBack = top.querySelector('.-isback');
                const bottomFront = bottom.querySelector('.-isrotated');
            
                if(!topFront || !bottomFront || !topBack) return;
                
                topFront.classList.add('-isrotated');
                topBack.textContent = newValue;
                bottomFront.textContent = newValue;
            }
        };
        clockObject.tickClockHandler = function (clock){            
            const now = new Date();
            clock.clockLetter(clock.hourTen.letter, intDivision(now.getHours(),10));
            clock.clockLetter(clock.hourUnit.letter, now.getHours() % 10);
            clock.clockLetter(clock.minuteTen.letter, intDivision(now.getMinutes(),10));
            clock.clockLetter(clock.minuteUnit.letter, now.getMinutes() % 10);
            clock.clockLetter(clock.secondTen.letter, intDivision(now.getSeconds(),10));
            clock.clockLetter(clock.secondUnit.letter, now.getSeconds() % 10);
        };        
        clockObject.start = function(){
            console.log("starting clock...");
            console.log(this);
            this.intervalID = setInterval(this.tickClockHandler, 1000, this);
        };
        clockObject.stopHandler = function(clock){
            console.log("stopping clock");            
            clearInterval(clock.intervalID);
            clock.intervalID = "";
        }
    }catch(err){
        console.log("ERROR: " + err + ".");
    }finally {
        return clockObject;
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    
    const myclock = new Clock("myclock");    
    myclock.start(myclock);
});
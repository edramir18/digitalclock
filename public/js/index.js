function endUpTransition(e){
    const f = e.target;        
    const b = f.parentNode.querySelector(".b-clock__flip--back");
    f.classList.remove("b-clock__flip--front");
    b.classList.remove("b-clock__flip--back");
    b.classList.add("b-clock__flip--front");
    f.classList.add("b-clock__flip--back");
    f.classList.remove("b-clock__flip--rotate");
    f.removeEventListener("transitioned", endUpTransition);
    const event = new CustomEvent("finished");
}

function startDownTransition(e){
    console.log("It's Working!!!");
    console.log(e.target);
}

function tickClock(up, down){
    const now = new Date();
    const second = now.getSeconds() % 10;
    const upFront = up.querySelector(".b-clock__flip--front");    
    const upBack = up.querySelector(".b-clock__flip--back");
    const downFront = down.querySelector(".b-clock__flip--front");
    const downBack = down.querySelector(".b-clock__flip--back");
    
    if(!upFront || !upBack || !downFront || !downBack) return;
    
    upBack.textContent = second;
    downFront.textContent = second;    
}

document.addEventListener("DOMContentLoaded", (e) => {
    
    const upLetter = document.querySelector("#flex-top>.b-clock__letter");
    const downLetter = document.querySelector("#flex-bottom>.b-clock__letter");
    
    setTimeout(tickClock, 2500, upLetter, downLetter);
    //setInterval(tickClock, 1000, upLetter, downLetter);

});
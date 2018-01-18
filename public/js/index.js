document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM Loaded");
    const upLetter = document.querySelector(".b-clock__flip--up");
    console.log(upLetter);
    upLetter.classList.add("b-clock__flip--rotate");
});
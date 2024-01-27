const areaYou = document.querySelector(".game__area-you");
const areaBot = document.querySelector(".game__area-bot");
const startBtn = document.querySelector(".startbtn");

const rows = ["1", "2","3","4","5","6","7","8","9","10"];
const colums = ["A", "B","C","D","E","F","G","H","I","J"];



startBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            areaYou.innerHTML += `<div class="y${rows[i] + colums[j]} cell">0</div>`;
            areaBot.innerHTML += `<div class="b${rows[i] + colums[j]} cell">x</div>`;
        };
    };
});
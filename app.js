const areaYou = document.querySelector(".game__area-you");
const areaBot = document.querySelector(".game__area-bot");
const startBtn = document.querySelector(".startbtn");
const restartBtn = document.querySelector(".restartbtn");
let cellsBot = [];

const rows = ["1", "2","3","4","5","6","7","8","9","10"];
const colums = ["A", "B","C","D","E","F","G","H","I","J"];

const ships = [
    {name: 'linkor', size: '4', number: '1'},
    {name: 'cruiser', size: '3', number: '2'},
    {name: 'destroyers', size: '2', number: '3'},
    {name: 'boat', size: '1', number: '4'},
];



startBtn.addEventListener('click', () => {
    if (areaYou.innerHTML == '') {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                areaYou.innerHTML += `<div class="y${rows[i] + colums[j]} cellyou"></div>`;
                areaBot.innerHTML += `<div class="b${rows[i] + colums[j]} cellbot"></div>`;
            };
        };
        generateShips();
        cellsBot = document.querySelectorAll(".cellbot");

    }
});
restartBtn.addEventListener('click', () => {
    areaYou.innerHTML = '';
    areaBot.innerHTML = '';
    if (areaYou.innerHTML == '') {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                areaYou.innerHTML += `<div class="y${rows[i] + colums[j]} cellyou"></div>`;
                areaBot.innerHTML += `<div class="b${rows[i] + colums[j]} cellbot"></div>`;
            };
        };
        generateShips();
        cellsBot = document.querySelectorAll(".cellbot");
    }
});

let positions = [];

function generateShips() {
    positions = [];
    generateShipBot(4, 1); 
    generateShipBot(3, 2); 
    generateShipBot(2, 3); 
    generateShipBot(1, 4); 
    positions = [];
    generateShipYou(4, 1); 
    generateShipYou(3, 2); 
    generateShipYou(2, 3); 
    generateShipYou(1, 4);
    areaBot.addEventListener('click', attack);
}



function generatePositions(size) {
        const isVertical = Math.round(Math.random()); // 0 - горизонтально, 1 - вертикально
        let x, y;
        let isValid = false;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            isValid = true;

            for (let j = -1; j <= size; j++) {
                for (let k = -1; k <= 1; k++) {
                    // Перевірка чи координата не входить в positions та чи не є сусідньою
                    if (isVertical) {
                        if (positions.includes(rows[y + j] + colums[x + k]) ||
                            (j !== -1 && j !== size && k !== 0 && positions.includes(rows[y + j] + colums[x + k - 1])) ||
                            (j !== -1 && j !== size && k !== 0 && positions.includes(rows[y + j] + colums[x + k + 1]))) {
                            isValid = false;
                            break;
                        }
                    } else {
                        if (positions.includes(rows[y + k] + colums[x + j]) ||
                            (k !== 0 && j !== -1 && j !== size && positions.includes(rows[y + k - 1] + colums[x + j])) ||
                            (k !== 0 && j !== -1 && j !== size && positions.includes(rows[y + k + 1] + colums[x + j]))) {
                            isValid = false;
                            break;
                        }
                    }
                }
            }

            // Перевірка чи корабель не виходить за межі поля
            if (isVertical && y + size > 10) {
                isValid = false;
            } else if (!isVertical && x + size > 10) {
                isValid = false;
            }
        } while (!isValid);

        for (let j = 0; j < size; j++) {
            if (isVertical) {
                positions.push(rows[y + j] + colums[x]);
            } else {
                positions.push(rows[y] + colums[x + j]);
            }
        }
}
function generateShipYou(size, number) {
    for (let i = 0; i < number; i++) {
        generatePositions(size);
        positions.forEach(position => {
            document.querySelector(`.y${position}`).classList.add("aliansships");
        });
    }
}
function generateShipBot(size, number) {
    for (let i = 0; i < number; i++) {
        generatePositions(size);
        positions.forEach(position => {
            document.querySelector(`.b${position}`).classList.add("enemiships");
        });
    }
}


function attack(event) {
    const clickedCell = event.target;

    if (clickedCell.classList.contains('cellbot')) {
        if (clickedCell.classList.contains('enemiships')) {

            clickedCell.classList.remove('enemiships');
            clickedCell.classList.add('kill');
        } else {
        }
        clickedCell.innerHTML = `<span class="x"></span>`;
        attackEnemi();
    }
}

let botHit = {
    lastShotX: 0,
    lastShotY: 0,
    hit: false,
    checkZone: 0,
};

let posFire = [];
function attackEnemi() {
    let x, y;

    do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    } while (posFire.includes(rows[y] + colums[x]));

    posFire.push(rows[y] + colums[x]);
    console.log(posFire);
    if(botHit.hit == true && botHit.checkZone < 4) {
        console.log(botHit);
        if(botHit.lastShotX == 0 || botHit.lastShotY == 0 || botHit.lastShotX == 9 || botHit.lastShotY == 9) {
            console.log("біля краю");
            botHit.hit = false;
        } else {
            if (botHit.checkZone == 0) {
                if (!posFire.includes(rows[botHit.lastShotY - 1] + colums[botHit.lastShotX])) {
                    if(document.querySelector(`.y${rows[botHit.lastShotY - 1] + colums[botHit.lastShotX]}`).classList.contains('aliansships')) {
                        document.querySelector(`.y${rows[botHit.lastShotY - 1] + colums[botHit.lastShotX]}`).classList.remove('aliansships');
                        document.querySelector(`.y${rows[botHit.lastShotY - 1] + colums[botHit.lastShotX]}`).classList.add('kill');
                    }
                    botHit.checkZone = 1;
                    document.querySelector(`.y${rows[botHit.lastShotY - 1] + colums[botHit.lastShotX]}`).innerHTML = `<span class="x"></span>`
                } else {
                    
                }
            } else if (botHit.checkZone == 1) {
                if (!posFire.includes(rows[botHit.lastShotY] + colums[botHit.lastShotX + 1])) {
                    if(document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX + 1]}`).classList.contains('aliansships')) {
                        document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX + 1]}`).classList.remove('aliansships');
                        document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX + 1]}`).classList.add('kill');
                    }
                    botHit.checkZone = 2;
                    document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX + 1]}`).innerHTML = `<span class="x"></span>`
                }
            } else if (botHit.checkZone == 2) {
                if (!posFire.includes(rows[botHit.lastShotY + 1] + colums[botHit.lastShotX])) {
                    if(document.querySelector(`.y${rows[botHit.lastShotY + 1] + colums[botHit.lastShotX]}`).classList.contains('aliansships')) {
                        document.querySelector(`.y${rows[botHit.lastShotY + 1] + colums[botHit.lastShotX]}`).classList.remove('aliansships');
                        document.querySelector(`.y${rows[botHit.lastShotY + 1] + colums[botHit.lastShotX]}`).classList.add('kill');
                    }
                    botHit.checkZone = 3;
                    document.querySelector(`.y${rows[botHit.lastShotY + 1] + colums[botHit.lastShotX]}`).innerHTML = `<span class="x"></span>`
                }
            } else if (botHit.checkZone == 3) {
                if (!posFire.includes(rows[botHit.lastShotY] + colums[botHit.lastShotX - 1])) {
                    if(document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX - 1]}`).classList.contains('aliansships')) {
                        document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX - 1]}`).classList.remove('aliansships');
                        document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX - 1]}`).classList.add('kill');
                    }
                    botHit.checkZone = 4;
                    document.querySelector(`.y${rows[botHit.lastShotY] + colums[botHit.lastShotX - 1]}`).innerHTML = `<span class="x"></span>`
                }
            }
        }
    } else {
        if (document.querySelector(`.y${rows[y] + colums[x]}`).classList.contains('aliansships')) {
            document.querySelector(`.y${rows[y] + colums[x]}`).classList.remove("aliansships");
            document.querySelector(`.y${rows[y] + colums[x]}`).classList.add("kill");
            console.log("бот влучив в", x, y);
            botHit.checkZone = 0;
            botHit.hit = true;
            botHit.lastShotX = x;
            botHit.lastShotY = y;
            console.log(botHit);
        }
        document.querySelector(`.y${rows[y] + colums[x]}`).innerHTML = `<span class="x"></span>`;
    }

};

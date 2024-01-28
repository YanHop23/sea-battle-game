const areaYou = document.querySelector(".game__area-you");
const areaBot = document.querySelector(".game__area-bot");
const startBtn = document.querySelector(".startbtn");
const restartBtn = document.querySelector(".restartbtn");

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
                areaYou.innerHTML += `<div class="y${rows[i] + colums[j]} cell">0</div>`;
                areaBot.innerHTML += `<div class="b${rows[i] + colums[j]} cell">x</div>`;
            };
        };
        generateShipsBot();
    }
});
restartBtn.addEventListener('click', () => {
    areaYou.innerHTML = '';
    areaBot.innerHTML = '';
    if (areaYou.innerHTML == '') {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                areaYou.innerHTML += `<div class="y${rows[i] + colums[j]} cell">0</div>`;
                areaBot.innerHTML += `<div class="b${rows[i] + colums[j]} cell">x</div>`;
            };
        };
        generateShipsBot();
    }
});

let positions = [];

function generateShipsBot() {
    positions = [];
    generateShip(4, 1); 
    generateShip(3, 2); 
    generateShip(2, 3); 
    generateShip(1, 4); 
    positions = [];
    console.log(positions);
    generateShipYou(4, 1); 
    generateShipYou(3, 2); 
    generateShipYou(2, 3); 
    generateShipYou(1, 4);
    console.log(positions); 
}

const cells = document.querySelectorAll(".cell");

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
            document.querySelector(`.y${position}`).classList.add("red");
        });
    }
}
function generateShip(size, number) {
    for (let i = 0; i < number; i++) {
        generatePositions(size);
        positions.forEach(position => {
            document.querySelector(`.b${position}`).classList.add("red");
        });
    }
}
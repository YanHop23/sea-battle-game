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


const cells = document.querySelectorAll(".cell");

function generateShipsBot() {
    let positions = [];
    
    function generatePositions () {
        const size = 10;
        let k = 1;
        while(k) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let newPos =  rows[y] + colums[x];

            positions.push(newPos);
            let p = 1; 
            while(p) {
                    let h = Math.round(Math.random());
                    console.log(h);
                    if (h == 1) {
                        

                        if (x >= 7) {
                            
                            for (h; h < 4; h++) {
                                x--;
                                let newPos =  rows[y] + colums[x];
                                positions.push(newPos);
                                
                               
                            }
                            
                            
                        } else {
                            
                            for (h; h < 4; h++) {
                                x++;
                                let newPos =  rows[y] + colums[x];
                                positions.push(newPos);
                                
                            }
                        }
                    } else if (h == 0) {
                        
                        if (y >= 7) {
                            for (h; h < 3; h++) {
                                y--;
                                let newPos =  rows[y] + colums[x];
                                positions.push(newPos);
                                
                            }
                            
                        } else {
                            for (h; h < 3; h++) {
                                y++;
                                let newPos =  rows[y] + colums[x];
                                positions.push(newPos);
                               
                            }
                        }
                    }
                
                    console.log(positions)
                    p = 0;
                
            }
            k = 0;
        };
    };
    generatePositions();
    positions.forEach(position => {
        document.querySelector(`.b${position}`).classList.add("red");
    });
    
    // document.querySelector(`.${coordinatesYou[0]}`).classList.add("red");
};
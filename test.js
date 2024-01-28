function generateShipsBot() {
    const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]; // Кількість і розміри кораблів
    const orientation = ['horizontal', 'vertical']; // Орієнтація кораблів

    for (const shipSize of ships) {
        let placed = false;

        while (!placed) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
            const randomOrientation = orientation[Math.floor(Math.random() * 2)];

            if (canPlaceShip(areaBot, randomRow, randomCol, randomOrientation, shipSize)) {
                placeShip(areaBot, randomRow, randomCol, randomOrientation, shipSize);
                placed = true;
            }
        }
    }
}

function canPlaceShip(area, row, col, orientation, size) {
    const cells = area.getElementsByClassName(`b${rows[row] + colums[col]} cell`);

    for (let i = 0; i < size; i++) {
        let currentRow = row;
        let currentCol = col;

        if (orientation === 'horizontal') {
            currentCol += i;
        } else {
            currentRow += i;
        }

        const cell = area.querySelector(`.b${rows[currentRow] + colums[currentCol]} cell`);

        if (!cell || cell.classList.contains('ship')) {
            return false;
        }
    }

    return true;
}

function placeShip(area, row, col, orientation, size) {
    for (let i = 0; i < size; i++) {
        let currentRow = row;
        let currentCol = col;

        if (orientation === 'horizontal') {
            currentCol += i;
        } else {
            currentRow += i;
        }

        const cell = area.querySelector(`.b${rows[currentRow] + colums[currentCol]} cell`);
        cell.classList.add('ship');
    }
}

function generatePositions () {
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
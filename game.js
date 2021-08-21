module.exports = class Game {
    constructor(height, width) {
        this.grid = [];
        this.height = height;
        this.width = width;
        this.setupGame();
        this.gameTurn = 0;
    }

    setupGame() {
        this.grid = [...Array(this.height)].map(e => Array(this.width).fill(0));
    }

    validMove(coords, player) {
        let remainder = this.gameTurn % 2;
        if ((remainder == 0 && player == 1) || (remainder == 1 && player == 2)) {
            if (this.grid[coords.row][coords.column] == 0) {
                this.grid[coords.row][coords.column] = player
                this.gameTurn+=1;
                return true
            }
        }
        return false;
    }

    checkWin() {
        //check vertical
        let winner = null;
        vertical:
            for (let i = 0; i < this.grid[0].length; i++) {
                let consecutive = {
                    player: 0,
                    consec: 0
                }
                for (let j = 0; j < this.grid[i].length; j++) {
                    let occupier = this.grid[j][i];
                    if (occupier === consecutive.player) consecutive.consec += 1;
                    else {
                        consecutive.player = occupier;
                        consecutive.consec = 1;
                    }
                    if (consecutive.consec >= 5 && consecutive.player > 0) {
                        winner = consecutive.player;
                        break vertical;
                    }
                }
            }
        //check horizontal
        if (!winner) {
            horizontal: for (let i = 0; i < this.grid.length; i++) {
                let consecutive = {
                    player: 0,
                    consec: 0
                }
                for (let j = 0; j < this.grid[i].length; j++) {
                    let occupier = this.grid[i][j];
                    if (occupier === consecutive.player) consecutive.consec += 1;
                    else {
                        consecutive.player = occupier;
                        consecutive.consec = 1;
                    }
                    if (consecutive.consec >= 5 && consecutive.player > 0) {
                        winner = consecutive.player;
                        break horizontal;
                    }
                }
            }
        }
        //check topL to botR diagonal
        if (!winner) {
            diagonal1_1: for (let k = this.grid.length - 1; k >= 0; k--) {
                let i = 0;
                let j = k;
                let consecutive = {
                    player: 0,
                    consec: 0
                }
                while (i < this.grid.length && j < this.grid[0].length) {
                    let occupier = this.grid[i][j];
                    if (occupier === consecutive.player) consecutive.consec += 1;
                    else {
                        consecutive.player = occupier;
                        consecutive.consec = 1;
                    }
                    if (consecutive.consec >= 5 && consecutive.player > 0) {
                        winner = consecutive.player;
                        break diagonal1_1;
                    }
                    i += 1;
                    j += 1;
                }
            }
            diagonal1_2: for (let k = 1; k < this.grid.length; k++) {
                let i = k;
                let j = 0;
                let consecutive = {
                    player: 0,
                    consec: 0
                }
                while (i < this.grid.length && j <= this.grid[0].length) {
                    let occupier = this.grid[i][j];
                    if (occupier === consecutive.player) consecutive.consec += 1;
                    else {
                        consecutive.player = occupier;
                        consecutive.consec = 1;
                    }
                    if (consecutive.consec >= 5 && consecutive.player > 0) {
                        winner = consecutive.player;
                        break diagonal1_2;
                    }
                    i += 1;
                    j += 1;
                }
            }
        }

        //check botL to topR diagonal
        if (!winner) {
            diagonal2_1: for (let k = 0; k < this.grid.length; k++) {
                let i = k;
                let j = 0;
                let consecutive = {
                    player: 0,
                    consec: 0
                }
                while (i >= 0 && j <= this.grid[0].length) {
                    let occupier = this.grid[i][j];
                    if (occupier === consecutive.player) consecutive.consec += 1;
                    else {
                        consecutive.player = occupier;
                        consecutive.consec = 1;
                    }
                    if (consecutive.consec >= 5 && consecutive.player > 0) {
                        winner = consecutive.player;
                        break diagonal2_1;
                    }
                    i -= 1;
                    j += 1;
                }
            }
            diagonal2_2: for (let k = 1; k < this.grid[0].length; k++) {
                let i = this.grid.length - 1;
                let j = k;
                let consecutive = {
                    player: 0,
                    consec: 0
                }
                while (i >= 0 && j < this.grid[0].length) {
                    let occupier = this.grid[i][j];
                    if (occupier === consecutive.player) consecutive.consec += 1;
                    else {
                        consecutive.player = occupier;
                        consecutive.consec = 1;
                    }
                    if (consecutive.consec >= 5 && consecutive.player > 0) {
                        winner = consecutive.player;
                        break diagonal2_2;
                    }
                    i -= 1;
                    j += 1;
                }
            }
        }

        return winner;
    }
}
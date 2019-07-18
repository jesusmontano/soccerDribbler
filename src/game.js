const Defender = require("./defender");
const Util = require("./util");

class Game {
    constructor() {
        this.defenders = [];
        this.dribblers = [];

        this.addDefenders();
    }

    addDefenders() {
        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {
            this.add(new Defender({ game: this }));
        }
    }

    randomPosition() {
        return [
            Game.DIM_X * Math.random(),
            Game.DIM_Y * Math.random()
        ];
    }
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
// Game.FPS = 32;
Game.NUM_DEFENDERS = 10;

module.exports = Game;
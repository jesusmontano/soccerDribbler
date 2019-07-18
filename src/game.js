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

    allObjects() {
        return [].concat(this.dribblers, this.defenders);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        this.allObjects().forEach((object) => {
            object.draw(ctx);
        });
    }

    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }

}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
// Game.FPS = 32;
Game.NUM_DEFENDERS = 10;

module.exports = Game;
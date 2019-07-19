const Defender = require("./defender");
const Util = require("./util");
const Dribbler = require("./dribbler");

class Game {
    constructor() {
        this.defenders = [];
        this.dribblers = [];

        this.addDefenders();
    }

    add(object) {
        if (object instanceof Defender) {
            this.defenders.push(object);
        } else if (object instanceof Dribbler) {
            this.dribblers.push(object);
        } else {
            throw new Error("unknown type of object");
        }
    }


    addDefenders() {
        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {
            this.add(new Defender({ game: this }));
        }
    }

    addDribbler() {
        const dribbler = new Dribbler({
            pos: this.randomPosition(), // I think I won't want this to be a random position. I don't want the dribbler to just start anywhere.
            game: this
        });

        this.add(dribbler);

        return dribbler;
    }

    
    allObjects() {
        return [].concat(this.dribblers, this.defenders);
    }
    
    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];
                
                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision) return;
                }
            }
        }
    }
    
    draw(ctx) {
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
        img.src = 'background.jpeg';


        // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        // ctx.fillStyle = Game.BG_COLOR;
        // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        
        this.allObjects().forEach((object) => {
            object.draw(ctx);
        });
    }
    
    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
    }
    
    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }
    
    randomPosition() {
        return [
            Game.DIM_X * Math.random(),
            Game.DIM_Y * Math.random()
        ];
    }
    
    remove(object) {
        if (object instanceof Defender) {
            this.defenders.splice(this.defenders.indexOf(object), 1);
        } else if (object instanceof Dribbler) {
            this.dribblers.splice(this.dribblers.indexOf(object), 1);
        } else {
            throw new Error("unknown type of object");
        }
    }
    
    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    }

    // wrap(pos) {
    //     return [
    //         Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    //     ];
    // } 
    // // Don't need this in the context of my game.

}

Game.BG_COLOR = "#12A510";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_DEFENDERS = 10;

module.exports = Game;
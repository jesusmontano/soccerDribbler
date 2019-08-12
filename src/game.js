const Defender = require("./defender");
const Util = require("./util");
const Dribbler = require("./dribbler");
const Powerup = require("./powerup");
const Ball = require("./ball");
const YellowCard = require("./yellow_card");

class Game {
    constructor() {
        this.defenders = [];
        this.dribblers = [];
        this.powerups = [];
        this.balls = [];
        this.yellowCards = [];
        this.state = "game";

        this.addDefenders();
        this.addPowerups();
        this.addBall();
        this.addYellowCard();
    }

    add(object) {
        if (object instanceof Defender) {
            this.defenders.push(object);
        } else if (object instanceof Dribbler) {
            this.dribblers.push(object);
        } else if (object instanceof Powerup) {
            this.powerups.push(object);
        } else if (object instanceof Ball) {
            this.balls.push(object);
        } else if (object instanceof YellowCard) {
            this.yellowCards.push(object);  
        } else {
            throw new Error("unknown type of object");
        }
    }


    addDefenders() {
        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {
            this.add(new Defender({ game: this }));
        }
    }

    addPowerups() {
        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {
            this.add(new Powerup({ game: this }));
        }
        debugger;
    }

    addYellowCard() {
        for (let i = 0; i < 1; i++) {
            this.add(new YellowCard({ game: this }));
        }
        debugger;
    }

    addDribbler() {
        const dribbler = new Dribbler({
            pos: [465, 250], // this.randomPosition(), 
            game: this
        });

        this.add(dribbler);

        return dribbler;
    }

    addBall() {
        const ball = new Ball({
            pos: this.randomPosition(), 
            game: this
        });

        this.add(ball);

        return ball;
    }

    
    allObjects() {
        return [].concat(this.dribblers, this.defenders, this.powerups, this.balls, this.yellowCards);
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

    checkWallCollisions() {
        const obj = this.allObjects();
        for (let i = 0; i < obj.length; i++) {
            if (obj[i] instanceof Defender) {
                if ((obj[i][0] < obj[i].radius) || ((obj[i][0] > 1000 - obj[i].radius))) {
                    obj[i].wallCollision();
                }   
            } if (obj[i] instanceof Defender) {
                if((obj[i][1] < obj[i].radius) || (obj[i][1] > 600 - obj[i].radius)) {
                    obj[i].otherWallCollision();
                }
            }
        }
    }
    
    draw(ctx) {
        if (this.state === "over") {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = 'gameOver.png';
        } else if (this.state === "victory") {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = 'victory.png';
        } else {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = 'background.jpeg';

            this.allObjects().forEach((object) => {
                object.draw(ctx);
            });
        }


        // const img = new Image();
        // img.onload = function () {
        //     ctx.drawImage(img, 0, 0);
        // };
        // img.src = 'background.jpeg';


        // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        // ctx.fillStyle = Game.BG_COLOR;
        // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        
        // this.allObjects().forEach((object) => {
        //     object.draw(ctx);
        // });
    }
    
    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.DIM_X - 70) || (pos[1] > Game.DIM_Y - 70);
    }
    
    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }
    
    randomPosition() {
        // return [
        //     Game.DIM_X * Math.random(),
        //     Game.DIM_Y * Math.random()
        // ];
        const pos = [
            Game.DIM_X * Math.random(),
            Game.DIM_Y * Math.random()
        ];

        if (pos[0] < 100 || pos[0] > 900) {
            pos[0] = Game.DIM_X * Math.random();
        }

        if (pos[1] < 100 || pos[1] > 500) {
            pos[1] = Game.DIM_Y * Math.random();
        }

        return pos;
    }
    
    remove(object) {
        if (object instanceof Defender) {
            this.defenders.splice(this.defenders.indexOf(object), 1);
        } else if (object instanceof Dribbler) {
            this.dribblers.splice(this.dribblers.indexOf(object), 1);
        } else if (object instanceof Powerup) {
            this.powerups.splice(this.powerups.indexOf(object), 1);
        } else if (object instanceof Ball) {
            this.balls.splice(this.balls.indexOf(object), 1);
        } else if (object instanceof YellowCard) {
            this.yellowCards.splice(this.yellowCards.indexOf(object), 1);
        }else {
            throw new Error("unknown type of object");
        }
    }

    checkState() {
        if (this.powerups.length === 0 && this.dribblers[0].life > 0) {
            this.state = "victory";
            this.draw();
        } else if (this.defenders.length > 0 && this.dribblers[0].life === 0) {
            this.state = "over";
            this.draw();
        } else {
            this.state = "game";
        }
    }
    
    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
        this.checkState();
        // this.checkWallCollisions();
    }

    wrap(pos) {
        return [
            Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
        ];
    } 
    // // Don't need this in the context of my game.

}

Game.BG_COLOR = "#12A510";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_DEFENDERS = 5;

module.exports = Game;
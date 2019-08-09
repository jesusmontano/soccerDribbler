const MovingObject = require("./moving_object");
const Util = require("./util");
const Dribbler = require("./dribbler");

class YellowCard extends MovingObject {
    constructor(options) {
        super(options);
        this.pos = options.pos || options.game.randomPosition();
        this.radius = YellowCard.RADIUS;
        this.vel = options.vel || Util.randomVec(YellowCard.SPEED);
        this.isWrappable = true;
    }

    draw(ctx) {
        const img = document.getElementById("yellowcard");
        // const pat = ctx.createPattern(img, "repeat");
        ctx.drawImage(img, this.pos[0], this.pos[1])
        // ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        // ctx.fillStyle = pat;
        // ctx.fill();
    }

    collideWith(otherObject) {
        if (otherObject instanceof Dribbler) {
            this.remove();
            // (this.game.defenders[0]).remove(); // don't remove defenders, but slow them down
            let velFactor = Math.floor(Math.random() * 10);

            if (velFactor <= 4) {
                for (let i = 0; i < this.game.defenders.length; i++) {
                    debugger;
                    this.game.defenders[i].vel[0] = this.game.defenders[i].vel[0] * 0.8
                    this.game.defenders[i].vel[1] = this.game.defenders[i].vel[1] * 0.8
                }
            } else {
                for (let i = 0; i < this.game.defenders.length; i++) {
                    debugger;
                    this.game.defenders[i].vel[0] = this.game.defenders[i].vel[0] * 1.4;
                    this.game.defenders[i].vel[1] = this.game.defenders[i].vel[1] * 1.4;
                }
            }

            if (velFactor <= 4) {
                this.game.balls[0].vel[0] = this.game.balls[0].vel[0] * 0.8;
                this.game.balls[0].vel[1] = this.game.balls[0].vel[1] * 0.8;
            } else {
                this.game.balls[0].vel[0] = this.game.balls[0].vel[0] * 1.4;
                this.game.balls[0].vel[1] = this.game.balls[0].vel[1] * 1.4;
            }

            // for (let i = 0; i < this.game.defenders.length; i++) {
            //     debugger;
            //     this.game.defenders[i].vel[0] = this.game.defenders[i].vel[0] * 0.75 
            //     this.game.defenders[i].vel[1] = this.game.defenders[i].vel[1] * 0.75 
            // }

            // this.game.balls[0].vel[0] = this.game.balls[0].vel[0] * 1.5
            // this.game.balls[0].vel[1] = this.game.balls[0].vel[1] * 1.5

            // Game.remove(Game.defenders[0]);
        }
    }
}

YellowCard.RADIUS = 35;
YellowCard.SPEED = 2;
module.exports = YellowCard;
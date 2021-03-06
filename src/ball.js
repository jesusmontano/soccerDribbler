const MovingObject = require("./moving_object");
const Util = require("./util");
const Dribbler = require("./dribbler");

class Ball extends MovingObject {
    constructor(options) {
        super(options);
        this.pos = [0, 0], [0, 0] || options.pos || options.game.randomPosition();
        this.radius = Ball.RADIUS;
        this.vel = options.vel || Util.randomVec(Ball.SPEED);
        this.isWrappable = true;
    }

    draw(ctx) {
        const img = document.getElementById("ball");
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
            otherObject.relocate();
            otherObject.life -= 1
            // Game.remove(Game.defenders[0]);
        }
    }
}

Ball.RADIUS = 35;
Ball.SPEED = 5;
module.exports = Ball;
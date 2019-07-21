const MovingObject = require("./moving_object");
const Util = require("./util");
const Dribbler = require("./dribbler");

class Powerup extends MovingObject {
    constructor(options) {
        super(options);
        this.pos = options.pos || options.game.randomPosition();
        this.radius = Powerup.RADIUS;
        this.vel = options.vel || Util.randomVec(Powerup.SPEED);
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
            this.remove();
            // Game.remove(Game.defenders[0]);
        }
    }
}

Powerup.RADIUS = 35;
Powerup.SPEED = 2;
module.exports = Powerup;
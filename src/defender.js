const Util = require("./util");
const MovingObject = require("./moving_object");
const Dribbler = require("./dribbler");

const DEFAULTS = {
    COLOR: "#505050",
    RADIUS: 35,
    SPEED: 4
};

class Defender extends MovingObject {
    constructor(options = {}) {
        options.color = DEFAULTS.COLOR;
        options.pos = options.pos || options.game.randomPosition();
        options.radius = DEFAULTS.RADIUS;
        options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
        super(options);
    }

    draw(ctx) {
        const img = document.getElementById("defender");
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
            return true;
        }
        // } else if (otherObject instanceof Bullet) {
        //     this.remove();
        //     otherObject.remove();
        //     return true;
        // }

        return false;
    }
    
    wallCollision() {
        this.vel[0] = - this.vel[0];
    }

    otherWallCollision() {
        this.vel[1] = - this.vel[1];
    }
}

module.exports = Defender;
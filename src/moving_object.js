const Util = require("./util");

class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
        this.isWrappable = true; //This does not apply in my case since there is no wrapping.
    }

    collideWith(otherObject) {
        // default do nothing
    }

    draw(ctx) {
        const img = document.getElementById("dribbler");
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

    isCollidedWith(otherObject) {
        const centerDist = Util.dist(this.pos, otherObject.pos);
        return centerDist < (this.radius + otherObject.radius);
    }

    move(timeDelta) {
        // timeDelta is number of milliseconds since last move
        // if the computer is busy the time delta will be larger
        // in this case the MovingObject should move farther in this frame
        // velocity of object is how far it should move in 1/60th of a second
        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
            offsetX = this.vel[0] * velocityScale,
            offsetY = this.vel[1] * velocityScale;

        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    

        if (this.game.isOutOfBounds(this.pos)) {
            if (this.isWrappable) {
                // this.wallCollision();
                // this.otherWallCollision();
                this.pos = this.game.wrap(this.pos);
            } else {
                this.vel = [0, 0];
                // need to add additional logic here, probably going to
                // have to increase position by one unit
                // this.remove();
            }
        }
    }

    remove() {
        this.game.remove(this);
    }   
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject
const MovingObject = require("./moving_object");

class Powerup extends MovingObject {
    construtor(options) {
        options.radius = Powerup.RADIUS;
        super(options);
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
}

Powerup.RADIUS = 35;
Powerup.SPEED = 2;

module.exports = Powerup;
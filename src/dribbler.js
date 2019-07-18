const MovingObject = require("./moving_object");
const Util = require("./util");

function randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
}

class Dribbler extends MovingObject {
    constructor(options) {
        options.radius = Dribbler.radius;
        options.vel = options.vel || [0, 0];
        options.color = options.color || randomColor();
        super(options);
    }

    power(impulse) {
        this.vel[0] += impulse[0]; // I'm probably going to have to change something here.
        this.vel[1] += impulse[1];  // I feel like this is what makes the dribbler go faster and faster.
    }

    relocate() {
        this.pos = this.game.randomPosition(); // I will want to make this be fixed, not random.
        this.vel = [0, 0]; // If I keep this at [0, 0], it will never move? Maybe I have to set it at a fixed speed.
    }
}

Dribbler.RADIUS = 15;
module.exports = Dribbler;
const MovingObject = require("./moving_object");
const Util = require("./util");

function randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += hexDigits[Math.floor((Math.random() * 16))];
    }

    // return color;
    return "#FFFFFF";
}

class Dribbler extends MovingObject {
    constructor(options) {
        options.radius = Dribbler.RADIUS;
        options.vel = options.vel || [0, 0];
        options.color = options.color || randomColor();
        super(options);
        this.isWrappable = true;
    }

    power(impulse) {
        // this.vel[0] = impulse[0]; // I'm probably going to have to change something here.
        // this.vel[1] = impulse[1];  // I feel like this is what makes the dribbler go faster and faster.
        this.vel[0] = impulse[0] * 2.5;
        this.vel[1] = impulse[1] * 2.5;
        this.pos[0] += impulse[0];
        this.pos[1] += impulse[1];
    }

    relocate() {
        this.pos = [465, 250]; // this.game.randomPosition(); 
        this.vel = [0, 0]; // If I keep this at [0, 0], it will never move? Maybe I have to set it at a fixed speed.
    }

    stop() {
        this.vel[0] = 0;
        this.vel[1] = 0;
    }

    sprint(impulse) {
        this.vel[0] = impulse[0] * 5;
        this.vel[1] = impulse[1] * 5;
        this.pos[0] += impulse[0];
        this.pos[1] += impulse[1];
    }
}

Dribbler.RADIUS = 35;
module.exports = Dribbler;
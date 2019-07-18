const Util = require("./util");
const MovingObject = require("./moving_object");
const Dribbler = require("./dribbler");

const DEFAULTS = {
    COLOR: "#505050",
    RADIUS: 25,
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
}

module.exports = Defender;
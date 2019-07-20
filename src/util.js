const Util = {
    inherits(ChildClass, BaseClass) {
        ChildClass.prototype = Object.create(BaseClass.prototype);
        ChildClass.prototype.constructor = ChildClass;
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },
    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    },
    wrap(coord, max) {
        if (coord < 0) {
            // return coord + 1;
            return max - (coord % max);
        } else if (coord > max) {
            return coord % max;
        } else {
            return coord;
        }
    },
    // redirectedVec(length, vel) {
    //     const deg = 1 / (Math.tan(vel[1]/vel[0]));
    //     return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    // }
};

module.exports = Util;
class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.dribbler = this.game.addDribbler();
    }

    bindKeyHandlers() {
        const dribbler = this.dribbler;

        const game = this.game;

        Object.keys(GameView.MOVES).forEach((k) => {
            const move = GameView.MOVES[k];
            key(k, () => { dribbler.power(move); });
        });

        Object.keys(GameView.SPRINT_MOVES).forEach((k) => {
            const move = GameView.SPRINT_MOVES[k];
            key(k, () => { dribbler.sprint(move); });
        });

        // key("space", () => { ship.fireBullet(); });
        key("space", () => { dribbler.stop(); });

        key("enter", () => {game.begin(); });
    }

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;
        // start the animation
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        this.game.step(timeDelta);
        this.game.draw(this.ctx);
        this.lastTime = time;

        // every call to animate requests causes another call to animate
        requestAnimationFrame(this.animate.bind(this));
    }
    
}

GameView.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0],
};

GameView.SPRINT_MOVES = {
    i: [0, -1],
    j: [-1, 0],
    k: [0, 1],
    l: [1, 0],
};


module.exports = GameView;
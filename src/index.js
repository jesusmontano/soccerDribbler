const MovingObject = require("./moving_object.js")
const Defender = require("./defender");

document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    // canvasEl.width = Game.DIM_X;
    // canvasEl.height = Game.DIM_Y;
    window.MovingObject = MovingObject;
    window.Defender = Defender;

    const ctx = canvasEl.getContext("2d");
    // const game = new Game();
    // new GameView(game, ctx).start();
});
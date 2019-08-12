/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\n\nclass Ball extends MovingObject {\n    constructor(options) {\n        super(options);\n        this.pos = options.pos || options.game.randomPosition();\n        this.radius = Ball.RADIUS;\n        this.vel = options.vel || Util.randomVec(Ball.SPEED);\n        this.isWrappable = true;\n    }\n\n    draw(ctx) {\n        const img = document.getElementById(\"ball\");\n        // const pat = ctx.createPattern(img, \"repeat\");\n        ctx.drawImage(img, this.pos[0], this.pos[1])\n        // ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        // ctx.fillStyle = pat;\n        // ctx.fill();\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Dribbler) {\n            otherObject.relocate();\n            // Game.remove(Game.defenders[0]);\n        }\n    }\n}\n\nBall.RADIUS = 35;\nBall.SPEED = 5;\nmodule.exports = Ball;\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/defender.js":
/*!*************************!*\
  !*** ./src/defender.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\n\nconst DEFAULTS = {\n    COLOR: \"#505050\",\n    RADIUS: 35,\n    SPEED: 3\n};\n\nclass Defender extends MovingObject {\n    constructor(options = {}) {\n        options.color = DEFAULTS.COLOR;\n        options.pos = options.pos || options.game.randomPosition();\n        options.radius = DEFAULTS.RADIUS;\n        options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n        super(options);\n    }\n\n    draw(ctx) {\n        const img = document.getElementById(\"defender\");\n        // const pat = ctx.createPattern(img, \"repeat\");\n        ctx.drawImage(img, this.pos[0], this.pos[1])\n        // ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        // ctx.fillStyle = pat;\n        // ctx.fill();\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Dribbler) {\n            otherObject.relocate();\n            debugger;\n            otherObject.life -= 1;\n            debugger;\n            return true;\n        }\n        // } else if (otherObject instanceof Bullet) {\n        //     this.remove();\n        //     otherObject.remove();\n        //     return true;\n        // }\n\n        return false;\n    }\n    \n    wallCollision() {\n        this.vel[0] = - this.vel[0];\n    }\n\n    otherWallCollision() {\n        this.vel[1] = - this.vel[1];\n    }\n}\n\nmodule.exports = Defender;\n\n//# sourceURL=webpack:///./src/defender.js?");

/***/ }),

/***/ "./src/dribbler.js":
/*!*************************!*\
  !*** ./src/dribbler.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction randomColor() {\n    const hexDigits = \"0123456789ABCDEF\";\n\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += hexDigits[Math.floor((Math.random() * 16))];\n    }\n\n    // return color;\n    return \"#FFFFFF\";\n}\n\nclass Dribbler extends MovingObject {\n    constructor(options) {\n        options.radius = Dribbler.RADIUS;\n        options.vel = options.vel || [0, 0];\n        options.color = options.color || randomColor();\n        super(options);\n        this.isWrappable = true;\n        this.life = 1;\n    }\n\n    draw(ctx) {\n        \n        const img = document.getElementById(\"dribbler\");\n        // const pat = ctx.createPattern(img, \"repeat\");\n        ctx.drawImage(img, this.pos[0], this.pos[1])\n        // ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n    \n\n        // const img = document.getElementById(\"dribbler\");\n        // ctx.drawImage(img, this.pos[0], this.pos[1])\n\n        // ctx.beginPath();\n        // ctx.arc(\n        //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        // );\n    }\n\n    power(impulse) {\n        // this.vel[0] = impulse[0]; // I'm probably going to have to change something here.\n        // this.vel[1] = impulse[1];  // I feel like this is what makes the dribbler go faster and faster.\n        this.vel[0] = impulse[0] * 2.5;\n        this.vel[1] = impulse[1] * 2.5;\n        this.pos[0] += impulse[0];\n        this.pos[1] += impulse[1];\n    }\n\n    relocate() {\n        this.pos = [465, 250]; // this.game.randomPosition(); \n        this.vel = [0, 0]; // If I keep this at [0, 0], it will never move? Maybe I have to set it at a fixed speed.\n    }\n\n    stop() {\n        this.vel[0] = 0;\n        this.vel[1] = 0;\n    }\n\n    sprint(impulse) {\n        this.vel[0] = impulse[0] * 5;\n        this.vel[1] = impulse[1] * 5;\n        this.pos[0] += impulse[0];\n        this.pos[1] += impulse[1];\n    }\n}\n\nDribbler.RADIUS = 35;\nmodule.exports = Dribbler;\n\n//# sourceURL=webpack:///./src/dribbler.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Defender = __webpack_require__(/*! ./defender */ \"./src/defender.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\nconst Powerup = __webpack_require__(/*! ./powerup */ \"./src/powerup.js\");\nconst Ball = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\nconst YellowCard = __webpack_require__(/*! ./yellow_card */ \"./src/yellow_card.js\");\n\nclass Game {\n    constructor() {\n        this.defenders = [];\n        this.dribblers = [];\n        this.powerups = [];\n        this.balls = [];\n        this.yellowCards = [];\n        this.state = \"game\";\n\n        this.addDefenders();\n        this.addPowerups();\n        this.addBall();\n        this.addYellowCard();\n    }\n\n    add(object) {\n        if (object instanceof Defender) {\n            this.defenders.push(object);\n        } else if (object instanceof Dribbler) {\n            this.dribblers.push(object);\n        } else if (object instanceof Powerup) {\n            this.powerups.push(object);\n        } else if (object instanceof Ball) {\n            this.balls.push(object);\n        } else if (object instanceof YellowCard) {\n            this.yellowCards.push(object);  \n        } else {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n\n\n    addDefenders() {\n        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {\n            this.add(new Defender({ game: this }));\n        }\n    }\n\n    addPowerups() {\n        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {\n            this.add(new Powerup({ game: this }));\n        }\n        debugger;\n    }\n\n    addYellowCard() {\n        for (let i = 0; i < 1; i++) {\n            this.add(new YellowCard({ game: this }));\n        }\n        debugger;\n    }\n\n    addDribbler() {\n        const dribbler = new Dribbler({\n            pos: [465, 250], // this.randomPosition(), \n            game: this\n        });\n\n        this.add(dribbler);\n\n        return dribbler;\n    }\n\n    addBall() {\n        const ball = new Ball({\n            pos: this.randomPosition(), \n            game: this\n        });\n\n        this.add(ball);\n\n        return ball;\n    }\n\n    \n    allObjects() {\n        return [].concat(this.dribblers, this.defenders, this.powerups, this.balls, this.yellowCards);\n    }\n    \n    checkCollisions() {\n        const allObjects = this.allObjects();\n        for (let i = 0; i < allObjects.length; i++) {\n            for (let j = 0; j < allObjects.length; j++) {\n                const obj1 = allObjects[i];\n                const obj2 = allObjects[j];\n                \n                if (obj1.isCollidedWith(obj2)) {\n                    const collision = obj1.collideWith(obj2);\n                    if (collision) return;\n                }\n            }\n        }\n    }\n\n    checkWallCollisions() {\n        const obj = this.allObjects();\n        for (let i = 0; i < obj.length; i++) {\n            if (obj[i] instanceof Defender) {\n                if ((obj[i][0] < obj[i].radius) || ((obj[i][0] > 1000 - obj[i].radius))) {\n                    obj[i].wallCollision();\n                }   \n            } if (obj[i] instanceof Defender) {\n                if((obj[i][1] < obj[i].radius) || (obj[i][1] > 600 - obj[i].radius)) {\n                    obj[i].otherWallCollision();\n                }\n            }\n        }\n    }\n    \n    draw(ctx) {\n        if (this.state === \"over\") {\n            const img = new Image();\n            img.onload = function () {\n                ctx.drawImage(img, 0, 0);\n            };\n            img.src = 'gameOver.png';\n        } else if (this.state === \"victory\") {\n            const img = new Image();\n            img.onload = function () {\n                ctx.drawImage(img, 0, 0);\n            };\n            img.src = 'victory.png';\n        } else {\n            const img = new Image();\n            img.onload = function () {\n                ctx.drawImage(img, 0, 0);\n            };\n            img.src = 'background.jpeg';\n\n            this.allObjects().forEach((object) => {\n                object.draw(ctx);\n            });\n        }\n\n\n        // const img = new Image();\n        // img.onload = function () {\n        //     ctx.drawImage(img, 0, 0);\n        // };\n        // img.src = 'background.jpeg';\n\n\n        // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        // ctx.fillStyle = Game.BG_COLOR;\n        // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        \n        // this.allObjects().forEach((object) => {\n        //     object.draw(ctx);\n        // });\n    }\n    \n    isOutOfBounds(pos) {\n        return (pos[0] < 0) || (pos[1] < 0) ||\n        (pos[0] > Game.DIM_X - 70) || (pos[1] > Game.DIM_Y - 70);\n    }\n    \n    moveObjects(delta) {\n        this.allObjects().forEach((object) => {\n            object.move(delta);\n        });\n    }\n    \n    randomPosition() {\n        // return [\n        //     Game.DIM_X * Math.random(),\n        //     Game.DIM_Y * Math.random()\n        // ];\n        const pos = [\n            Game.DIM_X * Math.random(),\n            Game.DIM_Y * Math.random()\n        ];\n\n        if (pos[0] < 100 || pos[0] > 900) {\n            pos[0] = Game.DIM_X * Math.random();\n        }\n\n        if (pos[1] < 100 || pos[1] > 500) {\n            pos[1] = Game.DIM_Y * Math.random();\n        }\n\n        return pos;\n    }\n    \n    remove(object) {\n        if (object instanceof Defender) {\n            this.defenders.splice(this.defenders.indexOf(object), 1);\n        } else if (object instanceof Dribbler) {\n            this.dribblers.splice(this.dribblers.indexOf(object), 1);\n        } else if (object instanceof Powerup) {\n            this.powerups.splice(this.powerups.indexOf(object), 1);\n        } else if (object instanceof Ball) {\n            this.balls.splice(this.balls.indexOf(object), 1);\n        } else if (object instanceof YellowCard) {\n            this.yellowCards.splice(this.yellowCards.indexOf(object), 1);\n        }else {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n\n    checkState() {\n        if (this.defenders.length === 0 && this.dribblers[0].lives > 0) {\n            this.state = \"victory\";\n            this.draw(ctx);\n        } else if (this.defenders.length > 0 && this.dribblers[0].lives === 0) {\n            this.state = \"over\";\n            this.draw(ctx);\n        } else {\n            this.state = \"game\";\n        }\n    }\n    \n    step(delta) {\n        this.moveObjects(delta);\n        this.checkCollisions();\n        // this.checkWallCollisions();\n    }\n\n    wrap(pos) {\n        return [\n            Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n        ];\n    } \n    // // Don't need this in the context of my game.\n\n}\n\nGame.BG_COLOR = \"#12A510\";\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.FPS = 32;\nGame.NUM_DEFENDERS = 5;\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n    constructor(game, ctx) {\n        this.ctx = ctx;\n        this.game = game;\n        this.dribbler = this.game.addDribbler();\n    }\n\n    bindKeyHandlers() {\n        const dribbler = this.dribbler;\n\n        Object.keys(GameView.MOVES).forEach((k) => {\n            const move = GameView.MOVES[k];\n            key(k, () => { dribbler.power(move); });\n        });\n\n        Object.keys(GameView.SPRINT_MOVES).forEach((k) => {\n            const move = GameView.SPRINT_MOVES[k];\n            key(k, () => { dribbler.sprint(move); });\n        });\n\n        // key(\"space\", () => { ship.fireBullet(); });\n        key(\"space\", () => { dribbler.stop(); });\n    }\n\n    start() {\n        this.bindKeyHandlers();\n        this.lastTime = 0;\n        // start the animation\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        this.game.step(timeDelta);\n        this.game.draw(this.ctx);\n        this.lastTime = time;\n\n        // every call to animate requests causes another call to animate\n        requestAnimationFrame(this.animate.bind(this));\n    }\n    \n}\n\nGameView.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0],\n};\n\nGameView.SPRINT_MOVES = {\n    i: [0, -1],\n    j: [-1, 0],\n    k: [0, 1],\n    l: [1, 0],\n};\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\")\nconst Defender = __webpack_require__(/*! ./defender */ \"./src/defender.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n    canvasEl.width = Game.DIM_X;\n    canvasEl.height = Game.DIM_Y;\n    // window.MovingObject = MovingObject;\n    // window.Defender = Defender;\n    // window.GameView = GameView;\n\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new Game();\n    new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass MovingObject {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n        this.game = options.game;\n        this.isWrappable = true; //This does not apply in my case since there is no wrapping.\n    }\n\n    collideWith(otherObject) {\n        // default do nothing\n    }\n\n    draw(ctx) {\n        const img = document.getElementById(\"dribbler\");\n        // const pat = ctx.createPattern(img, \"repeat\");\n        ctx.drawImage(img, this.pos[0], this.pos[1])\n        // ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        // ctx.fillStyle = pat;\n        // ctx.fill();\n    }\n\n    isCollidedWith(otherObject) {\n        const centerDist = Util.dist(this.pos, otherObject.pos);\n        return centerDist < (this.radius + otherObject.radius);\n    }\n\n    move(timeDelta) {\n        // timeDelta is number of milliseconds since last move\n        // if the computer is busy the time delta will be larger\n        // in this case the MovingObject should move farther in this frame\n        // velocity of object is how far it should move in 1/60th of a second\n        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n            offsetX = this.vel[0] * velocityScale,\n            offsetY = this.vel[1] * velocityScale;\n\n        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    \n\n        if (this.game.isOutOfBounds(this.pos)) {\n            if (this.isWrappable) {\n                // this.wallCollision();\n                // this.otherWallCollision();\n                this.pos = this.game.wrap(this.pos);\n            } else {\n                this.vel = [0, 0];\n                // need to add additional logic here, probably going to\n                // have to increase position by one unit\n                // this.remove();\n            }\n        }\n    }\n\n    remove() {\n        this.game.remove(this);\n    }   \n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nmodule.exports = MovingObject\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/powerup.js":
/*!************************!*\
  !*** ./src/powerup.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\n\nclass Powerup extends MovingObject {\n    constructor(options) {\n        super(options);\n        this.pos = options.pos || options.game.randomPosition();\n        this.radius = Powerup.RADIUS;\n        this.vel = options.vel || Util.randomVec(Powerup.SPEED);\n        this.isWrappable = true;\n    }\n\n    draw(ctx) {\n        const img = document.getElementById(\"redcard\");\n        // const pat = ctx.createPattern(img, \"repeat\");\n        ctx.drawImage(img, this.pos[0], this.pos[1])\n        // ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        // ctx.fillStyle = pat;\n        // ctx.fill();\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Dribbler) {\n            this.remove();\n            (this.game.defenders[0]).remove();\n            // Game.remove(Game.defenders[0]);\n        }\n    }\n}\n\nPowerup.RADIUS = 35;\nPowerup.SPEED = 2;\nmodule.exports = Powerup;\n\n//# sourceURL=webpack:///./src/powerup.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    inherits(ChildClass, BaseClass) {\n        ChildClass.prototype = Object.create(BaseClass.prototype);\n        ChildClass.prototype.constructor = ChildClass;\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n    dist(pos1, pos2) {\n        return Math.sqrt(\n            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n        );\n    },\n    wrap(coord, max) {\n        if (coord < 0) {\n            // return coord + 1;\n            return max - (coord % max);\n        } else if (coord > max) {\n            return coord % max;\n        } else {\n            return coord;\n        }\n    },\n    // redirectedVec(length, vel) {\n    //     const deg = 1 / (Math.tan(vel[1]/vel[0]));\n    //     return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    // }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ }),

/***/ "./src/yellow_card.js":
/*!****************************!*\
  !*** ./src/yellow_card.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\n\nclass YellowCard extends MovingObject {\n    constructor(options) {\n        super(options);\n        this.pos = options.pos || options.game.randomPosition();\n        this.radius = YellowCard.RADIUS;\n        this.vel = options.vel || Util.randomVec(YellowCard.SPEED);\n        this.isWrappable = true;\n    }\n\n    draw(ctx) {\n        const img = document.getElementById(\"yellowcard\");\n        // const pat = ctx.createPattern(img, \"repeat\");\n        ctx.drawImage(img, this.pos[0], this.pos[1])\n        // ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        // ctx.fillStyle = pat;\n        // ctx.fill();\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Dribbler) {\n            this.remove();\n            // (this.game.defenders[0]).remove(); // don't remove defenders, but slow them down\n            let velFactor = Math.floor(Math.random() * 10);\n\n            if (velFactor <= 4) {\n                for (let i = 0; i < this.game.defenders.length; i++) {\n                    debugger;\n                    this.game.defenders[i].vel[0] = this.game.defenders[i].vel[0] * 0.8\n                    this.game.defenders[i].vel[1] = this.game.defenders[i].vel[1] * 0.8\n                }\n            } else {\n                for (let i = 0; i < this.game.defenders.length; i++) {\n                    debugger;\n                    this.game.defenders[i].vel[0] = this.game.defenders[i].vel[0] * 1.4;\n                    this.game.defenders[i].vel[1] = this.game.defenders[i].vel[1] * 1.4;\n                }\n            }\n\n            if (velFactor <= 4) {\n                this.game.balls[0].vel[0] = this.game.balls[0].vel[0] * 0.8;\n                this.game.balls[0].vel[1] = this.game.balls[0].vel[1] * 0.8;\n            } else {\n                this.game.balls[0].vel[0] = this.game.balls[0].vel[0] * 1.4;\n                this.game.balls[0].vel[1] = this.game.balls[0].vel[1] * 1.4;\n            }\n\n            // for (let i = 0; i < this.game.defenders.length; i++) {\n            //     debugger;\n            //     this.game.defenders[i].vel[0] = this.game.defenders[i].vel[0] * 0.75 \n            //     this.game.defenders[i].vel[1] = this.game.defenders[i].vel[1] * 0.75 \n            // }\n\n            // this.game.balls[0].vel[0] = this.game.balls[0].vel[0] * 1.5\n            // this.game.balls[0].vel[1] = this.game.balls[0].vel[1] * 1.5\n\n            // Game.remove(Game.defenders[0]);\n        }\n    }\n}\n\nYellowCard.RADIUS = 35;\nYellowCard.SPEED = 2;\nmodule.exports = YellowCard;\n\n//# sourceURL=webpack:///./src/yellow_card.js?");

/***/ })

/******/ });
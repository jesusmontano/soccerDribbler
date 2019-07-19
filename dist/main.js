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

/***/ "./src/defender.js":
/*!*************************!*\
  !*** ./src/defender.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\n\nconst DEFAULTS = {\n    COLOR: \"#505050\",\n    RADIUS: 25,\n    SPEED: 4\n};\n\nclass Defender extends MovingObject {\n    constructor(options = {}) {\n        options.color = DEFAULTS.COLOR;\n        options.pos = options.pos || options.game.randomPosition();\n        options.radius = DEFAULTS.RADIUS;\n        options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n        super(options);\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Dribbler) {\n            otherObject.relocate();\n            return true;\n        }\n        // } else if (otherObject instanceof Bullet) {\n        //     this.remove();\n        //     otherObject.remove();\n        //     return true;\n        // }\n\n        return false;\n    }\n}\n\nmodule.exports = Defender;\n\n//# sourceURL=webpack:///./src/defender.js?");

/***/ }),

/***/ "./src/dribbler.js":
/*!*************************!*\
  !*** ./src/dribbler.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction randomColor() {\n    const hexDigits = \"0123456789ABCDEF\";\n\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += hexDigits[Math.floor((Math.random() * 16))];\n    }\n\n    // return color;\n    return \"#FFFFFF\";\n}\n\nclass Dribbler extends MovingObject {\n    constructor(options) {\n        options.radius = Dribbler.RADIUS;\n        options.vel = options.vel || [0, 0];\n        options.color = options.color || randomColor();\n        super(options);\n    }\n\n    power(impulse) {\n        // this.vel[0] = impulse[0]; // I'm probably going to have to change something here.\n        // this.vel[1] = impulse[1];  // I feel like this is what makes the dribbler go faster and faster.\n        this.vel[0] = impulse[0] * 3;\n        this.vel[1] = impulse[1] * 3;\n        this.pos[0] += impulse[0];\n        this.pos[1] += impulse[1];\n    }\n\n    relocate() {\n        this.pos = this.game.randomPosition(); // I will want to make this be fixed, not random.\n        this.vel = [0, 0]; // If I keep this at [0, 0], it will never move? Maybe I have to set it at a fixed speed.\n    }\n}\n\nDribbler.RADIUS = 15;\nmodule.exports = Dribbler;\n\n//# sourceURL=webpack:///./src/dribbler.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Defender = __webpack_require__(/*! ./defender */ \"./src/defender.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Dribbler = __webpack_require__(/*! ./dribbler */ \"./src/dribbler.js\");\n\nclass Game {\n    constructor() {\n        this.defenders = [];\n        this.dribblers = [];\n\n        this.addDefenders();\n    }\n\n    add(object) {\n        if (object instanceof Defender) {\n            this.defenders.push(object);\n        } else if (object instanceof Dribbler) {\n            this.dribblers.push(object);\n        } else {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n\n\n    addDefenders() {\n        for (let i = 0; i < Game.NUM_DEFENDERS; i++) {\n            this.add(new Defender({ game: this }));\n        }\n    }\n\n    addDribbler() {\n        const dribbler = new Dribbler({\n            pos: this.randomPosition(), // I think I won't want this to be a random position. I don't want the dribbler to just start anywhere.\n            game: this\n        });\n\n        this.add(dribbler);\n\n        return dribbler;\n    }\n\n    \n    allObjects() {\n        return [].concat(this.dribblers, this.defenders);\n    }\n    \n    checkCollisions() {\n        const allObjects = this.allObjects();\n        for (let i = 0; i < allObjects.length; i++) {\n            for (let j = 0; j < allObjects.length; j++) {\n                const obj1 = allObjects[i];\n                const obj2 = allObjects[j];\n                \n                if (obj1.isCollidedWith(obj2)) {\n                    const collision = obj1.collideWith(obj2);\n                    if (collision) return;\n                }\n            }\n        }\n    }\n    \n    draw(ctx) {\n        const img = new Image();\n        img.onload = function () {\n            ctx.drawImage(img, 0, 0);\n        };\n        img.src = 'field.jpg';\n\n\n        // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        // ctx.fillStyle = Game.BG_COLOR;\n        // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        \n        this.allObjects().forEach((object) => {\n            object.draw(ctx);\n        });\n    }\n    \n    isOutOfBounds(pos) {\n        return (pos[0] < 0) || (pos[1] < 0) ||\n        (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n    }\n    \n    moveObjects(delta) {\n        this.allObjects().forEach((object) => {\n            object.move(delta);\n        });\n    }\n    \n    randomPosition() {\n        return [\n            Game.DIM_X * Math.random(),\n            Game.DIM_Y * Math.random()\n        ];\n    }\n    \n    remove(object) {\n        if (object instanceof Defender) {\n            this.defenders.splice(this.defenders.indexOf(object), 1);\n        } else if (object instanceof Dribbler) {\n            this.dribblers.splice(this.dribblers.indexOf(object), 1);\n        } else {\n            throw new Error(\"unknown type of object\");\n        }\n    }\n    \n    step(delta) {\n        this.moveObjects(delta);\n        this.checkCollisions();\n    }\n\n    // wrap(pos) {\n    //     return [\n    //         Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n    //     ];\n    // } \n    // // Don't need this in the context of my game.\n\n}\n\nGame.BG_COLOR = \"#12A510\";\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.FPS = 32;\nGame.NUM_DEFENDERS = 10;\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n    constructor(game, ctx) {\n        this.ctx = ctx;\n        this.game = game;\n        this.dribbler = this.game.addDribbler();\n    }\n\n    bindKeyHandlers() {\n        const dribbler = this.dribbler;\n\n        Object.keys(GameView.MOVES).forEach((k) => {\n            const move = GameView.MOVES[k];\n            key(k, () => { dribbler.power(move); });\n        });\n\n        // key(\"space\", () => { ship.fireBullet(); });\n    }\n\n    start() {\n        this.bindKeyHandlers();\n        this.lastTime = 0;\n        // start the animation\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const timeDelta = time - this.lastTime;\n\n        this.game.step(timeDelta);\n        this.game.draw(this.ctx);\n        this.lastTime = time;\n\n        // every call to animate requests causes another call to animate\n        requestAnimationFrame(this.animate.bind(this));\n    }\n    \n}\n\nGameView.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0],\n};\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass MovingObject {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n        this.game = options.game;\n        // this.isWrappable = true; This does not apply in my case since there is no wrapping.\n    }\n\n    collideWith(otherObject) {\n        // default do nothing\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n        );\n        ctx.fill();\n    }\n\n    isCollidedWith(otherObject) {\n        const centerDist = Util.dist(this.pos, otherObject.pos);\n        return centerDist < (this.radius + otherObject.radius);\n    }\n\n    move(timeDelta) {\n        // timeDelta is number of milliseconds since last move\n        // if the computer is busy the time delta will be larger\n        // in this case the MovingObject should move farther in this frame\n        // velocity of object is how far it should move in 1/60th of a second\n        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n            offsetX = this.vel[0] * velocityScale,\n            offsetY = this.vel[1] * velocityScale;\n\n        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    }\n\n    // if (this.game.isOutOfBounds(this.pos)) {\n    // if (this.isWrappable) {\n    //     this.pos = this.game.wrap(this.pos);\n    // } else {\n    //     this.remove();\n    // }\n    // }\n    remove() {\n        this.game.remove(this);\n    }   \n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nmodule.exports = MovingObject\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    inherits(ChildClass, BaseClass) {\n        ChildClass.prototype = Object.create(BaseClass.prototype);\n        ChildClass.prototype.constructor = ChildClass;\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n    dist(pos1, pos2) {\n        return Math.sqrt(\n            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n        );\n    },\n};\n\nmodule.exports = Util; \n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });
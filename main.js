//@ts-check

import ControlMod from './assets/js/lib/ControlMod.js';
import Engine from './assets/js/lib/Engine.js';
import Game from './assets/js/Game.js';

const KEY_P = 80;
const KEY_DOT = 190;
const KEY_SHIFT = 16;

/**
 * @typedef {CanvasRenderingContext2D} Ctx
 * @typedef {HTMLCanvasElement} Canvas
 */

window.addEventListener('DOMContentLoaded', (_event) => {
    const container = document.getElementById('container');
    /** @type {Canvas} */
    // @ts-ignore
    const canvas = document.getElementById('the-canvas');
    /** @type {Ctx} */
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        const border = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--canvas-border')) || 0;
        let cw = 0 + container.offsetWidth - 2 * border;
        let ch = 0 + container.offsetHeight - 2 * border;

        cw = Math.floor(cw - (cw % 10));
        cw = cw > 600 ? 600 : cw;
        ch = Math.floor((cw * 4) / 3);
        ch -= ch % 2;

        canvas.height = ch;
        canvas.width = cw;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);

    const input = new ControlMod(canvas);
    const game = new Game(ctx, input);

    input.add('keydown', (/**@type {boolean[]} */ keys, /**@type {KeyboardEvent} */ event) => {
        
        if (keys[KEY_P]) {
            if (engine.paused()) {
                engine.resume();
            } else {
                engine.pause();
            }
            return true;
        } else if (keys[KEY_DOT]) {
            if (engine.paused()) {
                engine.step();
                return true;
            }
        } else if (keys[KEY_SHIFT]) {
            if (engine.paused()) {
                engine.redraw();
                return true;
            }
        }

        game.keyDown(keys, event);
        return false;
    });

    input.add('keyup', (/**@type {boolean[]} */ keys, /**@type {KeyboardEvent} */ event) => {
        if (engine.paused()) {
            if (keys[KEY_SHIFT] === false) {
                engine.redraw();
                return true;
            }
        }
        game.keyUp(keys, event);
    });

    // Handle mouse / touch

    input.add('pointerStart', game.mouseDown);

    const engine = new Engine(60, (deltaTime, frameCounter) => {
        game.update(deltaTime, frameCounter);
    });

    // start the loop
    engine.start();
});

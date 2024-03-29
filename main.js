// @ts-check

import Engine, { KEY_DOT, KEY_P, KEY_SHIFT } from './assets/js/lib/Engine.js';

import Game from './assets/js/Game.js';
import InputMgr from './assets/js/lib/InputMgr.js';

/**
 * @typedef {CanvasRenderingContext2D} Ctx
 * @typedef {HTMLCanvasElement} Canvas
 */

window.addEventListener('DOMContentLoaded', (_event) => {
    /** @type {HTMLElement} */
    // @ts-ignore
    const container = document.querySelector('#container');

    /** @type {Canvas} */
    // @ts-ignore
    const canvas = document.querySelector('#the-canvas');

    /** @type {Ctx} */
    // @ts-ignore
    const ctx = canvas.getContext('2d');

    /** @type {Engine} */
    // @ts-ignore
    let engine = undefined;

    const resizeCanvas = () => {
        const border = Number.parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--canvas-border')) || 0;
        let cw = 0 + container.offsetWidth - 2 * border;
        let ch = 0 + container.offsetHeight - 2 * border;

        cw = Math.floor(cw - (cw % 10));
        cw = cw > 600 ? 600 : cw;
        ch = Math.floor((cw * 4) / 3);
        ch -= ch % 2;

        canvas.height = ch;
        canvas.width = cw;

        if (engine && engine.paused()) {
            engine.redraw();
        }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);

    const input = new InputMgr(canvas);
    const game = new Game(ctx, input);

    input.add('keydown', (/** @type {boolean[]} */ keys, /** @type {KeyboardEvent} */ event) => {
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
        } else if (keys[KEY_SHIFT] && engine.paused()) {
            engine.redraw();
            return true;
        }

        game.keyDown(keys, event);
        return false;
    });

    input.add('keyup', (/** @type {boolean[]} */ keys, /** @type {KeyboardEvent} */ event) => {
        if (engine.paused() && keys[KEY_SHIFT] === false) {
            engine.redraw();
            return true;
        }
        game.keyUp(keys, event);
    });

    // Handle mouse / touch

    input.add('pointerStart', game.mouseDown);

    engine = new Engine(60, (deltaTime, frameCounter) => {
        game.update(deltaTime, frameCounter);
    });

    // start the loop
    engine.start();
});

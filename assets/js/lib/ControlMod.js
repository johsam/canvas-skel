//@ts-check

/**
 * Is mouse helper
 * @param {Event} event
 */
const isMouse = (event) => event.type === 'mousedown' || event.type === 'mouseup' || event.type == 'mousemove';

export default class ControlMod {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.win = window;

        this.input = {
            pointerDown: false,
            mouseX: 0,
            mouseY: 0,
            pos: [{ x: 0, y: 0 }],
            keys: Array.from({ length: 255 }, () => false),
        };

        this.userHandlers = {
            pointerStart: [],
            pointerMove: [],
            pointerEnd: [],
            keydown: [],
            keyup: [],
        };

        this.handlers = {
            
            pointerStart: (pos, event) => {
                this.input.pointerDown = true;
                this.input.pos = pos;
                this.callUserHandlers('pointerStart', pos, event);
            },
            pointerMove: (pos, event) => {
                this.input.mouseX = pos[0].x;
                this.input.mouseY = pos[0].y;
                this.input.pos = pos;

                this.callUserHandlers('pointerMove', pos, event);
            },
            pointerEnd: (pos, event) => {
                if (isMouse(event)) {
                    this.input.pointerDown = false;
                    this.input.pos = [];
                } else {
                    if (event.targetTouches.length === 0) {
                        this.input.pointerDown = false;
                        this.input.pos = [];
                    } else {
                        this.input.pos = pos;
                    }
                }
                this.callUserHandlers('pointerEnd', pos, event);
            },
        };

        // mouse
        this.setPointerHandler('mousedown', 'pointerStart');
        this.setPointerHandler('mousemove', 'pointerMove');
        this.setPointerHandler('mouseup', 'pointerEnd');
        // touch
        this.setPointerHandler('touchstart', 'pointerStart');
        this.setPointerHandler('touchmove', 'pointerMove');
        this.setPointerHandler('touchend', 'pointerEnd');
        // keyboard
        this.setKeyHandler('keydown');
        this.setKeyHandler('keyup');
    }

    /**
     *
     * @param {string} type
     * @param {*} arg
     * @param {Event} event
     */
    callUserHandlers = (type, arg, event) => {
        let handled = false;
        this.userHandlers[type].forEach((userHandler) => {
            if (!handled) {
                handled = userHandler.call(this, arg, event) || false;
            }
        });
    };

    /**
     * Set a key handler
     * @param {string} DOMType
     */
    setKeyHandler = (DOMType) => {
        // @ts-ignore
        this.win.addEventListener(DOMType, (/**@type KeyboardEvent */ event) => {
            this.input.keys[event.keyCode] = event.type === 'keydown';
            this.callUserHandlers(DOMType, this.input.keys, event);
        });
    };

    /**
     * Set an event handler for the given input state, DOMType, and type in handlers
     * @param {string} DOMType
     * @param {string} type
     */
    setPointerHandler = (DOMType, type) => {
        this.canvas.addEventListener(DOMType, (event) => {
            const pos = getCanvasRelativeArray(event);
            event.preventDefault();
            this.handlers[type](pos, event);
        });
    };

    /**
     * Add a handler
     * @param {string} type
     * @param {function} handler
     */

    add(type, handler) {
        this.userHandlers[type].push(handler);
    }
}

/**
 * get an array of point objects relative to the canvas rather than the window object
 *
 * @param   {any} event
 * @returns {object[]}
 */

const getCanvasRelativeArray = (event) => {
    const canvas = event.target;
    const bx = canvas.getBoundingClientRect();
    const arr = [];

    // mouse event
    if (isMouse(event)) {
        return [
            {
                x: event.clientX - bx.left,
                y: event.clientY - bx.top,
                bx: bx,
                e: event,
                touch: {},
            },
        ];
    }
    // touch
    let i = 0;
    while (i < event.targetTouches.length) {
        const touch = event.targetTouches[i];
        arr.push({
            x: touch.clientX - bx.left,
            y: touch.clientY - bx.top,
            e: event,
            bx: bx,
            touch: touch,
        });
        i += 1;
    }
    return arr;
};

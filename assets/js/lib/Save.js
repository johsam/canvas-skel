// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ControlMod = (function () {
    // is mouse helper
    const isMouse = (e) => e.type === 'mousedown' || e.type === 'mouseup' || e.type == 'mousemove';

    // get an array of point objects relative to the canvas
    // rather than the window object
    const getCanvasRelativeArray = function (e) {
        const canvas = e.target,
            bx = canvas.getBoundingClientRect(),
            arr = [];
        // mouse event
        if (isMouse(e)) {
            return [
                {
                    x: e.clientX - bx.left,
                    y: e.clientY - bx.top,
                    bx: bx,
                    e: e,
                    touch: {},
                },
            ];
        }
        // touch
        let i = 0,
            touch;
        while (i < e.targetTouches.length) {
            touch = e.targetTouches[i];
            arr.push({
                x: touch.clientX - bx.left,
                y: touch.clientY - bx.top,
                touch: touch,
                e: e,
                bx: bx,
            });
            i += 1;
        }
        return arr;
    };

    // fill an array
    const fill = function (count, val) {
        return Array.apply(0, {
            length: count,
        }).map(function () {
            return val;
        });
    };

    const createInputState = function (canvas, win) {
        const input = {
            canvas: canvas,
            win: win,
            pointerDown: false,
            pos: [],
            keys: fill(255, false),
            userHandlers: {
                pointerStart: [],
                pointerMove: [],
                pointerEnd: [],
                keydown: [],
                keyup: [],
            },
        };
        return input;
    };

    const callUserHandlers = function (input, type, a, e) {
        input.userHandlers[type].forEach(function (userHandler) {
            userHandler.call(input, a, input, e);
        });
    };

    // handlers
    const handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos = pos;
            callUserHandlers(input, 'pointerStart', pos, e);
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos = pos;
            }
            callUserHandlers(input, 'pointerMove', pos, e);
        },
        pointerEnd: function (pos, input, e) {
            if (isMouse(e)) {
                input.pointerDown = false;
                input.pos = [];
            } else {
                if (e.targetTouches.length === 0) {
                    input.pointerDown = false;
                    input.pos = [];
                } else {
                    input.pos = pos;
                }
            }
            callUserHandlers(input, 'pointerEnd', pos, e);
        },
    };

    // set an event handler for the given input state, DOMType, and type in handlers
    const setPointerHandler = function (input, DOMType, type) {
        input.canvas.addEventListener(DOMType, function (e) {
            const pos = getCanvasRelativeArray(e);
            e.preventDefault();
            handlers[type](pos, input, e);
        });
    };

    // set a key handler
    const setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.keyCode] = e.type === 'keydown';
            callUserHandlers(input, DOMType, input.keys, e);
        });
    };

    const api = function (canvas, win) {
        const input = createInputState(canvas, win || window);
        // mouse
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mousemove', 'pointerMove');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
        // touch
        setPointerHandler(input, 'touchstart', 'pointerStart');
        setPointerHandler(input, 'touchmove', 'pointerMove');
        setPointerHandler(input, 'touchend', 'pointerEnd');
        // keyboard
        setKeyHandler(input, 'keydown');
        setKeyHandler(input, 'keyup');
        return input;
    };

    // add a handler
    api.add = function (input, type, handler) {
        input.userHandlers[type].push(handler);
    };

    return api;
})();

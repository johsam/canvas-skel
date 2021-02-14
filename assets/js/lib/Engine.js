//@ts-check

export default class Engine {
    /**
     * @param {number} fps
     * @param {function(number,number):void} callback
     */

    constructor(fps, callback) {
        this.raf = undefined;
        this.fps = fps;
        this.fpsInterval = 1000.0 / fps;
        this.callback = callback;

        this.setup();
    }

    setup = () => {
        this.then = window.performance.now();
        this.last = this.then;
        this.frame = 0;
        this.isPaused = false;
        this.singleStep = false;
    };

    /**
     *
     * @param {number} newTime
     */
    animate = (newTime) => {
        // request another frame

        requestAnimationFrame(this.animate);

        // calc elapsed time since last loop

        const now = newTime;
        const elapsed = now - this.then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)

            this.then = now - (elapsed % this.fpsInterval);

            if (!this.isPaused || this.singleStep) {
                const delta = now - this.last;
                this.callback(delta, this.frame);
                this.frame += 1;
                this.singleStep = false;
            }

            this.last = now;
        }
    };

    /**
     * @returns {boolean}
     */
    paused = () => {
        return this.isPaused;
    };

    start = () => {
        this.setup();
        requestAnimationFrame(this.animate);
    };

    pause = () => {
        this.isPaused = true;
    };

    resume = () => {
        this.isPaused = false;
    };
    step = () => {
        this.singleStep = true;
    };

    redraw = () => {
        this.callback(0, this.frame - 1);
    };
}

//@ts-check

export default class Game {
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {*} input
     */
    constructor(ctx, input) {
        this.ctx = ctx;
        this.input = input.input;
        this.currentAngle = 0;
    }
    /**
     * @param {boolean[]} keys
     * @param {KeyboardEvent} _event
     */
    keyDown = (keys, _event) => {
        const down = [];
        keys.map((key, index) => {
            if (key) down.push(index);
        });
        //console.log(down);
    };

    /**
     * @param {boolean[]} _keys
     * @param {KeyboardEvent} _event
     */
    keyUp = (_keys, _event) => {
        //console.log(keys);
    };

    /**
     * @param {Array.<{x:number,y:number}>} _pos
     * @param {MouseEvent} _event
     */
    mouseDown = (_pos, _event) => {
        //console.log(pos);
    };

    /**
     *
     * @param {number} deltaTime
     * @param {number} frameCounter
     */

    update = (deltaTime, frameCounter) => {
        // console.log(deltaTime,frameCounter);

        this.currentAngle += ((deltaTime / 60) * Math.PI) / 180;
        this.currentAngle %= 2* Math.PI;

        const ctx = this.ctx;

        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.save();

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font = '20px arial';

        let txt = `${width}x${height}`;
        ctx.fillText(txt, 10, 10);

        txt = (1000.0 / (deltaTime === 0 ? 1000.0 : deltaTime)).toFixed(1);
        ctx.fillText(txt, width - 50, 10);

        txt = frameCounter.toFixed(0);
        ctx.fillText(txt, width / 2 - ctx.measureText(txt).width / 2, 10);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ffff00';

        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
        ctx.stroke();

        if (this.input.pointerDown) {
            for (const { x, y } of this.input.pos) {
                if (this.input.keys[16]) {
                    ctx.strokeStyle = '#00ff00';
                } else {
                    ctx.strokeStyle = '#ffff00';
                }

                ctx.beginPath();

                ctx.moveTo(x - 20, y);
                ctx.lineTo(x + 20, y);

                ctx.moveTo(x, y - 20);
                ctx.lineTo(x, y + 20);

                ctx.stroke();
            }
        }

        const scaled = width * 0.4;
    
        const nx = scaled * Math.cos(this.currentAngle);
        const ny = scaled * Math.sin(this.currentAngle);

        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(width / 2 + nx, height / 2 + ny);

        if (this.input.keys[16]) {
            ctx.font = '15px arial';

            txt = ((this.currentAngle * 180) / Math.PI).toFixed(1);
            ctx.fillText(txt, width / 2 + nx - ctx.measureText(txt).width / 2, height / 2 + ny);
        }

        ctx.stroke();

        ctx.restore();
    };
}

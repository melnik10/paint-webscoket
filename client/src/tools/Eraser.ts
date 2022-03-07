import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
        super(canvas, socket, sessionId)
    }
    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown && e.target instanceof HTMLCanvasElement) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx?.lineWidth,
                    strokeStyle: '#FFFFFF',
                    type: 'eraser'

                }
            }))
        }
    }
    mouseUpHandler(e: MouseEvent) {
        super.mouseUpHandler(e);

    }
    mouseDownHandler(e: MouseEvent) {
        super.mouseDownHandler(e);
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number, figure: any) {
        ctx.lineWidth = figure.lineWidth
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
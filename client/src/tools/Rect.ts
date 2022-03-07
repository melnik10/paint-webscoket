import Figure from "./Figure";
import {IRect} from "../types/types";

export default class Rect extends Figure implements IRect {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
        super(canvas, socket, sessionId)
    }
    mouseUpHandler(e: MouseEvent) {
        super.mouseUpHandler(e);
         this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                w: this.width,
                h: this.height,
                lineWidth: this.ctx?.lineWidth,
                strokeStyle: this.ctx?.strokeStyle,
                fillStyle: this.ctx?.fillStyle,
                context2d: JSON.stringify(this.ctx),
            }
        }))
    }

    draw(x:number, y:number, w: number, h: number) {
        const img = new Image()
        img.src = this.saved || ''
        img.onload = async () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.rect(x,y,w,h)
            this.ctx?.fill()
            this.ctx?.stroke()
        }
    }
    static staticDraw(ctx: CanvasRenderingContext2D, x:number, y:number, w: number, h: number, figure: any) {
        ctx.beginPath()
        ctx.rect(x,y,w,h)
        ctx.strokeStyle = figure.strokeStyle
        ctx.fillStyle = figure.fillStyle
        ctx.lineWidth = figure.lineWidth
        ctx.fill()
        ctx.stroke()
    }

}
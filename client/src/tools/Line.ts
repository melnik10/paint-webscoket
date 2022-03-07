import Figure from "./Figure";
import toolState from "../store/toolState";

export default class Line extends Figure {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
        super(canvas, socket, sessionId)
    }
    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        if(this.ctx && e.target instanceof HTMLCanvasElement) {
            this.ctx?.beginPath()
            this.ctx.strokeStyle = toolState.strokeStyle
            this.ctx.lineWidth = toolState.lineWidth
            this.startX = e.pageX - e.target.offsetLeft
            this.startY = e.pageY - e.target.offsetTop
            this.ctx?.moveTo(this.startX, this.startY)
            this.saved = this.canvas.toDataURL()
        }

    }
    mouseUpHandler(e: MouseEvent) {
        super.mouseUpHandler(e);
        if (e.target instanceof HTMLCanvasElement) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    startX: this.startX,
                    startY: this.startY,
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx?.lineWidth,
                    strokeStyle: this.ctx?.strokeStyle,
                    type: 'line'
                }
            }))
        }
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            this.draw(currentX, currentY)
        }
    }

    draw(x:number, y:number) {
        const img = new Image()
        img.src = this.saved || ''
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.beginPath()
            this.ctx?.moveTo(this.startX, this.startY)
            this.ctx?.lineTo(x,y)
            this.ctx?.stroke()
        }
    }
    static staticDraw(ctx: CanvasRenderingContext2D, figure: any) {
            ctx.strokeStyle = figure.strokeStyle
            ctx.lineWidth = figure.lineWidth
            ctx.beginPath()
            ctx.moveTo(figure.startX,figure.startY)
            ctx.lineTo(figure.x, figure.y)
            ctx.stroke()
    }



}
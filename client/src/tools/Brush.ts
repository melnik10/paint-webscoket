import Tool from "./Tool";
import canvasState from "../store/canvasState";
import axios from "axios";

export default class Brush extends Tool implements Brush{
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
        super(canvas, socket, sessionId)
        this.listen()
        this.strokeStyle = '#000000'
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'finish'
            }
        }))
        axios.post(`http://localhost:5000/image?id=${canvasState.sessionId}`, {
            img: this.canvas.toDataURL()
        }).then(res => res)
        this.ctx?.beginPath()
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        if (e.target instanceof HTMLCanvasElement) {
            this.ctx?.beginPath()
            this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }

    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown && e.target instanceof HTMLCanvasElement) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx?.lineWidth,
                    strokeStyle: this.ctx?.strokeStyle,
                    type: 'brush'
                }
            }))
        }
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number, figure: any) {
        ctx.lineWidth = figure.lineWidth
        ctx.strokeStyle = figure.strokeStyle
        ctx.lineTo(x, y)
        ctx.stroke()
    }

}
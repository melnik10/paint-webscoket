import {ITool} from "../types/types";

export default class Tool implements ITool {
    canvas
    mouseDown
    socket
    sessionId
    ctx
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
        this.canvas = canvas
        this.mouseDown = false
        this.socket = socket
        this.sessionId = sessionId
        this.ctx = canvas.getContext('2d')
        this.removeEvents()
    }
    set strokeStyle(color: string) {
        if(this.ctx) {
            this.ctx.strokeStyle = color
        }
    }
    set lineWidth(width: number) {
        if(this.ctx) {
            this.ctx.lineWidth = width
        }
    }
    set fillColor(color: string) {
        if(this.ctx) {
            this.ctx.fillStyle = color
        }
    }

    removeEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}
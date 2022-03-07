import Tool from "./Tool";
import {IFigure} from "../types/types";
import toolState from "../store/toolState";
import axios from "axios";
import canvasState from "../store/canvasState";





export default class Figure extends Tool implements IFigure {
    public startX
    public startY
    public width
    public height
    public saved: string | null
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
        super(canvas, socket, sessionId)
        this.startX = 0
        this.width = 0
        this.height = 0
        this.startY = 0
        this.saved = null
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
        axios.post(`http://localhost:5000/image?id=${canvasState.sessionId}`, {
            img: this.canvas.toDataURL()
        }).then(res => res)
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        if(this.ctx && e.target instanceof HTMLCanvasElement) {
            this.ctx.strokeStyle = toolState.strokeStyle
            this.ctx.lineWidth = toolState.lineWidth
            this.ctx?.beginPath()
            this.startX = e.pageX - e.target.offsetLeft
            this.startY = e.pageY - e.target.offsetTop
            this.saved = this.canvas.toDataURL()
        }

    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown && e.target instanceof HTMLCanvasElement && this.ctx){
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            this.width = currentX - this.startX
            this.height = currentY - this.startY
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }

    draw(x:number, y:number, w: number, h: number) {

    }
}
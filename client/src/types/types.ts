
export interface IFigure {
    width: number,
    height: number,
    startY?: number,
    startX?: number,
    saved: string | null,
}

export interface IRect extends IFigure {

}

export interface ITool {
    canvas: HTMLCanvasElement
    socket: WebSocket
    ctx: CanvasRenderingContext2D | null;
    sessionId: string
    mouseDown: boolean
}

export interface Brush extends ITool {

}
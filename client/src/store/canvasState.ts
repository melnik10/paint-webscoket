import {makeAutoObservable} from "mobx";

class CanvasState {
    public canvas: null | HTMLCanvasElement;
    public undoList: any[]
    public redoList: any[]
    public username: string
    public sessionId: string
    public socket?: WebSocket

    constructor() {
        makeAutoObservable(this)
        this.canvas = null
        this.username = ''
        this.undoList = []
        this.redoList = []
        this.sessionId = ''
        this.socket = undefined
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }
    setUsername(name: string) {
        this.username = name
    }

    setSessionId(id: string) {
        this.sessionId = id
    }
    setSocket(webSocket: WebSocket) {
        this.socket = webSocket
    }

    pushToUndo(data: any) {
        this.undoList.push(data)
    }

    pushToRedo(data: any) {
        this.redoList.push(data)
    }

    undo() {
        if (this.canvas) {
            let ctx = this.canvas?.getContext('2d')
            if (this.undoList.length > 0) {
                const img = new Image()
                const dataUrl = this.undoList.pop()
                this.pushToRedo(this.canvas.toDataURL())
                img.src = dataUrl
                img.onload = () => {
                    if (this.canvas) {
                        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                    }
                }
            }

        }
    }

    redo() {
        if (this.canvas) {
            let ctx = this.canvas?.getContext('2d')
            if (this.redoList.length > 0) {
                const img = new Image()
                const dataUrl = this.redoList.pop()
                this.pushToUndo(this.canvas.toDataURL())
                img.src = dataUrl
                img.onload = () => {
                    if (this.canvas) {
                        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                    }
                }

            } else {
                ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()
import {makeAutoObservable} from "mobx";

class ToolState {
    public tool = null;
    public lineWidth = 1
    public strokeStyle = '#000000'
    public fillStyle = '#000000'
    public  = '#000000'
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: any) {
        this.tool = tool
    }
    setStrokeColor(color: string) {
        if(this.tool){
            // @ts-ignore
            this.tool.strokeStyle = color
            this.strokeStyle = color
        }
    }
    setLineWidth(width: number) {
        if(this.tool) {
            // @ts-ignore
            this.tool.lineWidth = width
            this.lineWidth = width
        }
    }
    setFillColor(color: string) {
        if(this.tool) {


            // @ts-ignore
            this.tool.fillColor = color
            this.fillStyle = color
        }
    }
}

export default new ToolState()
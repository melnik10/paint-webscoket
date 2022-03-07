import React, {FC} from 'react';
import '../styles/toolbar.scss'
import ToolState from "../store/toolState";
import Brush from "../tools/Brush";
import CanvasState from "../store/canvasState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";

const ToolBar: FC = () => {
    const onToolClickHandler = (ToolClass: any) => {
        if(CanvasState.canvas) {
            ToolState.setTool(new ToolClass(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))
        }
    }
    const download = () => {
        const canvas = canvasState.canvas
        const data = canvas?.toDataURL()
        const a = document.createElement('a')
        a.href = data || ''
        a.download = canvasState.sessionId + '.jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    return (
        <div className={'toolBar'}>
            <button className={'toolBar_btn brush'} onClick={() => onToolClickHandler(Brush)}></button>
            <button className={'toolBar_btn rect'} onClick={() => onToolClickHandler(Rect)}></button>
            <button className={'toolBar_btn circle'} onClick={() => onToolClickHandler(Circle)}></button>
            <button className={'toolBar_btn eraser'} onClick={() => onToolClickHandler(Eraser)}></button>
            <button className={'toolBar_btn line'} onClick={() => onToolClickHandler(Line)}></button>
            <input type={"color"} onChange={(e) => toolState.setFillColor(e.target.value)}></input>
            <button className={'toolBar_btn undo'} onClick={() => canvasState.undo()}></button>
            <button className={'toolBar_btn redo'} onClick={() => canvasState.redo()}></button>
            <button className={'toolBar_btn save'} onClick={() => download()}></button>
        </div>
    );
};

export default ToolBar;
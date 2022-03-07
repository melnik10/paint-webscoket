import React, {FC, useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import axios from 'axios';

const Canvas: FC = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [modal, setModal] = useState<boolean>(true)
    const params = useParams<{ id: string }>()
    useEffect(() => {
        if (canvasRef.current) {

            canvasState.setCanvas(canvasRef.current)
            axios.get('http://localhost:5000/image', {
                params: {
                    id: params.id
                }
            }).then(res => {
                const img = new Image()
                img.src = res.data.img
                img.onload = (() => {
                    if (canvasRef.current) {
                        const ctx = canvasRef.current?.getContext('2d')
                        ctx?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current?.height)
                        ctx?.beginPath()
                        ctx?.stroke()
                    }
                })
            })
        }
    }, [])


    useEffect(() => {
        if (canvasState.username) {
            const ws = new WebSocket('ws://localhost:5000')
            canvasState.setSocket(ws)
            canvasState.setSessionId(params.id)
            if (canvasRef.current) {
                toolState.setTool(new Brush(canvasRef.current, ws, params.id))
            }

            ws.onopen = () => {
                ws.send(JSON.stringify({
                    method: 'connection',
                    message: 'Hello',
                    id: params.id,
                    username: canvasState.username
                }))
            }
            ws.onmessage = (e) => {
                let msg = JSON.parse(e.data)
                switch (msg.method) {
                    case 'connection':
                        break
                    case 'draw':
                        drawHandler(msg)
                        break
                    default:
                        return
                }
            }
        }
    }, [canvasState.username])

    function drawHandler(msg: any) {
        const figure = msg.figure
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx && canvasRef.current) {
            switch (figure.type) {
                case 'brush':
                    Brush.draw(ctx, figure.x, figure.y, figure)
                    break
                case 'rect':
                    Rect.staticDraw(ctx, figure.x, figure.y, figure.w, figure.h, figure)
                    ctx.beginPath()
                    break
                case 'circle':
                    Circle.staticDraw(ctx, figure.x, figure.y, figure.w, figure.w, figure)
                    ctx.beginPath()
                    break
                case 'eraser':
                    Eraser.draw(ctx, figure.x, figure.y, figure)
                    break
                case 'line':
                    Line.staticDraw(ctx, figure)
                    ctx.beginPath()
                    break
                case 'finish':
                    ctx.beginPath()
            }
        }
    }


    function connectionHandler() {
        if (inputRef.current?.value) {
            canvasState.setUsername(inputRef.current?.value)
        } else {
            canvasState.setUsername('No-name user')
        }
        setModal(false)
    }

    return (
        <div className={'canvas'}>
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите имя пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type={"text"} ref={inputRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => connectionHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => canvasState.pushToUndo(canvasRef.current?.toDataURL())} ref={canvasRef}
                    width={600} height={400}/>
        </div>
    );
})

export default Canvas;
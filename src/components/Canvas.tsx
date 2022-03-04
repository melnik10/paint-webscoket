import React, {FC} from 'react';
import '../styles/canvas.scss'
const Canvas:FC = () => {
    return (
        <div className={'canvas'}>
            <canvas width={600} height={400}/>
        </div>
    );
};

export default Canvas;
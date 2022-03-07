import React, {FC} from 'react';
import '../styles/settingbar.scss'
import toolState from "../store/toolState";
const SettingBar:FC = () => {
    return (
        <div className={'settingBar'}>
            <label style={{marginRight: '10px'}} htmlFor={'lineWidth'}>Толщина линии</label>
            <input onChange={e => toolState.setLineWidth(+e.target.value)}
                   defaultValue={1}
                   max={50}
                   maxLength={50}
                   style={{padding: '2px 5px'}} id={'lineWidth'}
                   type={"number"} />
            <input style={{marginLeft: '5px'}} type={'color'} onChange={(e) => {
                toolState.setStrokeColor(e.target.value)
            }}/>
        </div>
    );
};

export default SettingBar;
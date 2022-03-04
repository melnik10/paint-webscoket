import React, {FC} from 'react';
import './styles/app.scss'
import ToolBar from "./components/Toolbar";
import SettingBar from "./components/Settingbar";
import Canvas from "./components/Canvas";

const App: FC = () => {
    return (
        <div className={'app'}>
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
        </div>
    );
}

export default App;

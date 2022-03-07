import React, {FC, useEffect} from 'react';
import './styles/app.scss'
import ToolBar from "./components/Toolbar";
import SettingBar from "./components/Settingbar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

const App: FC = () => {

    return (
        <BrowserRouter>
            <div className={'app'}>
                <Switch>
                    <Route path={'/:id'}>
                        <ToolBar/>
                        <SettingBar/>
                        <Canvas/>
                    </Route>
                    <Redirect to={`f${(+new Date()).toString(16)}`}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default App;

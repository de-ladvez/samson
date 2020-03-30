import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
// import Form from "./Form";
import VisibleLoadCsv from "../container/VisibleLoadCsv"
import Shows from "./shows/index";
import OutputChart from "../container/OutputChart";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <VisibleLoadCsv/>
                    {/*<Form/>*/}
                </Route>
                <Route exact path="/chart">
                    <OutputChart/>
                </Route>
                <Route exact path="/show">
                    <Shows/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;

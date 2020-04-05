import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import VisibleLoadCsv from "../container/VisibleLoadCsv"
import Shows from "../components/shows/index";
import ComponentChart from "../components/chart/index";
import ToShowChart from "./ToShowChart"

function App({csvList}) {

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <VisibleLoadCsv/>
                    {/*<Form/>*/}
                    {/*<Shows/>*/}

                </Route>
                {!csvList[0].data.length ? <Redirect to="/" /> : (
                    <>
                        <ToShowChart />
                        <Route exact path="/chart">
                            <ComponentChart/>
                        </Route>
                        <Route exact path="/show">
                            <Shows/>
                        </Route>
                    </>
                )}
            </Switch>
        </div>
    );
}

export default App;

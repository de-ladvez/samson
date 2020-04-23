import React from 'react';
import { connect } from "react-redux";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import InputCsv from "./InputCsv";
import Chart from "./Chart"
import VueModel from "./VueModel";

function ScreensRoot({csvList}) {

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={InputCsv}/>
                {!csvList[0].data.length ? <Redirect to="/" /> : (
                    <>
                        <Route exact path="/chart" component={Chart}/>
                        <Route exact path="/show" component={VueModel} />
                    </>
                )}
            </Switch>
        </div>
    );
}

const mapStateToProps = state => ({
    csvList: state.csvList
});

export default connect(
    mapStateToProps,
    {}
)(ScreensRoot);


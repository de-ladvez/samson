import React from 'react';
import {connect} from "react-redux";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import InputCsv from "./InputCsv";
import style from "./root.scss";
import Chart from "./Chart"
import VueModel from "./VueModel";
import Starcom from "./Starcom";
import Login from "../components/Login/Login";
import DefaultLayout from "../layouts/Default"

function ScreensRoot({csvList}) {

    return (
        <div className={style.App}>
            <Switch>
                {/*<Route exact path="/" component={InputCsv}/>*/}
                <Route exact path="/" component={Login}/>
                {/*{!csvList[0].data.length ? <Redirect to="/" /> : (*/}
            </Switch>

            <DefaultLayout>
                <Switch>
                    <Route exact path="/sort" component={Starcom}/>
                    <Route exact path="/chart" component={Chart}/>
                    <Route exact path="/show" component={VueModel} />
                    <Route exact path="/starcom" component={Starcom} />
                </Switch>
            </DefaultLayout>
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


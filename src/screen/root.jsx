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
import Login from "./Login";
import DefaultLayout from "../layouts/Default"
import Material from "./Material";
import ContainerPage from "./Container";
import PackingContainer from "./PackingContainer";
import {RouteWrapper} from "../util/route";

function ScreensRoot({csvList}) {

    return (
        <div className={style.App}>
            <Switch>
                <Route exact path="/" component={Login} />
                    {/*<RouteWrapper path="/sort" component={Starcom} layout={DefaultLayout}/>*/}
                    <RouteWrapper path="/material" component={Material} layout={DefaultLayout}/>
                    <RouteWrapper path="/container" component={ContainerPage} layout={DefaultLayout}/>
                    <RouteWrapper path="/fillingcontainer" component={PackingContainer} layout={DefaultLayout}/>

                    {/*<Route exact path="/chart" component={Chart}/>*/}
                    {/*<Route exact path="/show" component={VueModel} />*/}
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


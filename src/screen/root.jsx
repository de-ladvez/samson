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
import AddMaterial from "./AddMaterrial";
import {RouteWrapper} from "../util/route";
function ScreensRoot({csvList}) {

    return (
        <div className={style.App}>
            <Switch>
                <Route exact path="/" component={Login} />
                    <RouteWrapper path="/sort" component={Starcom} layout={DefaultLayout}/>
                    <RouteWrapper path="/addmaterial" component={AddMaterial} layout={DefaultLayout}/>

                    <Route exact path="/chart" component={Chart}/>
                    <Route exact path="/show" component={VueModel} />
                    <Route exact path="/starcom" component={Starcom} />
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


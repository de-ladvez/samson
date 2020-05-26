import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, withRouter} from "react-router-dom";
import DefaultLayout from "../layouts/Default"

const mapStateToProps = ({session: {userId}}) => ({
    loggedIn: Boolean(userId)
});

export const RouteWrapper = ({
                          component: Component,
                          layout: Layout,
                          ...rest
                      }) => {
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        }/>
    );
}
// const rout = ({path, component: Component}) => (
//
// );

// const DefaultLayoutRoute = ({path, component: Component}) => (
//     <Route
//         path={path}
//         render = {props => (
//
//         )}
//         />
// );

const Auth = ({loggedIn, path, component: Component}) => (
    <Route
        path={path}
        render={props => (
            loggedIn ?
                <Redirect to='/dashboard'/> :
                <Component {...props} />
        )}
    />
);

const Protected = ({loggedIn, path, component: Component}) => (
    <Route
        path={path}
        render={props => (
            loggedIn ?
                <Component {...props} /> :
                <Redirect to='/login'/>
        )}
    />
);

export const AuthRoute = withRouter(
    connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
    connect(mapStateToProps)(Protected)
);
import React from "react";
import login from "./Login.scss";
import {useHistory} from "react-router-dom";
import Input from "../UI/input/input";
import Button from "../UI/button/button";

const Login = () => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/sort");
    };
    return (
        <div className={login.row}>
            <div className={login.container}>
                <div className={login.image}>
                    <img src='/logo_800.webp' alt=""/>
                </div>
                <div>
                    <Input id="login" title="Login" class={login.input}/>
                </div>
                <div>
                    <Input id="password" title="Password" class={login.input}/>
                </div>
                <div>
                    <Button title="Login" class={login.button} action={handleLogin}/>
                </div>
            </div>
        </div>
    );
};

export default Login;
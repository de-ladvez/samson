import React from "react";
import style from "./index.scss";
import {useHistory} from "react-router-dom";
import Input from "../../components/UI/input/input";
import Button from "../../components/UI/button/button";

const Index = () => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/material");
    };
    return (
        <div className={style.row}>
            <div className={style.container}>
                <div className={style.image}>
                    <img src='/logo_800.webp' alt=""/>
                </div>
                <div>
                    <Input id="login" title="Login" class={style.input}/>
                </div>
                <div>
                    <Input id="password" title="Password" class={style.input}/>
                </div>
                <div>
                    <Button title="Login" class={style.button} action={handleLogin}/>
                </div>
            </div>
        </div>
    );
};

export default Index;
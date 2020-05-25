import react from "react";
import ui from "./ui.scss";

export const input = (props) => {
    return (
        <div>
            <input type={props.type}/>
            <label htmlFor=""></label>
        </div>
    );
};

export const buttom = () => {
    return (
        <div></div>
    );
};
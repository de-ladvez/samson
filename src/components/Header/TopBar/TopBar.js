import React from 'react';
import {
    Link
} from "react-router-dom";
import style from "./TopBar.scss";


function TopBar() {

    return (
        <div className={style.links}>
            <Link to="/chart">chart</Link>
            <Link to="/show">show</Link>
            <Link to="/starcom">starcom</Link>
        </div>
    );
}

export default TopBar;

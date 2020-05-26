import React from "react";
import {
    Link
} from "react-router-dom";
import leftPanel from "./LeftPanel.scss";

const LeftPanel = (props) => {
    return (
        <div className={leftPanel.row}>
            <Link to="/sort">Sorting</Link>
            <Link to="/addmaterial">Add material</Link>
            <Link to="/sort">Sorting</Link>
            <Link to="/sort">Sorting</Link>
        </div>
    );
};

export default LeftPanel;
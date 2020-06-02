import React from "react";
import {
    Link
} from "react-router-dom";
import leftPanel from "./LeftPanel.scss";

const LeftPanel = (props) => {
    return (
        <div className={leftPanel.row}>
            <Link to="/material">Material</Link>
            <Link to="/container">Container</Link>
            <Link to="/fillingcontainer">Packaging of materials</Link>
        </div>
    );
};

export default LeftPanel;
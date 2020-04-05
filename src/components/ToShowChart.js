import React from 'react';
import {
    Link
} from "react-router-dom";
import "./form.css";


function ToShowChart() {

    return (
        <div className="links">
            <Link to="/chart">chart</Link>
            <Link to="/show">show</Link>
        </div>
    );
}

export default ToShowChart;

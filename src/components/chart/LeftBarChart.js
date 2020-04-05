import {useStore} from "react-redux";
import React, {useState, useEffect} from "react";
import {
    setCurrentDataCsv
} from '../../action/action';

const LeftBarChart = () => {
    const store = useStore();

    return (
        <div className="chart-bar">
            {store.getState().csvList.map((item, index) => <div key={index} onClick={setCurrentDataCsv(index)}>{item.name}</div>)}
        </div>
    );
};

export default LeftBarChart;
import React, {useEffect, useState} from "react";
import {useStore} from "react-redux";

import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
// import LeftBarChart from "./LeftBarChart";
import "./index.css";
// import {setCurrentDataCsv} from "../../action/action";

ReactFC.fcRoot(FusionCharts, TimeSeries);


const MyChart = () => {
    const store = useStore();
    let csvList = store.getState().csvList;
    const schemaFetch = [{
        "name": "Time",
        "type": "date",
        // "format": "%d-%b-%y",
        "format": "%Y-%M-%d %H.%M.%S.%L"
    }, {
        "name": "Type",
        "type": "string"
    }, {
        "name": "Sales Value",
        "type": "number"
    }];

    //

    // const dataFetch = csvList.dataChart;
    // const dataFetch = [["2020-03-20 18.02.14.198","gfx",0.15],["2020-03-20 18.02.14.198","gfy",-0.462],["2020-03-20 18.02.14.198","gfz",-0.738],["2020-03-20 18.02.14.198","gftotal",0.884],["2020-03-20 18.02.14.202","gfx",0.102],["2020-03-20 18.02.14.202","gfy",-0.473],["2020-03-20 18.02.14.202","gfz",-0.758],["2020-03-20 18.02.14.202","gftotal",0.899],["2020-03-20 18.02.14.212","gfx",0.04],["2020-03-20 18.02.14.212","gfy",-0.505],["2020-03-20 18.02.14.212","gfz",-0.775],["2020-03-20 18.02.14.212","gftotal",0.926],["2020-03-20 18.02.14.222","gfx",0.038],["2020-03-20 18.02.14.222","gfy",-0.52],["2020-03-20 18.02.14.222","gfz",-0.774],["2020-03-20 18.02.14.222","gftotal",0.933],["2020-03-20 18.02.14.240","gfx",0.052],["2020-03-20 18.02.14.240","gfy",-0.527],["2020-03-20 18.02.14.240","gfz",-0.768],["2020-03-20 18.02.14.240","gftotal",0.933],["2020-03-20 18.02.14.247","gfx",0.061],["2020-03-20 18.02.14.247","gfy",-0.518],["2020-03-20 18.02.14.247","gfz",-0.771],["2020-03-20 18.02.14.247","gftotal",0.931]]
    let dataSource = {
        chart: {},
        caption: {
            text: "Sales Analysis"
        },
        subcaption: {
            text: "Grocery & Footwear"
        },
        series: "Type",
        yaxis: [
            {
                plot: "Sales Value",
                title: "Sale Value",
                format: {
                    prefix: ""
                }
            }
        ],
        "extensions": {
            customRangeSelector: {
                "enabled": "0"
            },
            standardRangeSelector: {
                enabled: "0"
            }
        }
    };

    const [timeseriesDs, setTimeseriesDs] = useState({
        type: "timeseries",
        renderAt: "container",
        width: "80%",
        height: "400",
        dataSource
    });


    const onFetchData = (index) => {
        const csvItem = csvList[index];
        const dataFetch = csvItem.dataChart;

        let copy = {...timeseriesDs};
        copy.dataSource.data = new FusionCharts.DataStore().createDataTable(
            dataFetch,
            schemaFetch
        );
        setTimeseriesDs(copy);
    };

    useEffect(() => {
        onFetchData(0);
    }, []);


    return (
        <div className="chart-row">
            <div className="chart-bar">
                {csvList.map((item, index) => <div key={index} onClick={() => {onFetchData(index)}}>{item.name}</div>)}
            </div>
            <ReactFC {...timeseriesDs} className="charts" />
        </div>
    );
};
export default MyChart;
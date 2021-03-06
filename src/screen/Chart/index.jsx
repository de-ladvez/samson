import React, {useEffect, useState} from "react";
import {useStore} from "react-redux";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import style from"./index.scss";

ReactFC.fcRoot(FusionCharts, TimeSeries);


const MyChart = () => {
    const store = useStore();
    let csvList = store.getState().csvList;
    const schemaFetch = [{
        "name": "Time",
        "type": "date",
        "format": "%H:%M:%S:%L"
    }, {
        "name": "Type",
        "type": "string"
    }, {
        "name": "Sales Value",
        "type": "number"
    }];

    //

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
        <div >
            <div className={style.bar}>
                {csvList.map((item, index) => <div key={index} onClick={() => {onFetchData(index)}}>{item.name}</div>)}
            </div>
            <ReactFC {...timeseriesDs} className={style.charts}/>
        </div>
    );
};
export default MyChart;
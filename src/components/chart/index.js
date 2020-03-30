import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";
import "./index.css";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/annotating-single-data-point-data.json"
).then(jsonify);
const schemaFetch = [{
    "name": "Time",
    "type": "date",
    "format": "%Y-%M-%d %I:%M:%S."
}, {
    "name": "Interest Rate",
    "type": "number"
}];

const csvItemNumber = 0;

const MyChart = ({ csvList }) => {

    const csvItem = csvList[csvItemNumber];

    let dataSource = {
        chart: {},
        legend: {
            enabled: "0"
        },
        caption: {
            text: csvItem.name
        },
        subcaption: {
            text: ""
        },
        "extensions": {
            customRangeSelector: {
                "enabled": "0"
            },
            standardRangeSelector: {
                enabled: "0"
            }
        },
        yaxis: [
            {
                // plot: [
                //     {
                //         value: "Federal Reserve Bank",
                //         type: "line"
                //     },
                //     {
                //         value: "Bank of Canada",
                //         type: "line"
                //     }
                // ],
                // format: {
                //     suffix: "%"
                // },
                // title: "Interest Rate "
            }
        ],
        datamarker: [
            // {
            //     value: "Bank of Canada",
            //     time: "Aug-1981",
            //     timeformat: "%b-%Y",
            //     tooltext:
            //         "To curb the high double digit inflation rate, Bank of Canada had to increase he interest rate to over 20%"
            // },

        ]
    };

    const [timeseriesDs, setTimeseriesDs] = useState({
        type: "timeseries",
        renderAt: "container",
        width: "600",
        height: "400",
        dataSource
    });


    const onFetchData = async (timeseriesDs) => {
        let copy = {...timeseriesDs};
        return Promise.all([dataFetch, schemaFetch]).then(res => {
            const data = res[0];
            const schema = res[1];
            copy.dataSource.data = new FusionCharts.DataStore().createDataTable(
                data,
                schema
            );
            return copy;
        });
    };

    useEffect(() => {
       onFetchData(timeseriesDs).then(res => {
           setTimeseriesDs(res);
       });
    }, []);


    return (
        <div>
            <ReactFC {...timeseriesDs} />
        </div>
    );
};
export default MyChart;
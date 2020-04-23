import React from "react";
import { connect} from "react-redux";
import {
    setItemCsv,
    checkToEmptyDataItemCsv,
    updateDataForChartItemCsv
} from "../../action/action";
import {dendersMomentsNotification} from "../../action/actionsNotif";
import CSVReader from "react-csv-reader";
import loadFiles from "./FormEnter.css";
import {useHistory} from "react-router-dom";

const FormEnter = ({
                   csvList,
                   setItemCsv,
                   checkToEmptyDataItemCsv,
                   updateDataForChartItemCsv
               }) => {
    let history = useHistory();
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    function handleSendData() {
        checkToEmptyDataItemCsv().then(res => {
            updateDataForChartItemCsv();
            history.push("/show");

            for (let item of csvList) {
                if (!item.active) {
                    return;
                }
            }
            console.log("OK!");
        });
    }

    return (
        <div className={loadFiles.row}>

                <div className={loadFiles.item}>
                    <CSVReader
                    label="Select 'csv' file with file data"
                    onFileLoaded={(data, fileInfo) =>
                    setItemCsv({...data})
                    }
                    parserOptions={papaparseOptions}
                    defaultValue=""
                    />
                </div>
                <div className={loadFiles.button} onClick={handleSendData}>
                    Open charts and 3d vue
                </div>
        </div>
    );
};

const mapStateToProps = state => ({
    csvList: state.csvList
});

const mapDispatchToProps = dispatch => ({
    setItemCsv: data => {
        dispatch(setItemCsv(data));
        dispatch(dendersMomentsNotification(data));
        // checkToals("dengersMoments");
        // toast.add("alert")
    },
    checkToEmptyDataItemCsv: async () => {
        try {
            await dispatch(checkToEmptyDataItemCsv());
            return "ok";
        } catch (e) {
            console.log("err ", e);
        }
    },
    updateDataForChartItemCsv: () => dispatch(updateDataForChartItemCsv())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormEnter);

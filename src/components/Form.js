import React from "react";
import { useStore } from "react-redux";

import CSVReader from "react-csv-reader";
import "./form.css";
import { useHistory } from "react-router-dom";

const Forms = ({
  csvList,
  setItemCsv,
  checkToEmptyDataItemCsv,
  updateDataForChartItemCsv
}) => {
  let history = useHistory();
  const store = useStore();
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

      for (let item of store.getState().csvList) {
        if (!item.active) {
          return;
        }
      }
      console.log("OK!");
    });
  }

  return (
    <div className="loadFiles-row">
      {csvList.map((item, name) => (
        <div
          className={["loadFiles-item", item.active ? "" : "empty"].join(" ")}
          key={item.name}
        >
          <CSVReader
            label={item.nameFile || `Select 'csv' file with ${item.name} data`}
            inputId={item.name}
            onFileLoaded={(data, fileInfo) =>
              setItemCsv({
                ...item,
                data,
                nameFile: fileInfo.name,
                active: 1
              })
            }
            parserOptions={papaparseOptions}
          />
        </div>
      ))}
      <div className="loadFiles-button" onClick={handleSendData}>
        Open charts and 3d vue
      </div>
    </div>
  );
};

export default Forms;

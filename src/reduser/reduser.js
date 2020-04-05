import {
    SET_ITEM_CSV,
    CHECK_TO_EMPTY_DATA_ITEM_CSV,
    UPDATE_DATA_FOR_CHARTS_ITEM_CSV
} from "../action/action";
import {combineReducers} from "redux";
import dateFormat from "dateformat";

const initialState = [
    {
        name: "gForce",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "gfx"],
            ["time", "gfy"],
            ["time", "gfz"],
        ],
        dataChart: []
    },
    {
        name: "acelerometer",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "ax"],
            ["time", "ay"],
            ["time", "az"]
        ],
        dataChart: {}
    },
    {
        name: "gyroscope",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "wx"],
            ["time", "wy"],
            ["time", "wz"]
        ],
        dataChart: []
    },
    {
        name: "barometer",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "p"]
        ],
        dataChart: []
    },
    {
        name: "gps",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [["time", "latitude"], ["time", "longitude"], ["time", "speed__m_s_"]],
        dataChart: []
    }
];

function csvList(state = initialState, action) {
    switch (action && action.type) {
        case SET_ITEM_CSV:
            let copy = [...state];
            for(let item in action.data)  {
                let copyItem = {...action.data[item]};
                for(let list of copy){

                    let el = {};
                    for(let typeItem of list.typeForChart){
                        el[typeItem[1]] = copyItem[typeItem[1]];
                    };

                    list.data.push({"time": copyItem.time, ...el});
                    // i.data.push({...item[...type]})
                }
            };
            return copy;
            // state.map(item => {
            //     debugger;
            //     let obj = {};
            //     for(let i of item.typeForChart) {
            //         obj[i[1]];
            //     }
            // });
            return state.map(item =>
                item.name === action.data.name ? action.data : item
            );
        case CHECK_TO_EMPTY_DATA_ITEM_CSV:
            return state.map(item =>
                !item.data.length ? {...item, active: 0} : item
            );
        case UPDATE_DATA_FOR_CHARTS_ITEM_CSV:
            const res = state.map(item => {
                if (!item.data.length) {
                    return item;
                }
                let dataChart = item.data.map(csvCol => {
                    let acum = [];
                    for (let i of item.typeForChart) {
                        // acum.push([dateFormat(csvCol[i[0]],"yyyy-mm-dd HH.MM.ss.l") , i[1], csvCol[i[1]]]);
                        acum.push([csvCol[i[0]] , i[1], csvCol[i[1]]]);
                    }
                    return acum;
                });
                dataChart = dataChart.reduce((acc, val) => acc.concat(val), []);
                return {...item, dataChart};
            });
            return res;
        default:
            return state;
    }
}

const reduserApp = combineReducers({
    csvList
});

export default reduserApp;

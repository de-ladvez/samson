import {
    SET_ITEM_CSV,
    CHECK_TO_EMPTY_DATA_ITEM_CSV,
    UPDATE_DATA_FOR_CHARTS_ITEM_CSV
} from '../action/action';
import { combineReducers  } from "redux";

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
            ["time", "gftotal"]
        ]
    },
    {
        name: "acelerometer",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: []
    },
    {
        name: "gyroscope",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: []
    },
    {
        name: "gFobarometerrce",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: []
    },
    {
        name: "gps",
        data: [],
        nameFile: "",
        active: 2,
        typeForChart: [
            ["time", "latitude"],
            ["time", "longitude"]
        ]
    },
];

function csvList(state = initialState, action) {
    switch (action && action.type) {
        case SET_ITEM_CSV:
            return (state.map(item => item.name === action.data.name ? action.data : item));
        case CHECK_TO_EMPTY_DATA_ITEM_CSV:
            return (state.map(item => !item.data.length ? {...item, active: 0} : item));
        case UPDATE_DATA_FOR_CHARTS_ITEM_CSV:
            //TODO: закончил тут
            return ;
        default:
            return state

    }
}




const reduserApp = combineReducers({
    csvList
});

export default reduserApp;
import {combineReducers} from "redux";
import csvList from "./reducerCsvList"
import notification from "./reduserNotif"
import material from "./reduserMaterial"
const reduserApp = combineReducers({
    notification,
    csvList,
    material
});

export default reduserApp;

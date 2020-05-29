import {combineReducers} from "redux";
import csvList from "./reducerCsvList"
import notification from "./reduserNotif"
import material from "./reduserMaterial"
import containers from "./reduserContainer"
import fillingContainers from "./reduserFillingContainer"
const reduserApp = combineReducers({
    notification,
    csvList,
    material,
    containers,
    fillingContainers
});

export default reduserApp;

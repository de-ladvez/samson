import {combineReducers} from "redux";
import csvList from "./reducerCsvList"
import notification from "./reduserNotif"
const reduserApp = combineReducers({
    notification,
    csvList,
});

export default reduserApp;

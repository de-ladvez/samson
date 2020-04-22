import myStore from "../../store/state";
import {connect} from "react-redux";
import {addNotification} from "../../action/actionsNotif";
import {updateDataForChartItemCsv} from "../../action/action";
import Form from "../Form";

const mapStateToProps = state => ({
    csvList: state.csvList
});

const mapDispatchToProps = dispatch => ({
    addNotification:  () => {
        dispatch(addNotification());
    },
});

const qwe = ({csvList, addNotification}) => {
    return {addNotification};
}

const CheckToals = (typeCheck) => {
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(qwe);
    const store = myStore();
    const state = store.getState();
    // const dispatch = store.dispatch;
    store.dispatch(addNotification(["lol"]));

    switch (typeCheck) {
        case "dengersMoments":
            let gforceData = [...state.csvList[0].data];
            let filterRes = gforceData.reduce((acum, a, index) => {

                if (a.gfx > 0.5 || a.gfx < -0.5) {
                    if (!acum.x.length) {
                        acum.x.push({...a, index});
                    }
                } else {
                    if (acum.x.length === 1) {
                        acum.x.push({...a, index});
                        acum.res.push({
                            index: acum.x[0].index,
                            text: `с ${acum.x[0].time} по ${acum.x[1].time} был опасный наклон`
                        });
                        acum.x = [];
                    }
                }

                return acum;

            }, {x: [], y: [], res: []});
            store.dispatch(addNotification([...filterRes.res]));
            break;
        case "lol":
        debugger;

            break;
        default:
            break;
    }
};

export default CheckToals;


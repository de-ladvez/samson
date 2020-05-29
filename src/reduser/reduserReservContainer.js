import {
    ADD_RESERV_CONTAINER_ACTION
} from "../action/actionReservContainer";


function reservContainers(state = [], action) {
    switch (action && action.type) {
        case ADD_RESERV_CONTAINER_ACTION:
            debugger
            state.push(action.data);
            return [...state];
        default:
            return state;
    }
}

export default reservContainers;
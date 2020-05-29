import {
    ADD_CONTAINER_ACTION,
    GET_CONTAINER_ACTION,
    DELETE_CONTAINER_ACTION
} from "../action/actionContainer";


function containers(state = [], action) {
    switch (action && action.type) {
        case GET_CONTAINER_ACTION:
            return [...action.data];
        case DELETE_CONTAINER_ACTION:
            const copyState = state;
            const delElement = copyState.findIndex(item=> item["_id"] === action.data.id);
            copyState.splice(delElement, 1);
            return [...copyState];
        case ADD_CONTAINER_ACTION:
            return [...state, action.data];
        default:
            return state;
    }
}

export default containers;
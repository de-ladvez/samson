import {
    GET_MATERIAL_ACTION,
    DELETE_MATERIAL_ACTION,
    ADD_MATERIAL_ACTION
} from "../action/actionMaterial";


function material(state = [], action) {

    switch (action && action.type) {
        case GET_MATERIAL_ACTION:
            return [...action.data];
        case DELETE_MATERIAL_ACTION:
            const copyState = state;
            const delElement = copyState.findIndex(item=> item["_id"] === action.data.id);
            copyState.splice(delElement, 1);
            return [...copyState];
        case ADD_MATERIAL_ACTION:
            return [...state, action.data];
        default:
            return state;
    }
}

export default material;
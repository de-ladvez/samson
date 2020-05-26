import {
    GET_MATERIAL_ACTION
} from "../action/actionMaterial";


function material(state = [], action) {

    switch (action && action.type) {
        case GET_MATERIAL_ACTION:
            return [...action.data];
        default:
            return state;
    }
}

export default material;
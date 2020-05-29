import {
    ADD_CONTAINER_FOR_MATERIAL_ACTION,
    GET_MATERIALS_IN_CONTAINER_ACTION,
    ADD_MATERIAL_IN_CONTAINER_ACTION,
    DELETE_MATERIAL_OUT_CONTAINER_ACTION
} from "../action/actionFilingContainer";


function fillingContainers(state = {}, action) {
    switch (action && action.type) {
        case ADD_CONTAINER_FOR_MATERIAL_ACTION:
            return {idContainers: action.data};
        case ADD_MATERIAL_IN_CONTAINER_ACTION:
            return {...state, ...action.data}
        default:
            return state;
    }
}

export default fillingContainers;
import {
    ADD_CONTAINER_FOR_MATERIAL_ACTION,
    GET_MATERIALS_IN_CONTAINER_ACTION,
    ADD_MATERIAL_IN_CONTAINER_ACTION,
    DELETE_MATERIAL_OUT_CONTAINER_ACTION,
    CLEAR_CONTAINER_ACTION
} from "../action/actionFilingContainer";


function fillingContainers(state = {idContainers: "", nameContainer: "", barCodeContainer: "", materials: []}, action) {
    switch (action && action.type) {
        case ADD_CONTAINER_FOR_MATERIAL_ACTION:
            state.idContainers = action.data.id;
            state.nameContainer = action.data.name;
            state.barCodeContainer = action.data.barcode;
            return {...state};
        case ADD_MATERIAL_IN_CONTAINER_ACTION:
            state.materials = [...action.data];
            return {...state};
        case CLEAR_CONTAINER_ACTION:
            state = {}
            return {...state};
        default:
            return state;
    }
}

export default fillingContainers;
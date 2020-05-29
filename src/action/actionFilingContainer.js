export const GET_MATERIALS_IN_CONTAINER_ACTION = "GET_MATERIALS_IN_CONTAINER_ACTION";
export const DELETE_MATERIAL_OUT_CONTAINER_ACTION = "DELETE_MATERIAL_OUT_CONTAINER_ACTION";
export const ADD_MATERIAL_IN_CONTAINER_ACTION = "ADD_MATERIAL_IN_CONTAINER_ACTION";
export const ADD_CONTAINER_FOR_MATERIAL_ACTION = "ADD_CONTAINER_FOR_MATERIAL_ACTION";

export function getMaterialsInContainerAction(data) {
    return {
        type: GET_MATERIALS_IN_CONTAINER_ACTION,
        data
    }
}

export function deleteMaterialOutContainerAction(data) {
    return {
        type: DELETE_MATERIAL_OUT_CONTAINER_ACTION,
        data
    }
}

export function addMaterialInContainerAction(data) {
    return {
        type: ADD_MATERIAL_IN_CONTAINER_ACTION,
        data
    }
}

export function addContainerForMateriralAction(data) {
    return {
        type: ADD_CONTAINER_FOR_MATERIAL_ACTION,
        data
    }
}
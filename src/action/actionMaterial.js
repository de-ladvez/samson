export const GET_MATERIAL_ACTION = "GET_MATERIAL_ACTION";
export const DELETE_MATERIAL_ACTION = "DELETE_MATERIAL_ACTION";
export const ADD_MATERIAL_ACTION = "ADD_MATERIAL_ACTION";

export function getMaterialAction(data) {
    return {
        type: GET_MATERIAL_ACTION,
        data
    }
}

export function deleteMaterialAction(data) {
    return {
        type: DELETE_MATERIAL_ACTION,
        data
    }
}

export function addMaterialAction(data) {
    return {
        type: ADD_MATERIAL_ACTION,
        data
    }
}
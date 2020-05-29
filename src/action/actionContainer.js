export const GET_CONTAINER_ACTION = "GET_CONTAINER_ACTION";
export const DELETE_CONTAINER_ACTION = "DELETE_CONTAINER_ACTION";
export const ADD_CONTAINER_ACTION = "ADD_CONTAINER_ACTION";

export function getContainerAction(data) {
    return {
        type: GET_CONTAINER_ACTION,
        data
    }
}

export function deleteContainerAction(data) {
    return {
        type: DELETE_CONTAINER_ACTION,
        data
    }
}

export function addContainerAction(data) {
    return {
        type: ADD_CONTAINER_ACTION,
        data
    }
}
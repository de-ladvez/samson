import axios from "axios";

const url = (query) => {
    return `http://54.218.54.169:3000/api/${query}`;
}

export const getContainerRequest = async (query) => {
    try {
        return await  axios.get(url("container"), {params: {...query}})
            .then(res => {
                return res.data;
            })
    } catch (e) {
        console.error(e);
    }
};

export const putContainerRequest = async (container) => {
    try {
        return await axios.put(url("container"), container)
            .then(res => {
                return res.data;
            })
    } catch (e) {
        console.error(e);
    }
};

export const deleteContainerRequest = async (data) => {
    try {
        return await axios.delete(url(`container`), {data: {id: data}})
            .then(res => {
                    return res.data;
            })
    } catch (e) {
        console.error(e);
    }
};


import axios from "axios";

const url = (query) => {
    return `http://54.218.54.169:3000/api/${query}`;
}

export const getMaterialRequest = async (query) => {
    try {
        return await  axios.get(url("material"), {params: {...query}})
            .then(res => {
                return res.data;
            })
    } catch (e) {
        console.error(e);
    }
};

export const putMaterialRequest = async (material) => {
    try {
        return await axios.put(url("material"), material)
            .then(res => {
                return res.data;
            })
            .catch((e)=>{
                console.log(e);
            })

    } catch (e) {
        console.error(e);
    }
};

export const deleteMaterialRequest = async (data) => {
    try {
        return await axios.delete(url(`material`), {data: {id: data}})
            .then(res => {
                    return res.data;
            })
    } catch (e) {
        console.error(e);
    }
};


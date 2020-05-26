import axios from "axios";

export const getMaterialRequest = new Promise((resolve, reject)=> {
    axios.get("http://54.218.54.169:3000/api/material")
        .then(res => {
            resolve(res.data);
        })
        .catch(e => {
            console.error(e);
            reject(e);
        })
});
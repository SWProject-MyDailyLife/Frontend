import axios from "axios";;

const headers = {
    'Content-type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
}

const multiFileAxios = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: headers
});

multiFileAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            alert("Unauthorized access. Please log in.");
        } else {
            alert(error.response.data.message);
        }
        return Promise.reject(error);
    }
);
export default multiFileAxios;
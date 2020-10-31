import axios from "axios";

const instance = axios.create({
    baseURL: "https://apirest-inventarios.herokuapp.com/api",   
})

export default instance;
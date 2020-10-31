import axios from "axios";

//"https://apirest-inventarios.herokuapp.com/api"


const instance = axios.create({
    baseURL: "https://apirest-inventarios.herokuapp.com/api",
    headers : {
        'access-token' : sessionStorage.getItem('autenticado'),
    }
})

export default instance;

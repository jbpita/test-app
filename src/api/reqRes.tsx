import axios from "axios";

export const reqResApi = (url = 'https://pokeapi.co/api/v2') => {
    return axios.create({
        baseURL: url
    })
}
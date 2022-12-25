import axios from "axios";

const API_URL = "http://localhost:8080/api/get-data/";

const getAllUsers = () => {
    return axios.get(API_URL + "get-users");
};

const getAllRoles = () => {
    return axios.get(API_URL + "get-roles");
};

const getAllUnits = () => {
    return axios.get(API_URL + "get-units");
};

const getAllDTools = () => {
    return axios.get(API_URL + "get-dtools");
};

const getClassifications = () => {
    return axios.get(API_URL + "get-classifications");
};

export default {
    getAllUsers,
    getAllUnits,
    getAllDTools,
    getClassifications,
    getAllRoles,
    
};
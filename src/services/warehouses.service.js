import axios from "axios";

const API_URL = "http://localhost:8080/api/warehouse";


const getAllWarehouses = () => {
    return axios.get(API_URL + "/all-warehouses");
}

const getCurrentUserWarehouses = (userId) => {
    return axios.post(API_URL + "/current-user-warehouses", {
        userId
    });
}

const getAllWarehouseTypes = () => {
    return axios.get(API_URL + "/warehouse-types");
}

const getWarehouse = (id) => {
    return axios.get(API_URL + "/warehouse?id=" + id);
}


const createWarehouse = (name, warehouseType, userId) => {
    return axios.post(API_URL + "/warehouse",
    {
        name,
        warehouseType,
        userId
    });
}

const updateWarehouse = (id, name, warehouseType) => {
    return axios.put(API_URL + "/warehouse");
}

const deleteWarehouse = (warehouseId, userId) => {
    return axios.delete(API_URL + "/warehouse/");
}


export default {
    getAllWarehouses,
    getCurrentUserWarehouses,
    getWarehouse,
    createWarehouse,
    deleteWarehouse,
    getAllWarehouseTypes,
    updateWarehouse

};
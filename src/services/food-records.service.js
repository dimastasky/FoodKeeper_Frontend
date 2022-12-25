import axios from "axios";

const API_URL = "http://localhost:8080/api/warehouse/records";

const getWarehouseRecords = (warehouseId) => {
    return axios.post(API_URL + "/get-records", {
        warehouseId
    })
}

const addRecordToWarehouse = (userId, productId, warehouseId, quantity, bestBefore) => {
    return axios.post(API_URL + "/record", {
        userId,
        productId,
        warehouseId,
        quantity,
        bestBefore,
    })
}


export default {
    addRecordToWarehouse,
    getWarehouseRecords,

}
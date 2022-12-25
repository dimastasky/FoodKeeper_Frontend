
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const getAllProducts = () => {
    return axios.get(API_URL + "/all-products");
};

const addProduct = (name, foodTypeId, energy, fat, protein, carbs, weight) => {
    return axios.post(API_URL + "/product", {
        name,
        foodTypeId,
        energy,
        fat,
        protein,
        carbs,
        weight
    })
}

const getFoodTypes = () => {
    return axios.get(API_URL + "/get-foodtypes");
}

const deleteProduct = (id) => {
    return axios.delete(API_URL + "/product?id=" + id);
}

const getProduct = (id) => {
    return axios.get(API_URL + "/product?id=" + id);
}

export default {
    getAllProducts,
    addProduct,
    getFoodTypes,
    deleteProduct,
    getProduct
};
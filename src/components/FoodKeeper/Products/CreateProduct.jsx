import { useScrollTrigger, FormControl, FormHelperText } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import InputLabel from "@mui/material/InputLabel";

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';

import ProductsService from "../../../services/products.service";

import ProductTable from "./ProductsTable";

const AddProduct = () => {

    const [name, setName] = useState("");
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const [foodType, setFoodType] = useState("");
    const onChangeFoodType = (e) => {
        setFoodType(e.target.value);
    }

    const [energy, setEnergy] = useState("");
    const onChangeEnergy = (e) => {
        setEnergy(e.target.value);
    }

    const [fats, setFat] = useState("");
    const onChangeFats = (e) => {
        setFat(e.target.value);
    }

    const [protein, setProtein] = useState("");
    const onChangeProtein = (e) => {
        setProtein(e.target.value);
    }

    const [carbs, setCarbs] = useState("");
    const onChangeCarbs = (e) => {
        setCarbs(e.target.value);
    }

    const [weight, setWeight] = useState("");
    const onChangeWeight = (e) => {
        setWeight(e.target.value);
    }

    const [foodTypeData, setFoodTypeData] = useState([]);
    const getFoodTypeData = async () => {
        const res = await ProductsService.getFoodTypes();
        //console.log(data);
        const data = res.data
        const foodtypeDataMap = data.map(obj => ({
            "key": obj.id,
            "value": obj.name
        }))
        setFoodTypeData(foodtypeDataMap)
    }

    useEffect(() => {
        getFoodTypeData();
    }, [])


    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const checkBtn = useRef();
    const form = useRef();


    const handleCreate = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            ProductsService.addProduct(name, foodType, energy, fats, protein, carbs, weight).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setLoading(false);
                    setName("");
                    setFoodType("");
                    setEnergy("");
                    setFat("");
                    setProtein("");
                    setCarbs("");
                    setWeight("");
                    ProductsService.getAllProducts();
                    ProductTable.handleTableChange(false, false);
                },
                (error) => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form onSubmit = {handleCreate} ref = {form}>
                <tr>
                    <td>
                        <TextField
                            label = "Наименование"
                            placeholder = ""
                            value = {name}
                            onChange = {onChangeName}
                            type = "text"
                        />
                    </td>
                    <td>
                        <FormControl sx = {{ m: 0, minWidth: 120 }}>
                            <InputLabel id = "category">Категория</InputLabel>
                            <Select
                                labelId = "category"
                                id = "category"
                                label = "Категория"
                                options = {foodTypeData}
                                value = {foodTypeData.find(obj => obj.key === foodType)}
                                onChange = {onChangeFoodType}
                            >
                                {foodTypeData.map((obj) => (
                                    <MenuItem
                                        value = {obj.key}
                                        selected = {foodTypeData === obj.key}
                                    >
                                        {obj.value}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Выберите категорию продукта</FormHelperText>
                        </FormControl>
                    </td>
                    <td>
                        <TextField
                            label = "Калории"
                            placeholder = ""
                            value = {energy}
                            onChange = {onChangeEnergy}
                            type = "text"
                        />
                    </td>
                    <td>
                        <TextField
                            label = "Углеводы"
                            placeholder = ""
                            value = {carbs}
                            onChange = {onChangeCarbs}
                            type = "text"
                        />
                    </td>
                    <td>
                        <TextField
                            label = "Белки"
                            placeholder = ""
                            value = {protein}
                            onChange = {onChangeProtein}
                            type = "text"
                        />
                    </td>
                    <td>
                        <TextField
                            label = "Жиры"
                            placeholder = ""
                            value = {fats}
                            onChange = {onChangeFats}
                            type = "text"
                        />
                    </td>
                    <td>
                        <TextField
                            label = "Вес"
                            placeholder = ""
                            value = {weight}
                            onChange = {onChangeWeight}
                            type = "text"
                        />
                    </td>
                    <td>
                        <LoadingButton
                            variant = "contained"
                            onClick = {handleCreate}
                            loading = {loading}
                            sx = {{ my: 5 }}
                        >
                            Добавить
                        </LoadingButton>
                    </td>
                </tr>

                {message && (
                    <div className="form-group">
                        <div
                            className = {
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role = "alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
}

export default AddProduct;
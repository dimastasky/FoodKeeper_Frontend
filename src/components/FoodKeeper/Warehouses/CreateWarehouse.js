import { InputLabel, FormControl, FormHelperText } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import authService from "../../../services/auth.service";

import WarehouseService from "../../../services/warehouses.service"


const CreateWarehouse = () => {


    const requester = authService.getCurrentUser().id;
    
    const [name, setName] = useState("");
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const [warehouseType, setWarehouseType] = useState("");
    const onChangeWarehouseType = (e) => {
        setWarehouseType(e.target.value);
    }

    const [warehouseTypeData, setWarehouseTypeData] = useState([]);
    const getWarehouseTypeData = async () => {
        const res = await WarehouseService.getAllWarehouseTypes();
        const data = res.data;
        const warehouseTypeDataMap = data.map(obj => ({
            "key": obj.id,
            "value": obj.name
        }))
        setWarehouseTypeData(warehouseTypeDataMap)
    }


    useEffect(() => {
        getWarehouseTypeData();
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
            WarehouseService.createWarehouse(name, warehouseType, requester).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setLoading(false);
                    setName("");
                    setWarehouseTypeData("");
                    window.location.reload();
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
                            label = "Название склада"
                            placeholder = ""
                            value = {name}
                            onChange = {onChangeName}
                            type = "text"
                        />
                    </td>
                    <td>
                        <FormControl sx = {{ m: 0, minWidth: 120}}>
                            <InputLabel id = "warehouseType">Тип Склада</InputLabel>
                            <Select
                                labelId = "warehouseType"
                                id = "warehouseType"
                                label = "Тип склада"
                                options = {warehouseTypeData}
                                value = {warehouseTypeData.find(obj => obj.key === warehouseType)}
                                onChange = {onChangeWarehouseType}
                            >
                                {warehouseTypeData.map((obj) => (
                                    <MenuItem
                                        value = {obj.key}
                                        selected = {warehouseTypeData === obj.key}
                                    >
                                        {obj.value}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Выберите тип склада</FormHelperText>
                        </FormControl>
                    </td>
                    <td>
                        <LoadingButton
                            variant = "contained"
                            onClick = {handleCreate}
                            loading = {loading}
                            sx = {{ my: 5 }}
                        >
                            Создать склад
                        </LoadingButton>
                    </td>
                </tr>

                {message && (
                    <div className = "form-group">
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
                <CheckButton style = {{ display: "none" }} ref = {checkBtn} />
            </Form>
        </div>
    );
}

export default CreateWarehouse;
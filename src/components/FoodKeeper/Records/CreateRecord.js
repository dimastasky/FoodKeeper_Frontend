import { InputLabel, useScrollTrigger, FormControl, FormHelperText } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ru from 'date-fns/locale/ru';

import ProductsService from "../../../services/products.service";
import recordsService from "../../../services/food-records.service";
import { useParams } from "react-router-dom";
import authService from "../../../services/auth.service";

const AddProductToWarehouses = () => {

    const { id } = useParams();
    // const currentUser = authService.getCurrentUser();
    const requester = authService.getCurrentUser().id;
    const [product, setProduct] = useState("");
    const onChangeProduct = (e) => {
        setProduct(e.target.value);
    }

    const [quantity, setQuantity] = useState("");
    const onChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const [bestBefore, setBestBefore] = useState(new Date())
    const [productData, setProductData] = useState([]);
    const getProductData = async () => {
        const res = await ProductsService.getAllProducts();
        const data = res.data;

        const productDataMap = data.map(obj => ({
            "key": obj.id,
            "value": obj.name + " ,вес: " + obj.packageWeight + "кг"
        }))

        setProductData(productDataMap)
    }

    useEffect(() => {
        getProductData();
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
            recordsService.addRecordToWarehouse(requester, product, id, quantity, bestBefore).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    setLoading(false);
                    setProduct("");
                    setQuantity("");
                    setBestBefore(new Date());
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
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
    }

    return (
        <div>
            <Form onSubmit={handleCreate} ref={form}>

                <tr>
                    <td>
                        <FormControl sx={{ m: 0, minWidth: 120 }}>
                            <InputLabel id="product">Продукт</InputLabel>
                            <Select
                                labelId="product"
                                id="product"
                                label="Продукт"
                                options={productData}
                                value={productData.find(obj => obj.key === product)}
                                onChange={onChangeProduct}
                            >
                                {productData.map((obj) => (
                                    <MenuItem
                                        value={obj.key}
                                        selected={productData === obj.key}
                                    >
                                        {obj.value}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Выберите продукт</FormHelperText>
                        </FormControl>
                    </td>
                    <td>
                        <TextField
                            label="Количество"
                            placeholder="Количество единиц"
                            value={quantity}
                            onChange={onChangeQuantity}
                            type="text"
                        />
                    </td>
                    <td>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
                            <DesktopDatePicker
                                label="Best Before"
                                inputFormat="dd.MM.yyyy"
                                value={bestBefore}
                                selected={bestBefore}
                                onChange={date => setBestBefore(date)}
                                renderInput={(params) => <TextField {...params} />}
                                //maxDate={new Date()}
                                clearable={true}
                            />
                        </LocalizationProvider>
                    </td>
                    <td>
                        <LoadingButton
                            variant="contained"
                            onClick={handleCreate}
                            loading={loading}
                            sx={{ my: 5 }}
                        >
                            Добавить
                        </LoadingButton>
                    </td>
                </tr>

                {message && (
                    <div className="form-group">
                        <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
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

export default AddProductToWarehouses;
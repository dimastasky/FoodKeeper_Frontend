import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useHistory, Link, useParams } from "react-router-dom";
import { Table } from "antd";

import AuthService from "../../../services/auth.service";
import recordsService from "../../../services/food-records.service";

import { AiFillCloseCircle } from "react-icons/ai";

import AddProductToWarehouses from "./CreateRecord";

// todo: Check this as TABLE https://codesandbox.io/s/jqwwuw?file=/demo.js

const UserWarehouseTable = () => {

    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: "descend",
            width: '3%'
        },
        {
            title: "BestBefore",
            dataIndex: 'bestBefore'
        },
        {
            title: "Count",
            dataIndex: 'count'
        },
        {
            title: "Name",
            dataIndex: ['product', 'name'],
        },
        {
            title: "FoodType",
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: "descend",
            dataIndex: ['product', 'foodType', 'name'],
        },
        {
            title: "Energy",
            dataIndex: ['product', 'energy'],
        },
        {
            title: "Fat",
            dataIndex: ['product', 'fat'],
        },
        {
            title: "protein",
            dataIndex: ['product', 'protein'],
        },
        {
            title: "Carbs",
            dataIndex: ['product', 'carbs'],
        },
        {
            title: "Package Weight",
            dataIndex: ['product', 'packageWeight'],
        },
    ]

    const {id} = useParams(); // Id склада
    const requester = AuthService.getCurrentUser().id;
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(false);
    const getRecords = async (wId) => {
        try {
            setLoading(true);
            wId = parseInt(wId);
            const res = await recordsService.getWarehouseRecords(wId);
            console.log(typeof parseInt(wId));
            console.log(res.data);
            setRecords(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRecords(id, requester)
    }, [])

    const handleTableChange = (filters, sorter) => {
        getRecords({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    };

    let history = useHistory();

    return (
        <div>
            <div>
                <div className="head-table">
                    <div className="head_form">
                        <AiFillCloseCircle
                            onClick={() => history.goBack()}
                            className="close"
                        />
                        <h2 className="fontsize_head"><b>Ваши склады {requester}</b></h2>
                    </div>
                    <hr align="center" width="100%" size="2" color="red" />
                </div>
            </div>
            <div className="jumbotron">
                <h2>Добавить продукт на склад</h2>
                <AddProductToWarehouses/>
            </div>
            <div className="jumbotron">
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={records}
                    //pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </div>

    );
}

export default UserWarehouseTable;
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useHistory, Link } from "react-router-dom";
import { Table } from "antd";

import AuthService from "../../../services/auth.service";
import WarehousesService from "../../../services/warehouses.service";

import { AiFillCloseCircle } from "react-icons/ai";
import CreateWarehouse from "./CreateWarehouse";

const AllUserWarehousesTable = () => {
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: "descend",
            width: '3%'
        },
        {
            title: "Название",
            dataIndex: "name"
        },
        {
            title: "Тип склада",
            dataIndex: ['warehouseType', 'name']
        },
        {
            title: 'Перейти на склад',
            dataIndex: 'id',
            render: (text, record) => (
                <div>
                    <Link to={"/foodkeeper/user-warehouses/id/" + record.id}><button type="button" class="btn btn-table"><b>Перейти</b></button></Link>
                    <Link to={"/foodkeeper/user-warehouses2/id/" + record.id}><button type="button" class="btn btn-table"><b>Перейти2</b></button></Link>
                </div>
            ),
        },
    ]

    const currentUser = AuthService.getCurrentUser();
    const requester = currentUser.id;
    const [warehouses, setWarehouses] = useState([]);

    const [loading, setLoading] = useState(false);
    const getUserWarehouses = async (userId) => {
        try {
            setLoading(true);
            const res = await WarehousesService.getCurrentUserWarehouses(userId);
            console.log(res.data);
            setWarehouses(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserWarehouses(requester)
    }, [])

    const handleTableChange = (filters, sorter) => {
        getUserWarehouses({
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    }

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
                <h2>Добавить склад</h2>
                <CreateWarehouse/>
            </div>
            <div className="jumbotron">
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={warehouses}
                    //pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
}

export default AllUserWarehousesTable;
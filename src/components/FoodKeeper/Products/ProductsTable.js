import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import { Affix, Table } from "antd";

import ProductsService from "../../../services/products.service";
import AddProduct from "./CreateProduct";

import { AiFillCloseCircle } from "react-icons/ai";

const ProductTable = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
      width: '3%'
    },
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: "Energy",
      sorter: (a, b) => a.energy - b.energy,
      dataIndex: 'energy'
    },
    {
      title: "Carbs",
      sorter: (a, b) => a.carbs - b.carbs,
      dataIndex: 'carbs'
    },
    {
      title: "Protein",
      sorter: (a, b) => a.protein - b.protein,
      dataIndex: 'protein'
    },
    {
      title: "Fat",
      sorter: (a, b) => a.fat - b.fat,
      dataIndex: 'fat'
    },
    {
      title: "Weight",
      sorter: (a, b) => a.weight - b.weight,
      dataIndex: 'packageWeight'
    },
    {
      title: "Category",
      sorter: (a, b) => a.foodType.id - b.foodType.id,
      dataIndex: ['foodType', 'name']
    }
  ]

  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await ProductsService.getAllProducts();
      console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts()
  }, []);

  const handleTableChange = (filters, sorter) => {
    getAllProducts({
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  const [loading, setLoading] = useState(false);
  let history = useHistory();
  // TODO: Дизайн кнопки назад; 
  // TODO: Обновление таблицы при изменениях
  return (
    <div>
      <div>
        <div className="head-table">
          <div className="head_form">
            <AiFillCloseCircle
              onClick={() => history.goBack()}
              className="close"
            />
            <h2 className="fontsize_head"><b>Ваши продукты</b></h2>
          </div>
          <hr align="center" width="100%" size="2" color="red" />
        </div>
      </div>
      <div className="jumbotron">
        <h2>Добавить продукт</h2>
        <AddProduct />
      </div>
      <div className="jumbotron">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={products}
          //pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default ProductTable;
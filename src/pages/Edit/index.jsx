import Input from "../../components/Input";
import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";

function Edit(){
  const { id } = useParams();
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [status, setstatus] = useState("");

  useEffect(() => {
    const AxiosDetail = async () => {
      let Response = await axios.get(`https://crudmernbackend.herokuapp.com/detail/${id}`);
      setname(Response.data[0].name);
      setprice(Response.data[0].price);
      setstock(Response.data[0].stock);
      setstatus(Response.data[0].status);
      
    };
    AxiosDetail();
  },[id]);

  
  const AxiosUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`https://crudmernbackend.herokuapp.com/update/${id}`, {
        name: name,
        stock: stock,
        price: price,
        status: status,
      });
      alert("Data Berhasil Diupdate");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={AxiosUpdate}>
          <Input
            id="name"
            type="text"
            onChange={(e) => setname(e.target.value)}
            placeholder="Nama Produk..."
            value={name}
          />
          <Input
            id="price"
            type="number"
            onChange={(e) => setprice(e.target.value)}
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
          />
          <Input
            id="Stock"
            type="number"
            onChange={(e) => setstock(e.target.value)}
            placeholder="Stock Produk..."
            label="Stock"
            value={stock}
          />
          <Input
            id="status"
            onChange={(e) => setstatus(e.target.value)}
            type="checkbox"
            label="Active"
            value={status}
            checked
          />
          <button type="submit" className="btn btn-warning">
            Update
          </button>
        </form>
      
      </div>
    </div>
  );
};

export default Edit;

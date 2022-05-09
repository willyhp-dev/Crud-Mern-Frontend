import Input from "../../components/Input";
import axios from "axios";
import "./index.scss";
import React, { useState } from "react";

function Tambah() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const [status, setstatus] = useState("");

  const addProduct = async (e) => {
    let url = "https://crudmernbackend.herokuapp.com/productz/";
    e.preventDefault();
    try {
      await axios.post(url, {
        name: name,
        price: price,
        stock: stock,
        status: status,
      });
      alert("Berhasil Tambah Data");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={addProduct}>
          <Input
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
          />
          <Input
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
          />
          <Input
            id="Stock"
            value={stock}
            onChange={(e) => setstock(e.target.value)}
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
          />
          <Input
            id="status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            type="checkbox"
            label="Active"
            checked
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tambah;

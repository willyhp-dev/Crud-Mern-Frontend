import { Link } from "react-router-dom";
import "./index.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [product, setproduct] = useState([]);
  const [error, seterror] = useState(true);
  const [search, setsearch] = useState("");

  useEffect(() => {
    AxiosData();
  }, []);
  const AxiosData = async () => {
    let Response = await axios.get(`https://crudmernbackend.herokuapp.com/`);
    if (!Response) {
      seterror(true);
    } else {
      seterror(false);
      console.log(Response.data);
      setproduct(Response.data);
    }
  };
  const AxiosDelete = async (id) => {
    try {
      await axios.delete(
        `https://crudmernbackend.herokuapp.com/delete/${id}`
      );

      setTimeout(AxiosData, 1000);
      alert("Berhasil Delete Data");
    } catch (error) {
      console.log(error);
    }
  };
  const AxiosSearch = async () => {
    let Response = await axios.get(
      `https://crudmernbackend.herokuapp.com/productz/${search}`
    );
    if (!Response) {
      seterror(true);
    } else {
      seterror(false);
      console.log(Response.data);
      setproduct(Response.data);
    }
  };
  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          onKeyDown={AxiosData}
          onKeyUp={AxiosSearch}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Masukan kata kunci..."
        />
      </div>
      <table width="100%" className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={12}>
                <center>Data Not Response</center>
              </td>
            </tr>
          ) : product.length === 0 ? (
            <tr>
              <td colSpan={12}>
                <center>Data Not Found</center>
              </td>
            </tr>
          ) : (
            product.map((products, key) => (
              <tr key={key + 1}>
                <td>{products._id}</td>
                <td>{products.name}</td>
                <td className="text-right">Rp {products.price} </td>
                <td className="text-center">
                  <Link
                    to={`Detail/${products._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`edit/${products._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    type="submit"
                    onClick={() => AxiosDelete(products._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;

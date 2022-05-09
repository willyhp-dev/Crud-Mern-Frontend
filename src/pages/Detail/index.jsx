import { Link } from "react-router-dom";
import "./index.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
  const [detail, setDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const AxiosDetail = async () => {
      try {
        let Response = await axios.get(`https://crudmernbackend.herokuapp.com/detail/${id}`);
        setDetail(Response.data);
      } catch (error) {
        console.log(error);
      }
    };
    AxiosDetail();
  },[id]);

  
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          {detail.map((product) => (
            <>
              <tr>
                <td>ID</td>
                <td>: {product._id} </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>: {product.name}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>: {product.price}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>: {product.stock}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Detail;

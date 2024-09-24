/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Heart from "../../assets/Heart";
import ProductContext from "../../Context/ProductContext";
import "./Posts.css";

function Posts() {
  const { products } = useContext(ProductContext);

  // console.log('products from post.jsx page: ',products);
  // const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
        <div className="heading1">
          <span>Quick Menu</span>
        </div>
        <br />
        <div className="cards">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/product-details/${i}`}
              className="card"
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrls[0]} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="category">{product.Category}</span>
                <p className="name">{product.title}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
        <br></br>
       
    </>
  );
}

export default Posts;

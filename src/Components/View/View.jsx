/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { useParams } from 'react-router-dom';
import ProductContext from '../../Context/ProductContext';

function View() {
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products[Number(id)];

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={product?.imageUrls[imgIndex]}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p className="price">&#x20B9; {product?.price}</p>
          <span className="title">{product?.title}</span>
          <p className="category">{product?.Category}</p>
          <span className="createdAt">{product?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p className="sellerTitle">Seller details</p>
          <p className="sellerName">{product?.userName}</p>
        </div>
      </div>
    </div>
  );
}

export default View;


/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import Spinner from "../Spinner/Spinner";

const Create = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { addProduct } = useContext(ProductContext);

  const handleImage = (e) => {
    const img = e.target.files;
    setImages([...img]);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Title
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    // Validate Category
    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    // Validate Price
    if (!price) {
      newErrors.price = "Price is required";
    } else if (isNaN(price) || price <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    // Validate Images
    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);

    // If the errors object is empty, return true, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation before submitting
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      setLoading(true);
      await addProduct(title, category, price, images);
      console.log("Product added successfully");
      navigate("/");
    } catch (error) {
      console.log("Failed to add product:", error.message);
      alert("Failed to add product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="formContainer">
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>} {/* Title error */}

            <label htmlFor="category">Category</label>
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors.category && <p className="error">{errors.category}</p>} {/* Category error */}

            <label htmlFor="price">Price</label>
            <input
              className="input"
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="error">{errors.price}</p>} {/* Price error */}

            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
              onChange={handleImage}
              accept="image/*"
              multiple
            />
            {errors.images && <p className="error">{errors.images}</p>} {/* Images error */}

            <div className="imagePreview">
              {images?.map((image, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width="150px"
                  height="150px"
                />
              ))}
            </div>

            <div className="buttonContainer">
              {loading ? (
                <Spinner />
              ) : (
                <button className="uploadBtn" type="submit">
                  Upload and Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;

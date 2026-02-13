import React, { useState } from "react";
import axios from "axios";

export default function CreateProduct() {

  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/api/${category}`, formData);
      alert("Product Created Successfully ✅");
      setFormData({});
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h2>Create Product</h2>

      {/* CATEGORY SELECT */}
      <select value={category} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        <option value="tshirts">T-Shirt</option>
        <option value="shirts">Shirt</option>
        <option value="jeans">Jeans</option>
        <option value="trousers">Trouser</option>
        <option value="shoes">Shoes</option>
        <option value="innerwear">Innerwear</option>
        <option value="features">Feature</option>
      </select>

      {/* DYNAMIC FORM */}
      {category && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>

          {/* Common Fields */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            required
          />

          {/* Category Specific Fields */}

          {category === "tshirt" && (
            <>
              <input
                type="text"
                name="size"
                placeholder="Size (S,M,L,XL)"
                onChange={handleChange}
              />
              <input
                type="text"
                name="color"
                placeholder="Color"
                onChange={handleChange}
              />
            </>
          )}

          {category === "shoes" && (
            <>
              <input
                type="number"
                name="shoeSize"
                placeholder="Shoe Size"
                onChange={handleChange}
              />
              <input
                type="text"
                name="material"
                placeholder="Material"
                onChange={handleChange}
              />
            </>
          )}

          {category === "jeans" && (
            <>
              <input
                type="number"
                name="waist"
                placeholder="Waist Size"
                onChange={handleChange}
              />
              <input
                type="number"
                name="length"
                placeholder="Length"
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit" style={{ marginTop: "10px" }}>
            Create Product
          </button>
        </form>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditOilProduct = ({ productId }) => {
  const [oilProduct, setOilProduct] = useState({
    date: '',
    srNo: '',
    productName: '',
    grade: '',
    colour: '',
    mrp: '',
    volumePerPieces: '',
    volumeType: '',
    pcsPerCase: '',
    pcsType: '',
  });

  useEffect(() => {
    // Fetch the current data of the product to populate the form
    const fetchOilProduct = async () => {
      try {
        const response = await axios.get("http://localhost:4000/addoil");
        setOilProduct(response.data);
      } catch (error) {
        console.error('Error fetching the oil product data', error);
      }
    };

    fetchOilProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOilProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/oil/${productId}`, oilProduct);
      console.log(response.data);
      alert('Oil product updated successfully!');
    } catch (error) {
      console.error('Error updating the oil product', error);
      alert('Failed to update oil product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={oilProduct.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Serial Number</label>
        <input
          type="number"
          name="srNo"
          value={oilProduct.srNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={oilProduct.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Grade</label>
        <input
          type="text"
          name="grade"
          value={oilProduct.grade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Colour</label>
        <input
          type="text"
          name="colour"
          value={oilProduct.colour}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>MRP</label>
        <input
          type="number"
          name="mrp"
          value={oilProduct.mrp}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Volume Per Pieces</label>
        <input
          type="number"
          name="volumePerPieces"
          value={oilProduct.volumePerPieces}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Volume Type</label>
        <input
          type="text"
          name="volumeType"
          value={oilProduct.volumeType}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pcs Per Case</label>
        <input
          type="text"
          name="pcsPerCase"
          value={oilProduct.pcsPerCase}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pcs Type</label>
        <input
          type="text"
          name="pcsType"
          value={oilProduct.pcsType}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Oil Product</button>
    </form>
  );
};

export default EditOilProduct;

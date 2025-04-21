import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./AddProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    productImage: "",
    productLink: "",
    productName: "",
    productPrice: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), formData);
      console.log("Produto adicionado com ID:", docRef.id);
      alert("Produto adicionado com sucesso!");
      setFormData({
        productImage: "",
        productLink: "",
        productName: "",
        productPrice: ""
      });
    } catch (e) {
      console.error("Erro ao adicionar produto: ", e);
      alert("Erro ao adicionar produto: " + e.message);
    }
  };

  return (
    <div className="add-product-page">
      <h1>Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="productImage">URL da Imagem do Produto:</label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productLink">Link do Produto:</label>
          <input
            type="text"
            id="productLink"
            name="productLink"
            value={formData.productLink}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productName">Nome do Produto:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Preço do Produto:</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}

export default AddProduct; 
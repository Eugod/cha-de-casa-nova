import { useState } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './PurchaseModal.css';

function PurchaseModal({ product, onClose }) {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageData, setMessageData] = useState({
    name: '',
    message: ''
  });

  const handlePurchaseResponse = async (purchased) => {
    if (!purchased) {
      onClose();
      return;
    }
    setShowMessageForm(true);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adicionar mensagem à coleção messages
      await addDoc(collection(db, "messages"), {
        productId: product.id,
        productName: product.productName,
        name: messageData.name,
        message: messageData.message,
        timestamp: new Date()
      });

      // Atualizar o produto na coleção products
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        productPurchased: true,
        productPurchasedBy: messageData.name
      });

      onClose();
    } catch (error) {
      console.error("Erro ao salvar mensagem:", error);
      alert("Erro ao salvar mensagem: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!showMessageForm ? (
          <>
            <h2>Você comprou o produto {product.productName}?</h2>
            <div className="modal-buttons">
              <button onClick={() => handlePurchaseResponse(true)}>Sim</button>
              <button onClick={() => handlePurchaseResponse(false)}>Não</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleMessageSubmit}>
            <h2>Deixe sua mensagem</h2>
            <div className="form-group">
              <label htmlFor="name">Seu nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={messageData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Sua mensagem:</label>
              <textarea
                id="message"
                name="message"
                value={messageData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-buttons">
              <button type="submit">Enviar</button>
              <button type="button" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PurchaseModal; 
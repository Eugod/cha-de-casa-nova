import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import PurchaseModal from '../../components/PurchaseModal/PurchaseModal';
import './GiftList.css';

const GiftList = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const produtosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProdutos(produtosData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar produtos: ' + err.message);
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleProductClick = (produto) => {
    if (produto.productPurchased) return; // Não faz nada se o produto já foi comprado

    // Salvar o produto selecionado no localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(produto));
    // Redirecionar para o link do produto
    window.open(produto.productLink, '_blank');
  };

  useEffect(() => {
    // Verificar se existe um produto selecionado no localStorage
    const checkSelectedProduct = () => {
      const savedProduct = localStorage.getItem('selectedProduct');
      if (savedProduct) {
        setSelectedProduct(JSON.parse(savedProduct));
        localStorage.removeItem('selectedProduct');
      }
    };

    // Adicionar listener para quando a janela receber foco
    window.addEventListener('focus', checkSelectedProduct);
    // Verificar imediatamente ao carregar a página
    checkSelectedProduct();

    return () => {
      window.removeEventListener('focus', checkSelectedProduct);
    };
  }, []);

  if (loading) return <div className="container mx-auto p-4">Carregando...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="gift-list-container">
      <h1 className="gift-list-title">Lista de Presentes</h1>
      <div className="gift-list-grid">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            onClick={() => handleProductClick(produto)}
            className={`gift-list-item ${produto.productPurchased && 'cursor-not-allowed'}`}
          >
            {produto.productImage && (
              <img
                src={produto.productImage}
                alt={produto.productName}
                className="gift-list-image"
              />
            )}
            <h2 className="gift-list-name">{produto.productName}</h2>
            <p className="gift-list-price">
              R$ {produto.productPrice}
            </p>
            {produto.productPurchased ? (
              <div className="gift-list-purchased">
                <p className="gift-list-purchased-text">Produto já comprado por: {produto.productPurchasedBy}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default GiftList; 
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ListaDePresentes = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="container mx-auto p-4">Carregando...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nossos Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <a key={produto.id} href={produto.productLink} target="_blank" className="border rounded-lg p-4 shadow-md">
            {produto.productImage && (
              <img 
                src={produto.productImage} 
                alt={produto.productName} 
                className="w-full h-48 object-cover rounded-md mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{produto.productName}</h2>
            <p className="text-gray-600">{produto.productDescription}</p>
            <p className="text-lg font-bold mt-2">
              R$ {produto.productPrice}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ListaDePresentes; 
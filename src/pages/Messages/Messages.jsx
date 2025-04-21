import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './Messages.css';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, 'messages');
        const messagesSnapshot = await getDocs(messagesCollection);
        const messagesList = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesList);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="messages-loading">Carregando mensagens...</div>;
  }

  return (
    <div className="messages-container">
      <h1>Mensagens</h1>
      <div className="messages-list">
        {messages.length === 0 ? (
          <p>Nenhuma mensagem encontrada.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="message-card">
              <h3>{message.name}</h3>
              <p className="product-name">Produto: {message.productName}</p>
              <p className="message-text">{message.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Messages; 
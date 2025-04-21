import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

function Admin() {
  async function adicionarUsuario() {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nome: "Maria",
        email: "maria@example.com",
        idade: 28
      });
      console.log("Documento criado com ID:", docRef.id);
      alert("Usuário adicionado com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar usuário: " + e.message);
    }
  }

  return (
    <div className="admin-page">
      <h1>Página de Administração</h1>
      <div className="admin-buttons">
        <button 
          onClick={adicionarUsuario}
          className="add-user-button"
        >
          Adicionar Usuário de Teste
        </button>
        <Link to="/admin/add-product" className="add-product-button">
          Adicionar Produto
        </Link>
      </div>
    </div>
  );
}

export default Admin; 
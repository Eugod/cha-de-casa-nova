import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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
      <button 
        onClick={adicionarUsuario}
        className="add-user-button"
      >
        Adicionar Usuário de Teste
      </button>
    </div>
  );
}

export default Admin; 
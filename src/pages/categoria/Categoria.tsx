import ListaCategoria from "../../components/categorias/listaCategoria/ListaCategoria"
import ModalCategoria from "../../components/categorias/modalCategoria/ModalCategoria"
import Navbar from "../../components/navbar/Navbar"

function Categoria() {
  return (
    <>
      <Navbar />
      <div className="text-center my-6">
        <h1 className="text-3xl font-bold text-green-600">Categorias</h1>
        <p className="text-gray-600 mt-2 italic">
          Escolha ou crie categorias para deixar seu cardápio saudável ainda mais organizado 
        </p>
      </div>
       <ModalCategoria />
      <ListaCategoria />
    </>
  );
}


export default Categoria

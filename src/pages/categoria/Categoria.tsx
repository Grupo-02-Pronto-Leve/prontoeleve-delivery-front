import { useEffect, useState } from "react";
import ListaCategoria from "../../components/categorias/listaCategoria/ListaCategoria";
import ModalCategoria from "../../components/categorias/modalCategoria/ModalCategoria";
import Navbar from "../../components/navbar/Navbar";

function Categoria() {
  const [loading, setLoading] = useState(true);

  // Simula o carregamento inicial para esconder os botões
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // boa prática para limpar
  }, []);

  return (
    <>
      <div className="bg-[#15161B] min-h-screen flex flex-col">
        <Navbar />
        <div className="">
          {!loading && (
            <div className="text-center my-6">
              <h1 className="text-3xl font-bold text-green-600">Categorias</h1>
              <p className="text-gray-100 mt-2 italic">
                Escolha ou crie categorias para deixar seu cardápio saudável ainda mais organizado
              </p>
              <ModalCategoria />
            </div>
          )}

          <ListaCategoria />
        </div> 
      </div>
    </>
  );
}

export default Categoria;



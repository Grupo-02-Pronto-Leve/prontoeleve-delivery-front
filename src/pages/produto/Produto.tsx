import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ListaProdutos from "../../components/produtos/listaProdutos/ListaProdutos";

function Produto() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-neutral-950 via-neutral-600 to-black text-white">
        <section className="mx-auto max-w-7xl px-4 py-10">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Produtos
            </h1>

            <Link
              to="/cadastrarproduto"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2
                         bg-gradient-to-r from-teal-400 to-ligth-green text-white font-semibold
                         hover:from-ligth-green hover:to-teal-400 shadow-sm transition"
            >
              + Novo Produto
            </Link>
           
          </header>

          {/* A lista já cuida do grid e do botão caso você esteja usando o ModalProduto lá */}
          <ListaProdutos />
        </section>
      </main>
    </>
  );
}

export default Produto;

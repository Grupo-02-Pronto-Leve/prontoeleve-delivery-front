import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";

import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import Footer from "./components/footer/Footer";
import Categoria from "./pages/categoria/Categoria";
import Produto from "./pages/produto/Produto";
import ContatoHero from "./pages/contatoHero/ContatoHero";

import FormProduto from "./components/produtos/formProduto/FormProduto";
import DeletarProduto from "./components/produtos/deletarProduto/DeletarProduto";
import FormCategoria from "./components/categorias/formCategoria/FormCategoria";
import DeletarCategoria from "./components/categorias/deletarCategoria/DeletarCategoria";


import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Sobre from "./pages/sobre/Sobre";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/categorias" element={<Categoria />} />
              <Route path="/categorias/cadastrar" element={<FormCategoria />} />
              <Route path="/categorias/:id" element={<FormCategoria />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/produtos" element={<Produto />} />
              <Route path="/produtos/:id" element={<FormProduto />} />
              <Route path="/cadastrarproduto/" element={<FormProduto />} />
              <Route path="/cadastrarproduto/:id" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/contato" element={<ContatoHero />} />
              <Route path="/sobre" element={<Sobre />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

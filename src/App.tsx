import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import { AuthProvider } from './contexts/AuthContext'

import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'

import Categoria from './pages/categoria/Categoria'
import Produto from './pages/produto/Produto'
import Footer from './components/footer/Footer'


import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <ToastContainer />
        <BrowserRouter>
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/categorias" element={<Categoria />} />
              <Route path="/produtos" element={<Produto />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  )
}

export default App
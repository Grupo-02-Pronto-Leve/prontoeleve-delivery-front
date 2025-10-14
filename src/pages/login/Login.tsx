import { type ChangeEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import "./Login.css";
import logo from "../../assets/logo.png";
import prontoelevehorizontal from "../../assets/prontoelevehorizontal.png"
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Perfil } from "../../models/Perfil";

function Login() {
  const navigate = useNavigate();
  const { handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
  id: 0,
  nome: "",
  usuario: "",
  senha: "",
  foto: "",
  token: "",
  perfil: Perfil.CLIENTE, // ou EMPRESA, padrão
});

async function login(e: ChangeEvent<HTMLFormElement>) {
  e.preventDefault();
  await handleLogin(usuarioLogin);

  // Redirecionar com base no perfil
  if (usuarioLogin.perfil === Perfil.EMPRESA) {
    navigate("/home");
  } else if (usuarioLogin.perfil === Perfil.CLIENTE) {
    navigate("/cardapio");
  }
}

  function atualizarEstado(e: ChangeEvent<HTMLInputElement> ) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

return (
    <>
      <div className="relative w-full min-h-screen flex flex-col bg-black">
        {/* Fundo com overlay */}
        <div className="background-img absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Container principal */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Coluna Esquerda (logos e texto) */}
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <Link to="/home">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-24 sm:h-28 md:h-32 w-auto rounded-lg cursor-pointer"
                />
              </Link>

              <Link to="/home">
                <img
                  src={prontoelevehorizontal}
                  alt="Logo Pequena"
                  className="h-8 sm:h-10 w-auto cursor-pointer"
                />
              </Link>

              <p className="text-white text-base sm:text-lg md:text-xl font-marko max-w-xs sm:max-w-sm md:max-w-md leading-relaxed">
                Solução moderna e inclusiva para você!
              </p>
            </div>

            {/* Formulário */}
            <form
              className="bg-[#111111]/80 backdrop-blur-md shadow-lg rounded-2xl py-6 px-5 sm:py-8 sm:px-10 w-full max-w-[400px] text-white mx-auto"
              onSubmit={login}
            >
              <h1 className="text-white text-3xl sm:text-4xl font-marko font-semibold text-center mb-4">
                Login
              </h1>

              {/* Campo Usuário */}
              <label
                htmlFor="usuario"
                className="block mb-2 font-zain text-lg sm:text-xl font-medium text-white"
              >
                Usuário
              </label>
              <div className="relative mb-4">
                <MdOutlineAlternateEmail className="absolute top-3.5 left-3 text-gray-400 text-lg" />
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  className="pl-10 pr-4 py-2 w-full rounded text-base sm:text-lg bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  placeholder="Digite seu e-mail"
                />
              </div>

              {/* Campo Senha */}
              <label
                htmlFor="senha"
                className="block mb-2 font-zain text-lg sm:text-xl font-medium text-white"
              >
                Senha
              </label>
              <div className="relative mb-6">
                <FaLock className="absolute top-3.5 left-3 text-gray-400 text-lg" />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="pl-10 pr-4 py-2 w-full rounded text-base sm:text-lg bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  placeholder="Digite sua senha"
                />
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="w-full bg-lime-600 hover:bg-lime-700 transition text-white font-semibold font-marko text-lg sm:text-xl px-3 py-2 rounded-full mb-4"
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </button>

              {/* Link de cadastro */}
              <p className="font-zain text-base sm:text-lg text-center">
                Ainda não tem uma conta?{" "}
                <Link
                  to="/cadastro"
                  className="text-lime-600 hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

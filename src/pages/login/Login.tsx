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
  if (usuarioLogin.perfil === "EMPRESA") {
    navigate("/home");
  } else if (usuarioLogin.perfil === "CLIENTE") {
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
      <div className="relative w-full min-h-screen">
        <div className="background-img">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          {/* Posiciona o meu formulário */}
          <div className="absolute inset-0 min-h-screen flex justify-center items-center">
            {/* Texto da esquerda */}
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex flex-col items-center gap-2">
                  <Link to="/home">
                  <img src={logo} alt="Logo" className="h-30 w-auto rounded-lg cursor-pointer" />
                </Link>

                <Link to="/home">
                  <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-10 w-auto cursor-pointer" />
                </Link>
                </div>
                <p className="text-white text-xl font-marko text-relaxed pt-3 text-center">
                  Solução moderna e inclusiva para você!
                </p>
              </div>
              <form
                className="bg-[#111111]/80 backdrop-blur-md shadow-lg rounded-xl py-8 px-10 w-full max-w-[400px] text-white"
                onSubmit={login}
              >
                <h1 className="text-white text-4xl font-marko font-semibold text-center mb-4">
                  Login
                </h1>
                <label
                  htmlFor="usuario"
                  className="block mb-2 font-zain text-xl font-medium text-white"
                >
                  Usuário
                </label>
                <div className="relative mb-4">
                <MdOutlineAlternateEmail className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  className="pl-10 pr-4 py-2 w-full rounded text-lg bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  placeholder="Digite seu e-mail"
                />
                </div>

                <label
                  htmlFor="senha"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Senha
                </label>
                <div className="relative mb-4">
                <FaLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="pl-10 pr-4 py-2 w-full rounded text-lg bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  placeholder="Digite sua senha"
                />
                </div>

                <button
                  type="submit"
                  className="w-full bg-lime-600 hover:bg-lime-700 transition text-white font-semibold font-marko text-xl px-3 py-2 rounded-full mb-4"
                >
                  {isLoading ? "Carregando..." : "Entrar"}
                </button>
                
                <p className="font-zain text-xl text-center justify-center">
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
      </div>
    </>
  );
}

export default Login;

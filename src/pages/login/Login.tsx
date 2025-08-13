import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import "./Login.css";
import logo from "../../assets/logo.png";
import prontoelevehorizontal from "../../assets/prontoelevehorizontal.png"

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
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
                        <img src={logo} alt="Logo" className="h-30 w-auto rounded-lg" />
                        <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-10 w-auto" />
                      </div>
                <p className="text-white text-xl text-center">
                  Solução moderna e inclusiva para você!
                </p>
              </div>
              <form
                className="bg-[#111111] rounded-lg py-12 px-12 w-full max-w-[400px] box-border text-[#fff] mx-auto"
                onSubmit={login}
              >
                <h1 className="text-white text-4xl font-semibold text-center mb-4">
                  Login
                </h1>
                <label
                  htmlFor="usuario"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Usuário
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] text-white placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-4"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  placeholder="Digite seu e-mail"
                />

                <label
                  htmlFor="senha"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] text-white placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-4"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  placeholder="Digite sua senha"
                />

                <button
                  type="submit"
                  className="w-full bg-lime-600 hover:bg-lime-700 transition text-black font-semibold text-xl px-3 py-2 rounded-full mb-4"
                >
                  {isLoading ? "Carregando..." : "Entrar"}
                </button>
                
                <p className="">
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

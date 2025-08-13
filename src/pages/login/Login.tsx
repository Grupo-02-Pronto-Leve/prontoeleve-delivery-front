import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import "./Login.css";

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
                <h1 className="text-4xl text-[#00C950] font-bold mb-2">
                  Pronto & Leve
                </h1>
                <p className="text-white text-xl">
                  Solução moderna e inclusiva para você!
                </p>
              </div>
              <form
                className="bg-[#141414] py-12 px-12 shadow-[0_12px_24px_rgba(0,0,0,0.15)] w-full max-w-[400px] box-border text-[#fff]"
                onSubmit={login}
              >
                <h1 className="text-white text-5xl font-semibold text-center mb-7">
                  Login
                </h1>
                <label
                  htmlFor="usuario"
                  className="block mb-2 font-semibold text-white"
                >
                  Usuário
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  className="w-full py-2 px-4 mb-4 border border-white rounded-xl text-lg"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  placeholder="Digite seu usuário"
                />

                <label
                  htmlFor="senha"
                  className="block mb-2 font-semibold text-white"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="w-full py-2 px-4 mb-4 border border-white rounded-xl text-lg"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  placeholder="Digite sua senha"
                />

                <button type="submit" className="btn-submit">
                  {isLoading ? "Carregando..." : "Entrar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

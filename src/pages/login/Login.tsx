import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

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
      <div className="background"></div>

      <div className="page-container">
        <form className="login-form" onSubmit={login}>
          <h1 className="title">Faça seu Login</h1>

          <label htmlFor="usuario" className="label">
            Usuário
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            className="input"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            placeholder="Digite seu usuário"
          />

          <label htmlFor="senha" className="label">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            className="input"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            placeholder="Digite sua senha"
          />

          <button type="submit" className="btn-submit">
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FaImage, FaLock } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import prontoelevehorizontal from "../../assets/prontoelevehorizontal.png";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import "./Cadastro.css";
import { Perfil, type Perfil as TipoPerfil } from "../../models/Perfil";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    perfil: Perfil.CLIENTE,
  });

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.usuario);
  const nomeValido = usuario.nome.trim().length >= 5;
  const nomeInvalido = usuario.nome.trim().length > 0 && !nomeValido;

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

function atualizarEstado(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value } = e.target;

  setUsuario({
    ...usuario,
    [name]: name === "perfil" ? (value as TipoPerfil) : value,
  });
}

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro");
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes... Verifique as informações do cadastro",
        "erro"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }

    setIsLoading(false);
  }

return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center px-4 py-6 sm:py-10 bg-black relative">
        {/* Fundo escuro com overlay */}
        <div className="absolute inset-0 background-cadastro">
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        {/* Container principal */}
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Formulário */}
        <form
              className="bg-[#111111]/80 backdrop-blur-md shadow-xl rounded-2xl py-8 px-6 sm:px-10 w-full max-w-2xl text-white overflow-y-auto max-h-[85vh]"
              onSubmit={cadastrarNovoUsuario}
            >
              <h2 className="font-marko text-3xl sm:text-4xl font-semibold text-center mb-2">
                Cadastre-se
              </h2>
              <p className="text-center font-zain text-lg sm:text-xl mb-6">
                Já possui uma conta?{" "}
                <Link to="/login" className="text-lime-600 hover:underline">
                  Entre
                </Link>
              </p>

              {/* Campos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nome */}
                <div className="flex flex-col font-zain text-base w-full">
                  <label htmlFor="nome" className="font-medium text-white">
                    Nome
                  </label>
                  <div className="relative">
                    <span className="absolute top-4.5 left-3 text-gray-400">
                      <FaRegUser />
                    </span>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Nome"
                      value={usuario.nome}
                      onChange={atualizarEstado}
                      required
                      className={`pl-10 pr-3 py-3 w-full rounded bg-[#1a1a1a] border 
                        ${
                          nomeInvalido
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-400 focus:ring-lime-600"
                        } 
                        placeholder-gray-400 focus:outline-none focus:ring-2 text-lg`}
                    />
                  </div>
                  {nomeInvalido && (
                    <p className="text-red-500 text-sm mt-1">
                      O nome deve ter no mínimo 5 caracteres.
                    </p>
                  )}
                </div>

                {/* E-mail */}
                <div className="flex flex-col font-zain text-base w-full">
                  <label htmlFor="usuario" className="font-medium text-white">
                    E-mail
                  </label>
                  <div className="relative">
                    <span className="absolute top-4.5 left-3 text-gray-400">
                      <MdOutlineAlternateEmail />
                    </span>
                    <input
                      type="email"
                      id="usuario"
                      name="usuario"
                      placeholder="E-mail"
                      value={usuario.usuario}
                      onChange={atualizarEstado}
                      required
                      className={`pl-10 pr-3 py-3 w-full rounded bg-[#1a1a1a] border 
                        ${
                          emailValido || usuario.usuario === ""
                            ? "border-gray-400 focus:ring-lime-600"
                            : "border-red-500 focus:ring-red-500"
                        } 
                        placeholder-gray-400 focus:outline-none focus:ring-2 text-lg`}
                    />
                  </div>
                  {!emailValido && usuario.usuario !== "" && (
                    <p className="text-red-500 text-sm mt-1">
                      Digite um e-mail válido.
                    </p>
                  )}
                </div>

                {/* Senha */}
                <div className="flex flex-col font-zain text-base w-full">
                  <label htmlFor="senha" className="font-medium text-white">
                    Senha
                  </label>
                  <div className="relative">
                    <span className="absolute top-4.5 left-3 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Senha"
                      value={usuario.senha}
                      onChange={atualizarEstado}
                      required
                      className={`pl-10 pr-3 py-3 w-full rounded bg-[#1a1a1a] border 
                        ${
                          usuario.senha.length === 0 || usuario.senha.length >= 8
                            ? "border-gray-400 focus:ring-lime-600"
                            : "border-red-500 focus:ring-red-500"
                        } 
                        placeholder-gray-400 focus:outline-none focus:ring-2 text-lg`}
                    />
                  </div>
                  {usuario.senha.length > 0 && usuario.senha.length < 8 && (
                    <p className="text-red-500 text-sm mt-1">
                      A senha deve ter pelo menos 8 caracteres.
                    </p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="flex flex-col font-zain text-base w-full">
                  <label htmlFor="confirmarsenha" className="font-medium text-white">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <span className="absolute top-4.5 left-3 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="confirmarsenha"
                      name="confirmarsenha"
                      placeholder="Confirme a senha"
                      value={confirmaSenha}
                      onChange={handleConfirmarSenha}
                      required
                      className={`pl-10 pr-3 py-3 w-full rounded bg-[#1a1a1a] border 
                        ${
                          confirmaSenha === "" || confirmaSenha === usuario.senha
                            ? "border-gray-400 focus:ring-lime-600"
                            : "border-red-500 focus:ring-red-500"
                        } 
                        placeholder-gray-400 focus:outline-none focus:ring-2 text-lg`}
                    />
                  </div>
                  {confirmaSenha !== "" && confirmaSenha !== usuario.senha && (
                    <p className="text-red-500 text-sm mt-1">
                      As senhas não coincidem.
                    </p>
                  )}
                </div>

                {/* Foto */}
                <div className="flex flex-col font-zain text-base w-full">
                  <label htmlFor="foto" className="font-medium text-white">
                    Foto
                  </label>
                  <div className="relative">
                    <span className="absolute top-4.5 left-3 text-gray-400">
                      <FaImage />
                    </span>
                    <input
                      type="text"
                      id="foto"
                      name="foto"
                      placeholder="URL da imagem"
                      value={usuario.foto}
                      onChange={atualizarEstado}
                      className="pl-10 pr-3 py-3 w-full rounded bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600 text-lg"
                    />
                  </div>
                </div>

                {/* Perfil */}
                <div className="flex flex-col font-zain text-base w-full">
                  <label className="block text-white text-lg font-zain">
                    Perfil
                  </label>
                  <select
                    name="perfil"
                    value={usuario.perfil}
                    onChange={atualizarEstado}
                    className="pl-3 pr-3 py-3 w-full rounded bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600 text-lg text-white font-zain"
                  >
                    <option value={Perfil.EMPRESA}>Empresa</option>
                    <option value={Perfil.CLIENTE}>Cliente</option>
                  </select>
                </div>
              </div>

            {/* Botões centralizados */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full">
            <button
              type="reset"
              className="w-full sm:w-1/2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 text-white font-semibold text-lg sm:text-xl px-4 py-2 rounded-full"
              onClick={retornar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full sm:w-1/2 bg-gradient-to-r from-lime-500 to-green-600 hover:from-green-600 hover:to-lime-500 transition-all duration-300 text-white font-semibold text-lg sm:text-xl px-4 py-2 rounded-full flex items-center justify-center"
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="25"
                  visible={true}
                />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
          </form>

                  {/* Coluna de imagens */}
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 px-2 sm:px-4">
            <Link to="/home">
              <img
                src={logo}
                alt="Logo"
                className="h-28 w-auto rounded-lg cursor-pointer"
              />
            </Link>

            <Link to="/home">
              <img
                src={prontoelevehorizontal}
                alt="Logo Pequena"
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
            <p className="text-white text-sm sm:text-lg font-marko max-w-[90%]">
              Solução moderna e inclusiva para você!
            </p>
          </div>
        </div>

        {/* Espaçamento para footer */}
        <div className="h-8 sm:h-10"></div>
      </div>
    </>
  );
}

export default Cadastro;

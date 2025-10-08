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
  });

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.usuario);

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
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
      <div className="relative w-full min-h-screen flex items-center justify-center py-6 sm:py-10">
        <div className="background-cadastro">
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="absolute inset-0 flex justify-center items-center p-2 sm:p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center px-3 sm:px-6">
              {/* Formulário */}
              <form
                className="bg-[#111111]/80 backdrop-blur-md shadow-lg rounded-xl py-4 px-3 sm:px-8 w-full text-white"
                onSubmit={cadastrarNovoUsuario}
              >
                <h2 className="font-marko text-xl sm:text-3xl font-semibold text-center mb-2 sm:mb-3">
                  Cadastre-se
                </h2>
                <p className="text-center font-zain text-xl mb-3">
                  Já possui uma conta?{" "}
                  <Link to="/login" className="text-lime-600 hover:underline">
                    Entre
                  </Link>
                </p>

                <div className="flex flex-col font-zain text-xl w-full mb-3 sm:mb-4">
                  <label htmlFor="nome" className="font-medium text-white">
                    Nome
                  </label>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-gray-400">
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
                      className="pl-10 pr-3 py-2 w-full rounded bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-lime-600 text-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col font-zain text-xl w-full mb-3 sm:mb-4">
                  <label htmlFor="usuario" className="font-medium text-white">
                    E-mail
                  </label>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-gray-400">
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
                      className={`pl-10 pr-3 py-2 w-full rounded bg-[#1a1a1a] border 
          ${
            emailValido || usuario.usuario === ""
              ? "border-gray-400 focus:ring-lime-600"
              : "border-red-500 focus:ring-red-500"
          } 
          placeholder-gray-400 focus:outline-none focus:ring-2 text-xl`}
                    />
                  </div>
                  {!emailValido && usuario.usuario !== "" && (
                    <p className="text-red-500 text-sm mt-1">
                      Digite um e-mail válido.
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-zain text-xl w-full mb-3 sm:mb-4">
                  <label htmlFor="foto" className="font-medium text-white">
                    Foto
                  </label>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-gray-400">
                      <FaImage />
                    </span>
                    <input
                      type="text"
                      id="foto"
                      name="foto"
                      placeholder="URL da imagem"
                      value={usuario.foto}
                      onChange={atualizarEstado}
                      className="pl-10 pr-3 py-2 w-full rounded bg-[#1a1a1a] border border-gray-400 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-lime-600 text-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col font-zain text-xl w-full mb-3 sm:mb-4">
                  <label htmlFor="senha" className="font-medium text-white">
                    Senha
                  </label>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-gray-400">
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
                      className={`pl-10 pr-3 py-2 w-full rounded bg-[#1a1a1a] border 
          ${
            usuario.senha.length === 0 || usuario.senha.length >= 8
              ? "border-gray-400 focus:ring-lime-600"
              : "border-red-500 focus:ring-red-500"
          } 
          placeholder-gray-400 focus:outline-none focus:ring-2 text-xl`}
                    />
                  </div>
                  {usuario.senha.length > 0 && usuario.senha.length < 8 && (
                    <p className="text-red-500 text-sm mt-1">
                      A senha deve ter pelo menos 8 caracteres.
                    </p>
                  )}
                </div>

                <div className="flex flex-col font-zain text-xl w-full mb-3 sm:mb-4">
                  <label
                    htmlFor="confirmarsenha"
                    className="font-medium text-white"
                  >
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-gray-400">
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
                      className={`pl-10 pr-3 py-2 w-full rounded bg-[#1a1a1a] border 
          ${
            confirmaSenha === "" || confirmaSenha === usuario.senha
              ? "border-gray-400 focus:ring-lime-600"
              : "border-red-500 focus:ring-red-500"
          } 
          placeholder-gray-400 focus:outline-none focus:ring-2 text-xl`}
                    />
                  </div>
                  {confirmaSenha !== "" && confirmaSenha !== usuario.senha && (
                    <p className="text-red-500 text-sm mt-1">
                      As senhas não coincidem.
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-3 sm:gap-4 font-marko mt-4">
                  <button
                    type="reset"
                    className="w-full md:w-1/2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-400 hover:to-red-400 
                 transition-all duration-300 text-white font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2 rounded-full"
                    onClick={retornar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full md:w-1/2 bg-gradient-to-r from-lime-500 to-green-600 hover:from-green-600 hover:to-lime-500 
                 transition-all duration-300 text-white font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2 rounded-full"
                  >
                    {isLoading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
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
                    className="h-30 w-auto rounded-lg cursor-pointer"
                  />
                </Link>

                <Link to="/home">
                  <img
                    src={prontoelevehorizontal}
                    alt="Logo Pequena"
                    className="h-10 w-auto cursor-pointer"
                  />
                </Link>
                <p className="text-white text-sm sm:text-xl font-marko max-w-[90%]">
                  Solução moderna e inclusiva para você!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;

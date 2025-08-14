import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import "./Cadastro.css";
import logo from "../../assets/logo.png";
import prontoelevehorizontal from "../../assets/prontoelevehorizontal.png"
import { FaLock, FaImage } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

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
        ToastAlerta("Usuário cadastrado com sucesso meu amigo!", "sucesso");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        ToastAlerta("Deu erro ao cadastrar o usuário... :/", "erro");
      }
    } else {
      ToastAlerta(
        "Dados do usuário inconsistentes... Verifique as informações do cadastro :/",
        "erro"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="relative w-full min-h-screen">
        <div className="background-cadastro">
          <div className="absolute inset-0 bg-black opacity-70"></div>

          {/* Posicionamento de formulário e texto*/}
          <div className="absolute inset-0 min-h-screen flex justify-center items-center">
            {/* Texto a direita */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
              <form
                className="bg-[#111111]/80 backdrop-blur-md shadow-lg rounded-xl py-8 px-10 w-full max-w-[500px] text-white"
                onSubmit={cadastrarNovoUsuario}
              >
                <h2 className="text-white font-marko text-4xl font-semibold text-center mb-4">
                  Cadastre-se
                </h2>
                <p className="text-center font-zain text-2xl m-0">
                  Já possui uma conta?{" "}
                  <Link to="/login" className="text-lime-600 hover:underline">
                    Entre
                  </Link>
                </p>
                <div className="flex flex-col font-zain text-xl w-full">
                  <label htmlFor="nome" className="block mb-2 text-xl font-medium text-white">
                    Nome
                  </label>
                  <div className="relative mb-4">
                    <FaRegUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome"
                    className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                    value={usuario.nome}
                    onChange={(e) => atualizarEstado(e)}
                  />
                </div>
                </div>
                <div className="flex flex-col font-zain text-xl w-full">
                  <label htmlFor="usuario" className="block mb-2 text-xl font-medium text-white">
                    Usuario
                  </label>
                  <div className="relative mb-4">
                    <MdOutlineAlternateEmail className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="E-mail"
                    className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                    value={usuario.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                  </div>
                </div>
                <div className="flex flex-col font-zain text-xl w-full">
                  <label htmlFor="foto" className="block mb-2 text-xl font-medium text-white">
                    Foto URL
                  </label>
                  <div className="relative mb-4">
                  <FaImage className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    id="foto"
                    name="foto"
                    placeholder="URL da Foto"
                    className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                    value={usuario.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                  </div>
                </div>
                <div className="flex flex-col font-zain text-xl w-full">
                  <label htmlFor="senha" className="block mb-2 text-xl font-medium text-white">
                    Senha
                  </label>
                  <div className="relative mb-4">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Senha"
                    className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                    value={usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                  </div>
                </div>
                <div className="flex flex-col font-zain text-xl w-full">
                  <label
                    htmlFor="confirmarSenha"
                    className="block mb-2 text-xl font-medium text-white"
                  >
                    Confirmar Senha
                  </label>
                  <div className="relative mb-4">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                    value={confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleConfirmarSenha(e)
                    }
                  />
                  </div>
                </div>
                <div className="flex justify-around font-marko w-full gap-8">
                  <button
                    type="reset"
                    className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-400 hover:to-red-400 transition-all duration-300 text-white font-semibold text-xl px-4 py-2 rounded-full"
                    onClick={retornar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-green-600 hover:to-lime-500 transition-all duration-300 text-white font-semibold text-xl px-4 py-2 rounded-full"

                  >
                    {isLoading ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                      />
                    ) : (
                      <span>Cadastrar</span>
                    )}
                  </button>
                </div>
              </form>
              <div>
                <div className="flex flex-col items-center gap-2">
                  <img src={logo} alt="Logo" className="h-30 w-auto rounded-lg" />
                  <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-10 w-auto" />
                </div>
                <p className="text-white text-xl font-marko text-relaxed pt-3 text-center">
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

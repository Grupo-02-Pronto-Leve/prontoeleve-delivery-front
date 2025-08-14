/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

        <div className="absolute inset-0 flex justify-center items-center p-2 sm:p-4">
          <div className="w-full max-w-6xl grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8 items-center">

            {/* Formulário */}
            <form
              className="bg-[#111111]/80 backdrop-blur-md shadow-lg rounded-xl py-4 px-3 sm:px-8 w-full text-white"
              onSubmit={cadastrarNovoUsuario}
            >
              <h2 className="font-marko text-xl sm:text-3xl font-semibold text-center mb-2 sm:mb-3">
                Cadastre-se
              </h2>
              <p className="text-center font-zain text-sm sm:text-lg mb-3 sm:mb-4">
                Já possui uma conta?{" "}
                <Link to="/login" className="text-lime-600 hover:underline">
                  Entre
                </Link>
              </p>

              {/* Campos */}
              {[
                { id: "nome", icon: <FaRegUser />, placeholder: "Nome" },
                { id: "usuario", icon: <MdOutlineAlternateEmail />, placeholder: "E-mail" },
                { id: "foto", icon: <FaImage />, placeholder: "URL da Foto" },
                { id: "senha", icon: <FaLock />, placeholder: "Senha", type: "password" },
                { id: "confirmarSenha", icon: <FaLock />, placeholder: "Confirmar Senha", type: "password", confirm: true }
              ].map((field) => (
                <div key={field.id} className="flex flex-col font-zain text-sm sm:text-base w-full mb-3 sm:mb-4">
                  <label htmlFor={field.id} className="mb-1 sm:mb-2 font-medium text-white">
                    {field.placeholder}
                  </label>
                  <div className="relative">
                    <span className="absolute top-2.5 left-3 text-gray-400">{field.icon}</span>
                    <input
                      type={field.type || "text"}
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      className="pl-10 pr-3 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600 text-xs sm:text-sm"
                      value={
                        field.confirm ? confirmaSenha : (usuario as any)[field.id]
                      }
                      onChange={(e) =>
                        field.confirm ? handleConfirmarSenha(e) : atualizarEstado(e)
                      }
                    />
                  </div>
                </div>
              ))}

              {/* Botões */}
              <div className="flex flex-col md:flex-row justify-center gap-3 sm:gap-4 font-marko mt-4">
                <button
                  type="reset"
                  className="w-full md:w-1/2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-400 hover:to-red-400 transition-all duration-300 text-white font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2 rounded-full"
                  onClick={retornar}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full md:w-1/2 bg-gradient-to-r from-lime-500 to-green-600 hover:from-green-600 hover:to-lime-500 transition-all duration-300 text-white font-semibold text-sm sm:text-lg px-3 sm:px-4 py-2 rounded-full"
                >
                  {isLoading ? (
                    <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
                  ) : (
                    <span>Cadastrar</span>
                  )}
                </button>
              </div>
            </form>

            {/* Coluna de imagens */}
            <div className="flex flex-col items-center text-center gap-3 sm:gap-4 px-2 sm:px-4">
              <img src={logo} alt="Logo" className="h-16 sm:h-32 max-w-full rounded-lg" />
              <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-6 sm:h-10 max-w-full" />
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

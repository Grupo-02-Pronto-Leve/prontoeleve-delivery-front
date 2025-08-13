import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
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

          {/* Posicionamento de formulário e texto*/}
          <div className="absolute inset-0 min-h-screen flex justify-center items-center">
            {/* Texto a direita */}
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
              <form
                className="bg-[#111111] rounded-lg py-6 px-12 w-full max-w-[500px] box-border text-[#fff] mx-auto"
                onSubmit={cadastrarNovoUsuario}
              >
                <h2 className="text-white text-4xl font-semibold text-center mb-4">
                  Crie uma conta
                </h2>
                <p className="text-center m-0">
                  Já possui uma conta?{" "}
                  <Link to="/login" className="text-lime-600 hover:underline">
                    Entre
                  </Link>
                </p>
                <div className="flex flex-col w-full">
                  <label htmlFor="nome" className="block mb-2 text-sm font-medium text-white">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome"
                    className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-2"
                    value={usuario.nome}
                    onChange={(e) => atualizarEstado(e)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-white">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Usuario"
                    className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-2"
                    value={usuario.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="foto" className="block mb-2 text-sm font-medium text-white">
                    Foto
                  </label>
                  <input
                    type="text"
                    id="foto"
                    name="foto"
                    placeholder="Foto"
                    className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-2"
                    value={usuario.foto}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="senha" className="block mb-2 text-sm font-medium text-white">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Senha"
                    className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-2"
                    value={usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="confirmarSenha"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    className="w-full px-4 py-2 rounded bg-[#111111] border border-[#333333] placeholder-[#333333] focus:outline-none focus:ring-2 focus:ring-lime-600 mb-4"
                    value={confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleConfirmarSenha(e)
                    }
                  />
                </div>
                <div className="flex justify-around w-full gap-8">
                  <button
                    type="reset"
                    className="w-full bg-red-400 hover:bg-red-500 transition text-black font-semibold text-xl p-2 rounded-full"
                    onClick={retornar}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-lime-600 hover:bg-lime-700 transition text-black font-semibold text-xl px-3 py-2 rounded-full"
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
                <h1 className="text-5xl text-lime-600 font-bold mb-2 text-center mt-8">
                  Pronto & Leve
                </h1>
                <p className="text-white text-xl text-center">
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

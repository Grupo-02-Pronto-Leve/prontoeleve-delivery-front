/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import type Categoria from "../../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import { LuCakeSlice, LuSalad, LuSoup, LuVegan } from "react-icons/lu";
import { TbMeat, TbMilkshake } from "react-icons/tb";
import { RiDrinks2Line } from "react-icons/ri";
import { PiCarrot } from "react-icons/pi";
import { CiBowlNoodles } from "react-icons/ci";
import { GiFruitBowl, GiSandwich, } from "react-icons/gi";
import { MdOutlineFastfood } from "react-icons/md";
import { CgCoffee } from "react-icons/cg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../../navbar/Navbar";

function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    const scrollRef = useRef<HTMLDivElement>(null);

    const iconOptions = [
    { name: "Vegetariano", icon: LuVegan },
    { name: "Salada", icon: LuSalad },
    { name: "Proteína", icon: TbMeat },
    { name: "Vegano", icon: PiCarrot },
    { name: "Bebidas Naturais" , icon: RiDrinks2Line },
    { name: "Sobremesas", icon: LuCakeSlice},
    { name: "Massas Integrais", icon: CiBowlNoodles},
    { name: "Wraps", icon: GiSandwich},
    { name: "Snacks Saudáveis", icon: MdOutlineFastfood},
    { name: "Doces Fit", icon: GiFruitBowl},
    { name: "Smoothies", icon: TbMilkshake},
    { name: "Café da Manhã", icon: CgCoffee},
    { name: "Sopas", icon: LuSoup}
    ];

      const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Precisa estar logadooo!!", "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/categorias")
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta("A Categoria foi atualizada com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta("Deu erro ao atualizar a categoria .. :/", "erro")
                }

            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('A Categoria foi cadastrada com sucesso meu amigo :D!', "sucesso")
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar a categoria .. :/', "erro")
                }

            }
        }

        setIsLoading(false)
        retornar()
    }   

  return (
    <>
      {id === undefined ? (
        // ✅ Modal para cadastro
        <div className=" flex items-center justify-center">
          <div className="w-full max-w-md h-[500px] bg-[#1F2025] p-6 rounded-lg shadow-lg overflow-y-auto">
            <h1 className="text-2xl text-center mb-4 text-white">Cadastrar Categoria</h1>

            <form className="flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-white text-sm">Nome da Categoria</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome da categoria"
                  className="border-2 border-gray-600 rounded-md p-2 bg-gray-900 text-white text-sm"
                  value={categoria.nome}
                  onChange={atualizarEstado}
                />
              </div>

              {/* Descrição */}
              <div className="flex flex-col gap-2">
                <label htmlFor="descricao" className="text-white text-sm">Descrição da Categoria</label>
                <input
                  type="text"
                  name="descricao"
                  placeholder="Descreva aqui sua categoria"
                  className="border-2 border-gray-600 rounded-md p-2 bg-gray-900 text-white text-sm"
                  value={categoria.descricao}
                  onChange={atualizarEstado}
                />
              </div>

              {/* Ícones */}
              <div className="flex flex-col gap-2 relative max-h-[120px] overflow-hidden">
                <label className="text-white text-sm">Ícone da Categoria</label>

                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 shadow-md rounded-full p-1 z-10 hover:bg-gray-700"
                >
                  <FaChevronLeft className="text-white text-sm" />
                </button>

                <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4">
                  {iconOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <div
                        key={opt.name}
                        onClick={() => setCategoria({ ...categoria, nome: opt.name })}
                        className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer flex-shrink-0 transition w-20 ${
                          categoria.nome === opt.name
                            ? "border-green-500 bg-green-700"
                            : "border-gray-600 bg-gray-800"
                        }`}
                      >
                        <Icon className="text-green-400 text-lg" />
                        <span className="text-xs mt-1 text-center text-white">{opt.name}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 shadow-md rounded-full p-1 z-10 hover:bg-gray-700"
                >
                  <FaChevronRight className="text-white text-sm" />
                </button>
              </div>

              {/* Botões */}
              <div className="flex gap-2 justify-center mt-4">
                <button
                  className="rounded-md text-white bg-green-400 hover:bg-green-600 px-6 py-1 text-sm"
                  type="submit"
                  onClick={() => navigate(-1)}
                >
                  {isLoading ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  ) : "Cadastrar"}
                </button>

                <button
                  type="button"
                  onClick={retornar}
                  className="rounded-md text-white bg-red-500 hover:bg-red-700 px-6 py-1 text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
      // Página para edição
      <div className="min-h-screen bg-[#15161B] flex flex-col items-center justify-start">
        <div className="w-full">
          <Navbar />
        </div>

        <div className="container flex flex-col items-center justify-center mx-auto mt-12">
          <h1 className="text-3xl md:text-4xl text-center my-6 text-white">Editar Categoria</h1>

          <form
            className="w-full max-w-md h-[500px] flex flex-col gap-4 bg-[#1F2025] p-6 rounded-lg shadow-lg overflow-y-auto"
            onSubmit={gerarNovaCategoria}
          >
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="text-white text-sm">Nome da Categoria</label>
              <input
                type="text"
                name="nome"
                placeholder="Nome da categoria"
                className="border-2 border-gray-600 rounded-md p-2 bg-gray-900 text-white text-sm"
                value={categoria.nome}
                onChange={atualizarEstado}
              />
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-2">
              <label htmlFor="descricao" className="text-white text-sm">Descrição da Categoria</label>
              <input
                type="text"
                name="descricao"
                placeholder="Descreva aqui sua categoria"
                className="border-2 border-gray-600 rounded-md p-2 bg-gray-900 text-white text-sm"
                value={categoria.descricao}
                onChange={atualizarEstado}
              />
            </div>

            {/* Ícones */}
            <div className="flex flex-col gap-2 relative max-h-[120px] overflow-hidden">
              <label className="text-white text-sm">Ícone da Categoria</label>

              <button
                type="button"
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 shadow-md rounded-full p-1 z-10 hover:bg-gray-700"
              >
                <FaChevronLeft className="text-white text-sm" />
              </button>

              <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4">
                {iconOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.name}
                      onClick={() => setCategoria({ ...categoria, nome: opt.name })}
                      className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer flex-shrink-0 transition w-20 ${
                        categoria.nome === opt.name
                          ? "border-green-500 bg-green-700"
                          : "border-gray-600 bg-gray-800"
                      }`}
                    >
                      <Icon className="text-green-400 text-lg" />
                      <span className="text-xs mt-1 text-center text-white">{opt.name}</span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 shadow-md rounded-full p-1 z-10 hover:bg-gray-700"
              >
                <FaChevronRight className="text-white text-sm" />
              </button>
            </div>

            {/* Botões */}
            <div className="flex gap-2 justify-center mt-4">
              <button
                className="rounded-md text-white bg-green-400 hover:bg-green-600 px-6 py-1 text-sm"
                type="submit"
              >
                {isLoading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : "Atualizar"}
              </button>

              <button
                type="button"
                onClick={retornar}
                className="rounded-md text-white bg-red-500 hover:bg-red-700 px-6 py-1 text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
);
}


export default FormCategoria;
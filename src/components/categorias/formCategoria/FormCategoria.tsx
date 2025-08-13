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
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>

      <form className="w-full md:w-8/12 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        
        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da Categoria</label>
          <input
            type="text"
            placeholder="Nome da categoria:"
            name="nome"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.nome}
            onChange={atualizarEstado}
          />
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da Categoria</label>
          <input
            type="text"
            placeholder="Descreva aqui sua categoria:"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.descricao}
            onChange={atualizarEstado}
          />
        </div>

        {/* Ícones com setas */}
        <div className="flex flex-col gap-2 relative">
          <label>Ícone da Categoria</label>

          {/* Seta Esquerda */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          {/* Lista de ícones */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-8"
          >
            {iconOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.name}
                  onClick={() => setCategoria({ ...categoria, nome: opt.name })}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer flex-shrink-0 transition w-24 ${
                    categoria.nome === opt.name
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                >
                  <Icon className="text-green-500 text-xl" />
                  <span className="text-xs mt-1 text-center">{opt.name}</span>
                </div>
              );
            })}
          </div>

          {/* Seta Direita */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>

        {/* Botão submit */}
        <button
          className="rounded text-slate-100 bg-green-400 hover:bg-green-800 w-1/2 py-2 mx-auto flex justify-center"
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
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
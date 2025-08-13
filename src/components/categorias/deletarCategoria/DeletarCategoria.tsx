/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { RotatingLines } from "react-loader-spinner"
import React from "react"
import { FaLeaf } from "react-icons/fa"
import type { IconType } from "react-icons"
import { CgCoffee } from "react-icons/cg"
import { CiBowlNoodles } from "react-icons/ci"
import { GiSandwich, GiFruitBowl } from "react-icons/gi"
import { LuVegan, LuSalad, LuCakeSlice, LuSoup } from "react-icons/lu"
import { MdOutlineFastfood } from "react-icons/md"
import { PiCarrot } from "react-icons/pi"
import { RiDrinks2Line } from "react-icons/ri"
import { TbMeat, TbMilkshake } from "react-icons/tb"

function DeletarCategoria() {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    const iconMap: Record<string, IconType> = {
      "Vegetariano": LuVegan,
      "Salada": LuSalad,
      "Proteína": TbMeat,
      "Vegano": PiCarrot,
      "Bebidas Naturais": RiDrinks2Line, 
      "Sobremesas": LuCakeSlice,
      "Massas Integrais": CiBowlNoodles,
      "Wraps": GiSandwich,
      "Snacks Saudáveis": MdOutlineFastfood,
      "Doces Fit": GiFruitBowl,
      "Smoothies": TbMilkshake,
      "Café da Manhã": CgCoffee,
      "Sopas": LuSoup,
    };

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Tu precisa estar logado...", "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta("Categoria deletada com sucesso meu amigo!", "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta("Deu erro enquanto deletava a categoria... :/", "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }
    
    return (
    <div className="container max-w-3/12 mx-auto">
        <h1 className="text-4xl text-center my-6 font-bold text-gray-800">
        Deletar Categoria
        </h1>

        <p className="text-center font-medium text-gray-600 mb-6">
        Você tem certeza de que deseja apagar a categoria a seguir?
        </p>

        <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
        {/* <header className="w-full py-3 px-6 text-black font-bold text-xl text-center rounded-t-lg">
            Categoria
        </header> */}

        <div className="text-green-500 text-5xl my-4">
            {/* Ícone da categoria */}
            {iconMap[categoria.nome] ? (
            React.createElement(iconMap[categoria.nome])
            ) : (
            <FaLeaf />
            )}
        </div>

        <h3 className="font-semibold text-lg text-center">{categoria.nome}</h3>
        <p className="text-gray-500 text-sm text-center">{categoria.descricao}</p>

        <div className="flex gap-3 mt-6 w-full">
            <button
            className="flex-1 text-slate-100 bg-red-400 hover:bg-red-600 py-2 rounded-lg transition"
            onClick={retornar}
            >
            Não
            </button>

            <button
            className="flex-1 text-slate-100 bg-green-400 hover:bg-green-500 flex items-center justify-center py-2 rounded-lg transition"
            onClick={deletarCategoria}
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
                <span>Sim</span>
            )}
            </button>
        </div>
        </div>
    </div>
    );
}
export default DeletarCategoria

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { CheckCircle, XCircle } from "@phosphor-icons/react"
import {ToastAlerta} from "../../../utils/ToastAlerta"

function DeletarProduto() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/')
        }
    }, [token, navigate])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Produto apagado com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar o produto.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/produtos")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>

            <div className='flex flex-col justify-between rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white'>
                <header
                    className='flex items-center justify-between py-3 px-6 text-floresta font-semibold text-2xl'>
                    Produto
                    <img
                        src="https://img.icons8.com/?size=100&id=zVnY4LoD0Omq&format=png&color=52b788"
                        alt="ícone"
                        className="h-8 w-8 ml-auto "
                    />
                </header>
                <hr className="border-slate-300 mx-4" />
                <div className="p-5 flex-1 text-gray-500">
                    <p className='text-xl h-full font-semibold text-floresta'>{produto.nome}</p>
                    <p>{produto.descricao}</p>
                </div>
                <div className="flex gap-3 px-4 pb-4 pt-2">
                    <button
                        className='w-full flex items-center justify-between py-1.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-90 transition-all shadow-sm'
                        onClick={retornar}>
                        Não
                        <XCircle size={32} />
                    </button>
                    <button
                        className='w-full flex items-center justify-between py-1.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-teal-400 to-ligth-green hover:from-ligth-green hover:to-teal-400 transition-all shadow-sm'
                        onClick={deletarProduto}>

                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                        <CheckCircle size={32} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto

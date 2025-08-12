import { useContext, useEffect, useState, type ChangeEvent } from "react";
import type Categoria from "../../../models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

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
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
            <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Nome da Categoria</label>
                    <input
                        type="text"
                        placeholder="Nome da categoria:"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição da Categoria</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui sua categoria:"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                              hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;
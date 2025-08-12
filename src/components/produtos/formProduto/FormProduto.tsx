/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import {ToastAlerta} from "../../../utils/ToastAlerta";

function FormProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, descricao: '', } as Categoria)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info");
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Produto atualizado com sucesso', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar o Produto', "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Produto cadastrado com sucesso', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar o Produto', "erro");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoCategoria = categoria.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título do Produto</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-menta rounded p-2 focus:outline-none focus:border-ligth-green focus:ring-2 focus:ring-ligth-green"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Descrição do Produto</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name="texto"
                        required
                        className="border-2 border-menta rounded p-2 focus:outline-none focus:border-ligth-green focus:ring-2 focus:ring-ligth-green"
                        value={produto.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select name="categoria" id="categoria" className='border-2 border-menta rounded p-2 focus:outline-none focus:border-ligth-green focus:ring-2 focus:ring-ligth-green'
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione uma Categoria</option>

                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.descricao}</option>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-gradient-to-r from-teal-400 to-ligth-green hover:from-ligth-green hover:to-teal-400 shadow-sm
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoCategoria}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormProduto;

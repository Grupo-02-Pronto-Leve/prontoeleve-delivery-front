/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Navbar from "../../navbar/Navbar";
import { HiOutlineArrowLeft } from "react-icons/hi"; // <-- para o botão Voltar

function FormProduto() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, descricao: "" } as Categoria);
    const [produto, setProduto] = useState<Produto>({} as Produto);

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    async function buscarCategorias() {
        try {
            await buscar("/categorias", setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado", "info");
            navigate("/");
        }
    }, [token, navigate]);

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) buscarProdutoPorId(id);
    }, [id]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate("/produtos");
    }

    function validarCamposObrigatorios(): string[] {
        const faltando: string[] = [];

        if (!produto.nome?.trim()) faltando.push("Nome do Produto");
        if (!produto.descricao?.trim()) faltando.push("Descrição do Produto");

        const precoNumber = Number(produto.preco);
        if (!precoNumber || isNaN(precoNumber) || precoNumber <= 0) faltando.push("Preço");

        if (!categoria?.id || Number(categoria.id) === 0) faltando.push("Categoria do Produto");

        return faltando;
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        // validação rápida
        const faltantes = validarCamposObrigatorios();
        if (faltantes.length) {
            ToastAlerta(`Por favor, preencha: ${faltantes.join(", ")}.`, "info");
            return;
        }

        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Produto atualizado com sucesso", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao atualizar o Produto", "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Produto cadastrado com sucesso", "sucesso");
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao cadastrar o Produto", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }
    

    // const carregandoCategoria = categoria.descricao === ""; alterei a função para disabled={isLoading}

    // estilos base
    const inputBase =
        "w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/60 " +
        "focus:outline-none focus:ring-2 focus:ring-ligth-green focus:border-ligth-green transition";
    const labelBase = "text-sm font-medium text-neutral-200";

    return (
        <>
            <Navbar />
            <section className="min-h-[80vh] bg-gradient-to-b from-neutral-950 via-neutral-600 to-black py-10">
                <div className="mx-auto max-w-6xl px-4">
                    {/* Topo: botão Voltar */}
                    <div className="mb-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)} // ou: navigate('/produtos')
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/10 hover:bg-white/20
                         px-4 py-2 text-sm text-white transition"
                        >
                            <HiOutlineArrowLeft />
                            Voltar
                        </button>
                    </div>

                    {/* Header do formulário */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                            {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
                        </h1>
                        <p className="mt-2 text-neutral-300">
                            Preencha os campos abaixo para {id !== undefined ? "atualizar" : "criar"} o item do seu cardápio.
                        </p>
                    </div>

                    {/* Card do formulário, deixei meio transparente */}
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-6 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <form className="flex flex-col gap-5" onSubmit={gerarNovoProduto}>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nome" className={labelBase}>
                                        Nome do Produto
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ex.: Brownie Fit de Cacau"
                                        name="nome"
                                        required
                                        className={inputBase}
                                        value={produto.nome}
                                        onChange={atualizarEstado}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="descricao" className={labelBase}>
                                        Descrição do Produto
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Descreva o produto em uma frase atraente"
                                        name="descricao"
                                        required
                                        className={inputBase}
                                        value={produto.descricao}
                                        onChange={atualizarEstado}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="preco" className={labelBase}>
                                            Preço
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Ex.: 19.90"
                                            name="preco"
                                            required
                                            className={inputBase}
                                            value={produto.preco || ""}
                                            onChange={atualizarEstado}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="disponivel" className={labelBase}>
                                            Disponível?
                                        </label>
                                        <select
                                            name="disponivel"
                                            value={String(produto.disponivel)}
                                            onChange={(e) =>
                                                setProduto({
                                                    ...produto,
                                                    disponivel: e.target.value === "true",
                                                })
                                            }
                                            className={inputBase}
                                        >
                                            <option className="text-black font-semibold" value="true">
                                                Sim
                                            </option>
                                            <option className="text-black font-semibold" value="false">
                                                Não
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="foto" className={labelBase}>
                                        URL da Foto
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Cole o link da imagem do produto"
                                        name="foto"
                                        className={inputBase}
                                        value={produto.foto}
                                        onChange={atualizarEstado}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className={labelBase}>Categoria do Produto</label>
                                    <select
                                        name="categoria"
                                        id="categoria"
                                        className={inputBase}
                                        defaultValue=""
                                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                                    >
                                        <option value="" disabled>
                                            Selecione uma Categoria
                                        </option>
                                        {categorias.map((categoria) => (
                                            <option className="text-black" key={categoria.id} value={categoria.id}>
                                                {categoria.nome ?? categoria.descricao}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Ações */}
                                <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
                                    <button
                                        type="submit"
                                        className="rounded-2xl disabled:opacity-100 cursor-pointer bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg shadow-emerald-500/20
                                                text-white font-bold w-full sm:w-48 py-3 flex justify-center"
                                        disabled={isLoading}
                                        aria-busy={isLoading}
                                        aria-live="polite"
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
                                            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
                                        )}
                                    </button>

                                    {/* Botão Cancelar: aqui vou navegar de volta XD */}
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)} // ou navigate('/produtos')
                                        className="rounded-2xl border cursor-pointer border-white/10 bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110
                                                text-white font-semibold w-full sm:w-48 py-3 flex justify-center transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>

                            {/* Preview */}
                            <aside className="hidden md:flex">
                                <div className="w-full h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center">
                                    <div className="w-full">
                                        <div className="overflow-hidden rounded-2xl shadow-xl">
                                            <img
                                                src={
                                                    produto.foto && produto.foto.trim() !== ""
                                                        ? produto.foto
                                                        : "https://bubuyog.com.br/images/foto-indisponivel.png"
                                                }
                                                alt={produto.nome || "Prévia do produto"}
                                                className="h-56 w-full object-cover"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-xl font-bold text-white truncate">
                                                {produto.nome || "Nome do produto"}
                                            </h3>
                                            <p className="text-neutral-300 line-clamp-2">
                                                {produto.descricao || "Descrição do produto…"}
                                            </p>
                                            <div className="mt-3 inline-flex items-center gap-2">
                                                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                                                    {categoria?.nome || categoria?.descricao || "Categoria"}
                                                </span>
                                                {produto.preco ? (
                                                    <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-300">
                                                        R$ {Number(produto.preco).toFixed(2)}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FormProduto;

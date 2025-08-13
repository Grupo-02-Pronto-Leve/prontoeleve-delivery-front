/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Navbar from "../../navbar/Navbar";
import { HiOutlineArrowLeft } from "react-icons/hi";

function DeletarProduto() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [produto, setProduto] = useState<Produto>({} as Produto);

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("403")) {
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
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    async function deletarProduto() {
        setIsLoading(true);
        try {
            await deletar(`/produtos/${id}`, {
                headers: { Authorization: token },
            });
            ToastAlerta("Produto apagado com sucesso", "sucesso");
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao deletar o produto.", "erro");
            }
        }
        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/produtos");
    }

    return (
        <>
            <Navbar />
            <section className="min-h-[80vh] bg-gradient-to-b from-neutral-950 via-neutral-600 to-black py-10">
                <div className="mx-auto max-w-5xl px-4">
                    {/* Voltar para a /categorias */}
                    <div className="mb-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 px-4 py-2 text-sm text-white transition"
                        >
                            <HiOutlineArrowLeft />
                            Voltar
                        </button>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                            Deletar Produto
                        </h1>
                        <p className="mt-2 text-neutral-300">
                            Você tem certeza de que deseja apagar o produto a seguir?
                        </p>
                    </div>

                    {/* Card glass */}
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-6 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Lado esquerdo: detalhes + ações */}
                            <div className="space-y-5">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <h2 className="text-white font-semibold text-lg">Produto</h2>
                                    <p className="mt-3 text-xl font-bold text-white">
                                        {produto.nome || "—"}
                                    </p>
                                    <p className="mt-1 text-neutral-300">
                                        {produto.descricao || ""}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {produto?.categoria?.nome || produto?.categoria?.descricao ? (
                                            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                                                {produto.categoria?.nome ?? produto.categoria?.descricao}
                                            </span>
                                        ) : null}

                                        {typeof produto.preco !== "undefined" ? (
                                            <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-300">
                                                R$ {Number(produto.preco || 0).toFixed(2)}
                                            </span>
                                        ) : null}

                                        {produto.disponivel === false ? (
                                            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-red-300">
                                                Indisponível
                                            </span>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                                    <p className="text-neutral-300 text-sm">
                                        Esta ação é <span className="text-white font-semibold">permanente</span> e não poderá
                                        ser desfeita.
                                    </p>
                                </div>

                                {/* Ações */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onClick={retornar}
                                        className="rounded-2xl border cursor-pointer border-white/10 bg-white/10 hover:bg-white/20
                               text-white font-semibold w-full sm:w-48 py-3 flex items-center justify-center gap-2 transition"
                                    >
                                        <XCircle size={22} />
                                        Não, manter
                                    </button>

                                    <button
                                        type="button"
                                        onClick={deletarProduto}
                                        disabled={isLoading}
                                        className="rounded-2xl cursor-pointer bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-150
                               disabled:opacity-80 text-white font-bold w-full sm:w-48 py-3 flex items-center justify-center gap-2 transition"
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
                                            <>
                                                <CheckCircle size={22} />
                                                Sim, excluir
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Lado direito: preview */}
                            <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="overflow-hidden rounded-2xl shadow-xl">
                                    <img
                                        src={
                                            produto.foto && produto.foto.trim() !== ""
                                                ? produto.foto
                                                : "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                                        }
                                        alt={produto.nome || "Prévia do produto"}
                                        className="h-64 w-full object-cover"
                                    />
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DeletarProduto;

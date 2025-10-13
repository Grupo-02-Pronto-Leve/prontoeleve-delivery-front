/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type Produto from "../../models/Produto";
import { buscar } from "../../services/Service";
// import { Comment } from "react-loader-spinner";
import CardLojaProduto from "./CardLojaProduto";
import CartModal from "../../pages/cart/CartModal";
import CartFooterButton from "../../pages/cart/CartFooterButton";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import Navbar from "../navbar/Navbar";
import { PacmanLoader } from "react-spinners";
import BarraBusca from "../produtos/buscaRestricao/BarraBusca";

export default function Cardapio() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token ?? "";

    async function buscarProdutos(termo?: string) {
            try {
                setLoading(true); // inicia loading
                const url = termo
                    ? `/produtos/restricao?restricao=${encodeURIComponent(termo)}`
                    : `/produtos`;
    
                await buscar(url, setProdutos, {
                    headers: { Authorization: token },
                });
                } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout();
                } 
            } finally {
                setLoading(false); // finaliza loading
            }
        }

    async function carregar() {
        setLoading(true);
        try {
            await buscar("/produtos", setProdutos, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            const msg = String(error);
            if (msg.includes("401") || msg.includes("403")) {
                ToastAlerta("Faça login para visualizar os produtos.", "info");
                handleLogout?.();
                navigate("/");
            } else {
                ToastAlerta("Não foi possível carregar os produtos.", "erro");
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Navbar />
            <section className="min-h-[80vh] bg-gradient-to-b from-neutral-950 via-neutral-600 to-black py-10 pb-20">
            <div className="mx-auto max-w-6xl px-4">
                <div className="text-left mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Produtos</h1>
                    <p className="mt-2 text-neutral-300">Escolha seus itens e adicione ao carrinho.</p>
                </div>
                <BarraBusca onBuscar={buscarProdutos} />

                {loading ? (
                    <div className="flex items-center justify-center h-[40vh]">
                        <PacmanLoader color="#80ed99" size={50} />
                    </div>
                ) : produtos.length === 0 ? (
                    <div className="h-[30vh] flex items-center justify-center">
                        <p className="text-neutral-300">Nenhum produto encontrado.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {produtos.map((p) => (
                            <CardLojaProduto key={p.id} produto={p} />
                        ))}
                    </div>
                )}
            </div>

            <CartModal />
            <CartFooterButton />
        </section>
        </div>
    );
}

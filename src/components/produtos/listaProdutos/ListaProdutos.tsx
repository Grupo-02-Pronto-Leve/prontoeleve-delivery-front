/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardProdutos from "../cardProdutos/CardProdutos";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import {ToastAlerta} from "../../../utils/ToastAlerta";

function ListaProdutos() {

    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true); // adiciona o estado loading

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

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

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        buscarProdutos()
    }, [])

    return (
        <>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse dark:border-gray-700"
                        >
                            <div className="h-48 bg-gray-300 rounded-sm mb-4 dark:bg-gray-700"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 dark:bg-gray-700"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 dark:bg-gray-700"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {produtos.map((produto) => (
                        <CardProdutos key={produto.id} produto={produto} />
                    ))}
                </div>
            )}
        </>
    );
}

export default ListaProdutos;

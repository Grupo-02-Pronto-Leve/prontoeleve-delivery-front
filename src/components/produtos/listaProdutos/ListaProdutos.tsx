/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardProdutos from "../cardProdutos/CardProdutos";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
// import { Comment } from "react-loader-spinner";
import { PacmanLoader } from "react-spinners";
import {ToastAlerta} from "../../../utils/ToastAlerta";
import BarraBusca from "../buscaRestricao/BarraBusca";
// import ModalProduto from "../modalProduto/ModalProduto";

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

    // return (
    //     <>
    //     {/* <ModalProduto /> */}
    //         {produtos.length === 0 && (
    //             <div className="flex mt-30 justify-center h-screen">
    //                 <PacmanLoader color="#80ed99" size={50} />
    //                 {/* <Comment
    //                     visible={true}
    //                     height="80"
    //                     width="80"
    //                     ariaLabel="comment-loading"
    //                     wrapperStyle={{}}
    //                     wrapperClass="comment-wrapper mx-auto"
    //                     color="#fff"
    //                     backgroundColor="#80ed99"
    //                 /> */}
    //             </div>
    //         )}
    //         <div className="flex flex-col items-center w-full my-4"></div>
    //         <BarraBusca onBuscar={buscarProdutos} />
            
    //         <div className="flex justify-center w-full my-4">
    //             <div className="container flex flex-col">
    //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //                     {produtos.map((produto) => (
    //                         <CardProdutos key={produto.id} produto={produto} />
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );

    return (
        <>
            <BarraBusca onBuscar={buscarProdutos} />

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

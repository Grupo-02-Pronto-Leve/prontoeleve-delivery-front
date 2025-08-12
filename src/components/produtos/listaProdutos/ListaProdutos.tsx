/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import CardProdutos from "../cardProdutos/CardProdutos";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import { Comment } from "react-loader-spinner";
import {ToastAlerta} from "../../../utils/ToastAlerta";

function ListaProdutos() {

    const navigate = useNavigate();

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {
                headers: {
                    Authorization: token,
                },
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
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

    return (
        <>
            {produtos.length === 0 && (
                <div className="flex items-center justify-center h-screen">
                    <Comment
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="comment-loading"
                        wrapperStyle={{}}
                        wrapperClass="comment-wrapper mx-auto"
                        color="#fff"
                        backgroundColor="#80ed99"
                    />
                </div>
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {produtos.map((produto) => (
                            <CardProdutos key={produto.id} produto={produto} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaProdutos;

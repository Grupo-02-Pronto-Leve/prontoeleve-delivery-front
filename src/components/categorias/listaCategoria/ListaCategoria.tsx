/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
//import { PacmanLoader } from "react-spinners";
// import { DNA } from "react-loader-spinner";
import CardCategoria from "../cardCategoria/CardCategoria";

function ListaCategorias() {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState<Categoria[]>([])
        const [loading, setLoading] = useState(true);

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarCategorias() {
        try {
                setLoading(true);
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setLoading(false); // desativa o loading
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado, bro!',"info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()    
    }, [categorias.length])
    
    // return (
    //     <>
    //     {categorias.length === 0 && (
    //     //     <DNA
    //     //     visible={true}
    //     //     height="200"
    //     //     width="200"
    //     //     ariaLabel="dna-loading"
    //     //     wrapperStyle={{}}
    //     //     wrapperClass="dna-wrapper mx-auto"
    //     // />
    //     <div className="flex mt-10 justify-center items-center h-screen">
    //         <PacmanLoader color="#80ed99" size={50} />
    //     </div>
    //     )}
    //         <div className="flex justify-center w-full my-4 px-2 sm:px-4">
    //             <div className="container flex flex-col">
    //                 <div className="grid grid-cols-1 
    //                 xs:grid-cols-2
    //                 sm:grid-cols-2 
    //                 md:grid-cols-3 
    //                 lg:grid-cols-4 
    //                 xl:grid-cols-5 
    //                 gap-4 sm:gap-6
    //                 w-full">
    //                 {categorias.map((categoria) => (
    //                         <CardCategoria key={categoria.id} categoria={categoria} />
    //                     ))}
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
    return (
  <>
    {loading ? (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700"
            //card skeleton 
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
    ) : (
    <div className="flex justify-center w-full my-4 px-1 sm:px-4">
        <div className="container flex flex-col">
                    <div className="grid grid-cols-1 
                    xs:grid-cols-2
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                    gap-2 sm:gap-5
                    w-full">
        {categorias.map((categoria) => (
          <CardCategoria key={categoria.id} categoria={categoria} />
        ))}
        </div>
        </div>
    </div>
    )}
  </>
);

}

export default ListaCategorias;
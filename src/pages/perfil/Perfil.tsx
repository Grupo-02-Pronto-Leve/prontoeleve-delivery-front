import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Navbar from "../../components/navbar/Navbar"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { HiOutlineArrowLeft } from "react-icons/hi"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === '') {
      ToastAlerta("Opa, opa... Você precisa estar logado!", "erro")
      navigate('/')
    }
  }, [usuario.token])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#15161B] p-6 md:p-10">
        <div className="mx-auto max-w-5xl px-4">
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
        </div>
        <div className="mx-auto my-10 max-w-5xl rounded-2xl bg-[#23272D] p-6 md:p-10">
          <div
            className="flex items-center justify-between gap-6 border-b border-white/10 pb-6"
            style={{ boxShadow: "0 10px 16px -12px rgba(0,0,0,0.5)" }}
          >
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                {usuario?.nome || "Seu Restaurante"}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-zinc-400">
                Restaurante Saudável
              </p>
            </div>

            <img
              src={
                usuario.foto && usuario.foto.trim() !== ""
                  ? usuario.foto
                  : "https://ik.imagekit.io/6j8wkskq7/default-avatar.jpg?updatedAt=1755124908038"
              }
              alt={`Foto do(a) ${usuario?.nome || "usuário"}`}
              loading="lazy"
              className="h-20 w-20 rounded-full object-cover ring-2 ring-white/10 md:h-24 md:w-24"
            />
          </div>

          <div className="mt-8">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <div className="rounded-xl border border-white/10 p-5 md:col-span-2 h-full 
              flex flex-col justify-evenly">
                <h2 className="text-xl text-white">Perfil</h2>
                <p className="text-zinc-200">
                  R. Aroaba, 333 - Vila Leopoldina, São Paulo - SP, 05315-020
                </p>
                <div className="flex flex-row text-zinc-200 gap-5">
                  <span>Nome:</span>
                  <span>
                    {usuario?.nome || "Nome da Sua Empresa"}
                  </span>
                </div>
                <div className="flex flex-row text-zinc-200 gap-5">
                  <span>Email:</span>
                  <span>
                    {usuario?.usuario ? `${usuario.usuario}` : "suaempresa@email.com"}
                  </span>
                </div>
                <div className="flex flex-row text-zinc-200 gap-5">
                  <span>Telefone:</span>
                  <span>(11) 4002-8922</span>
                </div>
                <div className="flex flex-row text-zinc-200 gap-5">
                  <span>Horário:</span>
                  <span>Seg–Sex, 11h–20h</span>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 md:col-span-1 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6237.836108188402!2d-46.734164272732116!3d-23.53338481203936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sboali!5e0!3m2!1spt-BR!2sbr!4v1755107923463!5m2!1spt-BR!2sbr"
                  loading="lazy"
                  className="w-full h-full min-h-[40vh] border-0 contrast-110"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de localização"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
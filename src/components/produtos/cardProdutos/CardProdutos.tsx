import { PencilLine, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  const foto =
    produto.foto && produto.foto.trim() !== ""
      ? produto.foto
      // verificar a foto que vamos deixar padrao
      : "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop";

  const categoria =
    produto.categoria?.nome ?? produto.categoria?.descricao ?? "Categoria";

  const precoBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(produto.preco ?? 0));

  const btnBase =
    "w-full inline-flex items-center justify-between gap-2 py-2 px-5 rounded-xl text-white font-medium transition shadow-sm";

  return (
    <article
      className="
        group rounded-3xl overflow-hidden
        border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white
        shadow-[0_12px_40px_-18px_rgba(0,0,0,0.6)]
        hover:shadow-[0_12px_40px_-28px_rgba(16,185,129,0.35)]
        hover:border-emerald-400/20
        transition-all duration-300
      "
    >
      {/* Imagem + chips */}
      <div className="relative">
        <img
          src={foto}
          alt={produto.nome || "Produto"}
          loading="lazy"
          className="h-48 w-full object-cover transition group-hover:scale-[1.02]"
        />

        <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between
                        bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <span className="rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-1 text-xs">
            {categoria}
          </span>
          <span className="rounded-full bg-emerald-600/90 px-4 py-1 text-xs font-bold">
            {precoBRL}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="font-semibold text-lg">{produto.nome}</h3>
        <p className="mt-1 text-neutral-300">{produto.descricao}</p>
      </div>

      {/* Ações */}
      <div className="px-4 pb-4 pt-1 flex gap-3">
        <Link to={`/editarproduto/${produto.id}`} className="flex-1">
          <button
            type="button"
            className={`${btnBase} cursor-pointer bg-gradient-to-r from-teal-400 to-ligth-green hover:from-ligth-green hover:to-teal-400`}
          >
            Editar
            <PencilLine size={18} weight="light" />
          </button>
        </Link>

        <Link to={`/deletarproduto/${produto.id}`} className="flex-1">
          <button
            type="button"
            className={`${btnBase} cursor-pointer bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110`}
          >
            Deletar
            <Trash size={18} weight="regular" />
          </button>
        </Link>
      </div>
    </article>
  );
}

export default CardProdutos;

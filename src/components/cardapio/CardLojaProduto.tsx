import type Produto from "../../models/Produto";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCartSimple } from "@phosphor-icons/react";

export default function CardLojaProduto({ produto }: { produto: Produto }) {
  const { add } = useCart();

  const foto =
    produto.foto && produto.foto.trim() !== ""
      ? produto.foto
      : "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop";

  const categoria = produto.categoria?.nome ?? produto.categoria?.descricao ?? "Categoria";
  const precoBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .format(Number(produto.preco ?? 0));

  return (
    <article className="group rounded-3xl overflow-hidden border bg-white/95 border-black/5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] transition">
      <div className="relative">
        <img src={foto} alt={produto.nome} className="h-48 w-full object-cover transition group-hover:scale-[1.02]" />
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <span className="rounded-full bg-white/90 text-slate-800 text-xs font-medium px-3 py-1">{categoria}</span>
          <span className="rounded-full bg-emerald-600 text-white text-xs font-semibold px-3 py-1">{precoBRL}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-slate-900 font-semibold text-lg">{produto.nome}</h3>
        <p className="mt-1 text-slate-600">{produto.descricao}</p>
      </div>

      <div className="px-4 pb-4 pt-1">
        <button
          onClick={() => add(produto)}
          className="w-full inline-flex items-center justify-center gap-2 py-2 px-5 rounded-xl text-white font-medium bg-gray-900 hover:brightness-110"
        >
          Adicionar
          <ShoppingCartSimple size={18} />
        </button>
      </div>
    </article>
  );
}

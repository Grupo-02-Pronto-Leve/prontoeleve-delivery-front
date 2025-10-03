import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { X } from "@phosphor-icons/react";
import { ToastAlerta } from "../../utils/ToastAlerta";

function CartModal() {
  const {
    items, total, inc, dec, remove, clear,
    isModalOpen, close, checkoutWhatsApp, restauranteAberto
  } = useCart();

  const [endereco, setEndereco] = useState("");

  const totalFmt = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function finalizar() {
    if (!restauranteAberto) {
      ToastAlerta("Ops! O restaurante está fechado agora.", "erro");
      return;
    }
    if (!items.length) return;
    if (!endereco.trim()) {
      ToastAlerta("Digite seu endereço completo.", "info");
      return;
    }
    checkoutWhatsApp(endereco);
    clear();
    setEndereco("");
    close();
  }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[99] bg-black/60 flex items-center justify-center px-4" onClick={close}>
      <div
        className="min-w-[90%] md:min-w-[600px] bg-white rounded-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-center font-bold text-2xl">Meu carrinho</h2>
          <button className="text-slate-500 hover:text-slate-700" onClick={close}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
          {items.map((i) => (
            <div key={i.id} className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-medium truncate">{i.nome}</p>
                <p className="text-sm text-slate-600">R$ {Number(i.preco).toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-white border" onClick={() => dec(i.id)}>-</button>
                <span className="w-6 text-center">{i.quantity}</span>
                <button className="px-2 py-1 rounded bg-white border" onClick={() => inc(i.id)}>+</button>

                <button
                  className="ml-3 text-sm text-red-600 hover:underline"
                  onClick={() => remove(i.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}

          {!items.length && <p className="text-center text-slate-500">Seu carrinho está vazio.</p>}
        </div>

        <div className="mt-4">
          <p className="font-bold">Total: <span>{totalFmt}</span></p>
        </div>

        <div className="mt-4">
          <p className="font-bold">Endereço de Entrega:</p>
          <input
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Digite seu endereço completo..."
            className="w-full border-2 p-2 rounded mt-1"
          />
        </div>

        <div className="flex items-center justify-between mt-5">
          <button className="text-slate-600" onClick={close}>Fechar</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
            onClick={finalizar}
            disabled={!items.length}
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal
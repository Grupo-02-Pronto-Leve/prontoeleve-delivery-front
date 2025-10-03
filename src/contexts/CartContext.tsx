/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type Produto from "../models/Produto";

type CartItem = {
  id: number;
  nome: string;
  preco: number;
  foto?: string;
  quantity: number;
};

type CartState = { items: CartItem[] };
type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "INC"; id: number }
  | { type: "DEC"; id: number }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  total: number;
  add: (produto: Produto) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  isModalOpen: boolean;
  checkoutWhatsApp: (endereco: string) => void;
  restauranteAberto: boolean;
}>({} as any);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "INC":
      return { items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i)) };
    case "DEC":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      };
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = "cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartState) : { items: [] };
    } catch {
      return { items: [] };
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const total = useMemo(
    () => state.items.reduce((acc, i) => acc + Number(i.preco) * i.quantity, 0),
    [state.items]
  );
  const count = useMemo(() => state.items.reduce((acc, i) => acc + i.quantity, 0), [state.items]);

  // Horário de funcionamento (ex.: 18h–22h)
  const restauranteAberto = useMemo(() => {
    const h = new Date().getHours();
    return h >= 0 && h < 24;
  }, []);

  function add(produto: Produto) {
    dispatch({
      type: "ADD",
      payload: {
        id: Number(produto.id),
        nome: produto.nome,
        preco: Number(produto.preco ?? 0),
        foto: produto.foto,
        quantity: 1,
      },
    });
  }

  function checkoutWhatsApp(endereco: string) {
    if (!state.items.length) return;

    const itens = state.items
      .map((i) => `${i.nome} (Qtd: ${i.quantity}) — R$ ${(i.preco * i.quantity).toFixed(2)}`)
      .join(" | ");

    const totalFmt = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const msg = encodeURIComponent(`${itens}\nTotal: ${totalFmt}\nEndereço: ${endereco}`);
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || "+353833202062";

    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total,
        count,
        add,
        inc: (id) => dispatch({ type: "INC", id }),
        dec: (id) => dispatch({ type: "DEC", id }),
        remove: (id) => dispatch({ type: "REMOVE", id }),
        clear: () => dispatch({ type: "CLEAR" }),
        open: () => setIsModalOpen(true),
        close: () => setIsModalOpen(false),
        isModalOpen,
        checkoutWhatsApp,
        restauranteAberto,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

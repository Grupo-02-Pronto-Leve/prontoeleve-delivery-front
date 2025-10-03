import { ShoppingCart } from "@phosphor-icons/react";
import { useCart } from "../../contexts/CartContext";

function CartFooterButton() {
  const { count, open } = useCart();

  return (
    <footer className="w-full m-auto bg-rose-500 py-2 fixed bottom-0 z-40 flex items-center justify-center">
      <button
        className="flex items-center gap-2 text-white font-bold"
        onClick={open}
      >
        (<span>{count}</span>) Veja meu carrinho
        <ShoppingCart size={18} weight="bold" />
      </button>
    </footer>
  );
}

export default CartFooterButton

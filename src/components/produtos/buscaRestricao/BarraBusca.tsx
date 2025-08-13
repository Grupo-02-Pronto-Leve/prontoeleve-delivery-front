import { useState } from "react";

interface BarraBuscaProps {
  onBuscar: (termo: string) => void;
}

export default function BarraBusca({ onBuscar }: BarraBuscaProps) {
  const [termo, setTermo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar(termo);
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="flex items-center justify-center w-full max-w-2xl mx-auto my-6 px-2"
    >
    <div className="flex w-full shadow-md rounded-full overflow-hidden border border-green-300 bg-white">
        <input
        type="text"
        placeholder="Buscar por restrição alimentar (ex: sem glúten, vegano...)"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        className="flex-1 px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-gray-400"
        />
        <button
        type="submit"
        className="px-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold transition-all duration-200"
        >
        Buscar
        </button>
    </div>
    </form>
  );
}

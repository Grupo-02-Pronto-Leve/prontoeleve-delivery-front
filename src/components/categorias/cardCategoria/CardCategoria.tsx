import { Link } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import type { IconType } from "react-icons";
import { LuCakeSlice, LuSalad, LuSoup, LuVegan } from "react-icons/lu";
import { TbMeat, TbMilkshake } from "react-icons/tb";
import { RiDrinks2Line } from "react-icons/ri";
import { PiCarrot, PiForkKnifeBold } from "react-icons/pi";
import { CiBowlNoodles } from "react-icons/ci";
import { GiFruitBowl, GiSandwich } from "react-icons/gi";
import { MdOutlineFastfood } from "react-icons/md";
import { CgCoffee } from "react-icons/cg";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface CardCategoriasProps{
    categoria: Categoria
}

const iconMap: Record<string, IconType> = {
  "Vegetariano": LuVegan,
  "Salada": LuSalad,
  "Proteína": TbMeat,
  "Vegano": PiCarrot,
  "Bebidas Naturais": RiDrinks2Line, 
  "Sobremesas": LuCakeSlice,
  "Massas Integrais": CiBowlNoodles,
  "Wraps": GiSandwich,
  "Snacks Saudáveis": MdOutlineFastfood,
  "Doces Fit": GiFruitBowl,
  "Smoothies": TbMilkshake,
  "Café da Manhã": CgCoffee,
  "Sopas": LuSoup,
};

function CardCategoria({ categoria }: CardCategoriasProps) {
      const Icon = iconMap[categoria.nome] || PiForkKnifeBold; // Ícone padrão
      const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition w-64">
      {/* Botão de três pontinhos */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-full hover:bg-gray-100 transition"
        >
          <BsThreeDotsVertical size={20} />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <Link
            to={`/editarcategoria/${categoria.id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-green-500 hover:bg-gray-100"
          >
            <FiEdit size={16} /> Editar
          </Link>

          <Link
            to={`/deletarcategoria/${categoria.id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            <FiTrash2 size={16} /> Deletar
          </Link>
          </div>
        )}
      </div>

      {/* Conteúdo principal do card */}
      <div className="text-green-500 text-5xl mb-4">
        <Icon />
      </div>
      <h3 className="font-semibold text-lg text-center">{categoria.nome}</h3>
      <p className="text-gray-500 text-sm text-center">{categoria.descricao}</p>
    </div>
  );
}

export default CardCategoria



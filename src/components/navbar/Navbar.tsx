import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineHome, HiOutlinePhone, HiOutlineSelector } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCake, HiOutlineUserCircle } from "react-icons/hi2";

function Navbar() {
  const [open, setOpen] = useState(false);

  const item =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/90 text-neutral-200 hover:text-white hover:bg-neutral-700 transition text-sm";
  const active =
    "ring-2 ring-white/10 text-white bg-neutral-700";

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2">
          <img
            src="https://ik.imagekit.io/6j8wkskq7/pngaaa.com-5478411.png?updatedAt=1755011742929"
            alt="Logo"
            className="h-11 w-11 rounded-lg"
          />
          <span className="text-white font-semibold tracking-tight">PRONTO & LEVE</span>
        </Link>

        {/* Menu central (desktop) */}
        <ul className="hidden md:flex items-center gap-4">
          <li>
            <NavLink to="/home" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlineHome />
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlineBolt />
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlineUserCircle />
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlinePhone />
              Contato
            </NavLink>
          </li>
          <li>
            <NavLink to="/categorias" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlineSelector />
              Categorias
            </NavLink>
          </li>
          <li>
            <NavLink to="/produtos" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlineCake />
              Produtos
            </NavLink>
          </li>
        </ul>

        {/* CTA (desktop) */}
        <Link
          to="/login"
          className="hidden md:inline-flex px-5 py-2 rounded-full bg-lime-700 text-white font-semibold hover:bg-lime-600 transition"
        >
          LOGIN
        </Link>

        {/* versao responsiva para celular, xd */}
        <button
          onClick={() => setOpen(s => !s)}
          className="md:hidden text-white"
          aria-label="Abrir menu"
        >
          <div className="w-6 space-y-1.5">
            <span className="block h-0.5 bg-white"></span>
            <span className="block h-0.5 bg-white"></span>
            <span className="block h-0.5 bg-white"></span>
          </div>
        </button>
      </nav>

      {/* menu hamburguer para a versão celular, *--* */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-4 grid gap-3">
            <NavLink onClick={() => setOpen(false)} to="/home" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Início</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/sobre" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Sobre</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/services" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Serviços</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Contato</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/categorias" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Categorias</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/produtos" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Produtos</NavLink>
            <Link onClick={() => setOpen(false)} to="/login" className="hidden md:inline-flex px-5 py-2 rounded-full bg-lime-700 text-white font-semibold hover:bg-lime-600 transition"
            >LOGIN</Link>
          </div>

        </div>
      )}
    </header>
  );
}

export default Navbar;

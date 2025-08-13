/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineHome, HiOutlinePhone, HiOutlineSelector } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCake } from "react-icons/hi2";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import prontoeleve from "../../assets/prontoeleve.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const item =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/90 text-neutral-200 hover:text-white hover:bg-neutral-700 transition text-sm";
  const active =
    "ring-2 ring-white/40 text-white bg-neutral-700";

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token;
  const firstName = usuario?.nome ? usuario.nome.split(" ")[0] : "";
  const avatar =
    (usuario as any)?.foto ||
    "https://ik.imagekit.io/6j8wkskq7/default-avatar.jpg?updatedAt=1755124908038" + encodeURIComponent(firstName || "User");

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-auto rounded-lg" />
          <span className="text-white font-semibold tracking-tight flex items-center gap-2">
            <img src={prontoeleve} alt="Pronto&Leve" className="h-11 w-auto" />
          </span>
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
            <NavLink to="/contato" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
              <HiOutlinePhone />
              Contato
            </NavLink>
          </li>

          {/* Mostrar apenas se estiver logado */}
          {token && (
            <>
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
            </>
          )}
        </ul>

        {/* Área à direita (desktop) */}
        {token ? (
          <div className="hidden md:flex items-center gap-4">
            <span className="text-white font-medium">Olá, {firstName}</span>

            {/* Avatar -> /perfil */}
            <Link to="/perfil" className="shrink-0" aria-label="Ir para o perfil">
              <img
                src={avatar}
                alt="Foto do perfil"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20 hover:ring-white/40 transition"
              />
            </Link>

            <button
              onClick={handleLogout}
              className="px-5 cursor-pointer py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              SAIR
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:inline-flex px-5 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-[#7ED957] transition"
          >
            LOGIN
          </Link>
        )}

        {/* Botão hamburger (mobile) */}
        <button
          onClick={() => setOpen((s) => !s)}
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

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-4 grid gap-3">

            {/* Header do mobile com avatar quando logado */}
            {token && (
              <Link
                to="/perfil"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl bg-neutral-800/80 text-white"
              >
                <img
                  src={avatar}
                  alt="Foto do perfil"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">Olá, {firstName}</span>
                  <span className="text-xs text-zinc-300">Ver perfil</span>
                </div>
              </Link>
            )}

            <NavLink onClick={() => setOpen(false)} to="/home" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Início</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/sobre" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Sobre</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contato" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Contato</NavLink>

            {/* Apenas logado */}
            {token && (
              <>
                <NavLink onClick={() => setOpen(false)} to="/categorias" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Categorias</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/produtos" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Produtos</NavLink>
              </>
            )}

            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-5 cursor-pointer py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                SAIR
              </button>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="px-5 py-2 rounded-full bg-lime-700 text-white font-semibold hover:bg-lime-600 transition"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

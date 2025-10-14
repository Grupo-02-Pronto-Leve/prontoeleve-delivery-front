/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineHome, HiOutlinePhone, HiOutlineSelector } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCake } from "react-icons/hi2";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
import prontoeleve from "../../assets/prontoeleve.png";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { Perfil } from "../../models/Perfil";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const item =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/90 text-neutral-200 hover:text-white hover:bg-neutral-700 transition text-sm";
  const active = "ring-2 ring-white/40 text-white bg-neutral-700";

const { usuario, handleLogout } = useContext(AuthContext);
const token = usuario?.token;
const perfil = usuario?.perfil?.toString().toUpperCase().replace("ROLE_", ""); 
const firstName = usuario?.nome ? usuario.nome.split(" ")[0] : "";
const avatar =
  (usuario as any)?.foto && (usuario as any)?.foto.trim() !== ""
    ? (usuario as any)?.foto
    : "https://ik.imagekit.io/6j8wkskq7/default-avatar.jpg?updatedAt=1755124908038";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
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

        {token && (
          <>
            {perfil === Perfil.EMPRESA && (
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

            {perfil === Perfil.CLIENTE && (
              <li>
                <NavLink to="/cardapio" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>
                  <ShoppingCartIcon />
                  Cardápio
                </NavLink>
              </li>
            )}
          </>
        )}

        </ul>

        {/* Área à direita (desktop) */}
        {token ? (
          <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
            <span className="text-white font-medium">Olá, {firstName}</span>

            {/* Avatar como botão do menu do usuário */}
            <button
              type="button"
              onClick={() => setProfileOpen((s) => !s)}
              className="shrink-0 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-label="Abrir menu do usuário"
            >
              <img
                src={avatar}
                alt="Foto do perfil"
                className="h-10 w-10 rounded-full hover:shadow hover:shadow-green-900 cursor-pointer object-cover"
              />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur shadow-xl p-2"
              >
                <div className="px-3 py-2 text-xs text-zinc-400">Conectado como</div>
                <div className="px-3 pb-2 text-sm text-zinc-200 truncate">{usuario?.usuario}</div>
                <div className="my-1 h-px bg-white/10" />
                <Link
                  to="/perfil"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10"
                >
                  Ver perfil
                </Link>
                <button
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false);
                    ToastAlerta('Você saiu com sucesso.', 'info');
                    handleLogout();
                    navigate("/", { replace: true });
                  }}
                  className="mt-1 w-full px-3 py-2 rounded-lg text-left text-sm text-white bg-red-600 hover:bg-red-700"
                >
                  Sair
                </button>
              </div>
            )}
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

            {token && (
              <>
                {perfil === Perfil.EMPRESA && (
                  <>
                    <NavLink onClick={() => setOpen(false)} to="/categorias" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Categorias</NavLink>
                    <NavLink onClick={() => setOpen(false)} to="/produtos" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Produtos</NavLink>
                  </>
                )}
                {perfil === Perfil.CLIENTE && (
                  <NavLink onClick={() => setOpen(false)} to="/cardapio" className={({ isActive }) => `${item} ${isActive ? active : ""}`}>Cardápio</NavLink>
                )}
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

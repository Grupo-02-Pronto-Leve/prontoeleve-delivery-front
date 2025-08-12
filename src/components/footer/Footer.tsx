import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <>
      <div className="bg-[#e6ffe6]">
        <div className="max-w-6xl mx-auto min-h-[260px] py-16
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10
        place-items-center text-center">

          <div>
            <h2 className="font-katibeh font-bold text-5xl mt-2 my-4 text-slate-800">
              Delivery
            </h2>
            <p className="max-w-md">
              Solução moderna e inclusiva para pedir e receber comida saudável de forma prática e inteligente.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-green-800 mb-2">
              Para Vendedores
            </h3>
            <ul className="space-y-1">
              <li><a href="/categorias" className="hover:text-green-500">Categorias</a></li>
              <li><a href="/produtos" className="hover:text-green-500">Produtos</a></li>
              <li><a href="#" className="hover:text-green-500">Suporte ao vendedor</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-green-800 mb-2">
              Nos acompanhe
            </h3>
            <div className="flex justify-center gap-4 mt-2">
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/naah-carvalho/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <LinkedinLogo size={28} weight="bold" />
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <InstagramLogo size={28} weight="bold" />
              </a>
              <a aria-label="Facebook" href="https://www.facebook.com/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FacebookLogo size={28} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-white/80 py-6 border-t border-gray-100 bg-[#0F5C11]">
        &copy; {data} Delivery. Todos os direitos reservados.
      </div>
    </>
  );
}

export default Footer;
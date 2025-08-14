import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import prontoelevehorizontal from "../../assets/prontoelevehorizontal.png"

function Footer() {
  const data = new Date().getFullYear();

  return (
    <>
      <div className="bg-black/95 backdrop-blur text-white">
        <div
          className="max-w-7xl mx-auto min-h-[260px] py-12 
          grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
        >
          {/* Coluna 1 e 2: Logo + Texto */}
          <div className="flex items-start gap-8 col-span-2">
            {/* Logo */}
            <div className="flex flex-col items-start gap-2 min-w-[120px]">
              <img src={logo} alt="Logo" className="h-20 w-auto rounded-lg" />
              <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-5 w-auto" />
            </div>

            {/* Texto ao lado da logo */}
            <div className="max-w-md text-justify">
              <p className="text-lg leading-relaxed">
                Solução moderna e inclusiva para pedir e receber comida saudável de forma prática e inteligente.
              </p>
            </div>
          </div>

          {/* Coluna 3: Links + Redes sociais */}
          <div className="flex flex-col items-end text-right gap-8">
            {/* Links */}
            <div>
              <h3 className="text-base font-semibold text-[#7ED957] mb-3">
                Para Vendedores
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categorias" className="hover:text-[#7ED957]">
                    Categorias
                  </Link>
                </li>
                <li>
                  <Link to="/produtos" className="hover:text-[#7ED957]">
                    Produtos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Redes sociais */}
            <div>
              <h3 className="text-base font-semibold text-gray-300 mb-3">
                Nos acompanhe
              </h3>
              <div className="flex justify-end gap-5">
                <a
                  href="https://github.com/Grupo-02-Turma-JavaScript-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=12598&format=png&color=FFFFFF"
                    alt="GitHub"
                    className="h-8 w-8"
                  />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=projetos.gen.grupo2@gmail.com&su=Contato&body=Olá,%20quero%20saber%20mais."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=rUgzXdXFnhmg&format=png&color=FFFFFF"
                    alt="E-mail"
                    className="h-8 w-8"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-white/80 py-6 border-t border-gray-700 bg-[#0C0C0C]">
        &copy; {data} Delivery. Todos os direitos reservados.
      </div>
    </>
  );

}

export default Footer;
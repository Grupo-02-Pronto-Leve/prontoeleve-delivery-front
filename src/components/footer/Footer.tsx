import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import prontoeleve from "../../assets/prontoeleve.png"

function Footer() {
  const data = new Date().getFullYear();

  return (
    <>
<<<<<<< Updated upstream
      <div className="bg-black/95 backdrop-blur text-white">
        <div
          className="max-w-7xl mx-auto min-h-[260px] py-12 
          grid grid-cols-1 md:grid-cols-3 gap-10 items-center"
        >
          {/* Coluna 1 e 2: Logo + Texto */}
          <div className="flex items-start gap-8 col-span-2">
            {/* Logo */}
            <div className="flex flex-col items-start gap-2 min-w-[120px]">
              <img src={logo} alt="Logo" className="h-20 w-auto rounded-lg" />
              <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-5 w-auto" />
            </div>
=======
    <footer className="bg-black/95 backdrop-blur text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-2">
        
        {/* Coluna 1 - Logo + Texto */}
        <div className="md:pr-5">
          <Link to="/home" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="h-12 w-auto rounded-lg" />
            <img src={prontoeleve} alt="Logo Pequena" className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-gray-300 text-justify leading-relaxed">
            Solução moderna e inclusiva para pedir e receber comida saudável de forma prática e inteligente.
          </p>
        </div>
>>>>>>> Stashed changes

        {/* Coluna 2 - Empresa */}
        <div className="md:pl-40">
          <h3 className="text-base font-semibold text-[#7ED957] mb-3">Empresa</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:text-[#7ED957]">Home</Link></li>
            <li><Link to="/sobre" className="hover:text-[#7ED957]">Sobre</Link></li>
            <li><Link to="/contato" className="hover:text-[#7ED957]">Contato</Link></li>
          </ul>
        </div>

        {/* Coluna 3 - Para Vendedores */}
        <div className="md:pl-10">
          <h3 className="text-base font-semibold text-[#7ED957] mb-3">Para Vendedores</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categorias" className="hover:text-[#7ED957]">Categorias</Link></li>
            <li><Link to="/produtos" className="hover:text-[#7ED957]">Produtos</Link></li>
          </ul>
        </div>

        {/* Coluna 4 - Redes Sociais */}
        <div>
          <h3 className="text-base text-end text-[#7ED957] font-semibold mb-3">Redes Socias</h3>
          <div className="flex justify-end gap-4">
            <a
              href="https://github.com/Grupo-02-Turma-JavaScript-07"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="https://img.icons8.com/?size=100&id=12598&format=png&color=FFFFFF"
                alt="GitHub"
                className="h-7 w-7"
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
                className="h-7 w-7"
              />
            </a>
          </div>
            <p className="text-xs text-gray-500 mt-4">
            © {data} Pronto & Leve. Todos os direitos reservados.
          </p>
        </div>
      </div>
            {/* <div className="text-center items-center text-xs text-white/80 py-3 border-t border-green-900 bg-[#0C0C0C]">
        &copy; {data} Delivery. Todos os direitos reservados.
      </div> */}
    </footer>
    </>
  );

}

export default Footer;
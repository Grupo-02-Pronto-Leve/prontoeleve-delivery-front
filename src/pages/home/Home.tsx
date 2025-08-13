import Navbar from "../../components/navbar/Navbar";
import "../../index.css";
import prontoelevehorizontal from "../../assets/prontoelevehorizontal.png"
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <div className="fundoHome min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-center px-4">
        <div className="bg-green-700 bg-opacity-80 rounded-md px-4 py-2 mb-4 font-marko text-white text-xs uppercase tracking-widest">
             <img src={prontoelevehorizontal} alt="Logo Pequena" className="h-5 w-auto filter brightness-0 invert" />
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold font-marko text-white max-w-4xl mb-4">
          Delivery ágil para impulsionar o seu negócio
        </h1>

        <p className="font-marko text-sm text-white max-w-xl mb-8">
          Uma plataforma feita para você vender mais, simplificar operações e
          encantar seus clientes.
        </p>
        
        <Link to="/login">
        <button
          type="button"
          className="font-marko bg-green-700 px-6 py-2 rounded-full text-white text-sm hover:bg-olive-800 transition cursor-pointer"
        >
          CONHEÇA AGORA
        </button>
        </Link>
      </div>

      <section className="bg-black text-white py-30 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-marko">
          Por que vender com a gente?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
          <div className="card-green p-6 text-center">
            <h3 className="font-bold text-xl mb-2 font-marko text-white">
              Gestão de pedidos fácil e rápida
            </h3>
            <p className="text-gray-200 text-sm">
              Controle e organize todos os pedidos em tempo real, sem
              complicação.
            </p>
          </div>

          <div className="card-green p-6 text-center">
            <h3 className="font-bold text-xl mb-2 font-marko text-white">
              Pagamentos seguros e rápidos
            </h3>
            <p className="text-gray-200 text-sm">
              Receba seus pagamentos de forma confiável e ágil, sem atrasos.
            </p>
          </div>

          <div className="card-green p-6 text-center">
            <h3 className="font-bold text-xl mb-2 font-marko text-white">
              Mais visibilidade para o seu negócio
            </h3>
            <p className="text-gray-200 text-sm">
              Atraia novos clientes e destaque sua marca na nossa plataforma.
            </p>
          </div>

          <div className="card-green p-6 text-center">
            <h3 className="font-bold text-xl mb-2 font-marko text-white">
              Relatórios e insights de vendas
            </h3>
            <p className="text-gray-200 text-sm">
              Analise os dados do seu negócio e tome decisões mais inteligentes.
            </p>
          </div>

          <div className="card-green p-6 text-center">
            <h3 className="font-bold text-xl mb-2 font-marko text-white">
              Suporte dedicado
            </h3>
            <p className="text-gray-200 text-sm">
              Nossa equipe está sempre pronta para te ajudar quando precisar.
            </p>
          </div>

          <div className="card-green p-6 text-center">
            <h3 className="font-bold text-xl mb-2 font-marko text-white">
              Apoio ao seu crescimento
            </h3>
            <p className="text-gray-200 text-sm">
              Estamos ao seu lado para te ajudar a expandir seu negócio com
              sucesso.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-marko">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform transform overflow-hidden">
            <div className="flex items-center justify-center w-70 h-70 mx-auto mt-6 mb-4 rounded-full shadow-xl overflow-hidden">
              <img
                src="/plataforma.png"
                alt="Cadastre seu negócio"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2 font-marko">
                Cadastre seu negócio
              </h3>
              <p className="text-sm text-gray-300">
                Crie seu perfil na plataforma e configure seu cardápio
                rapidamente.
              </p>
            </div>
          </div>

          <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform transform overflow-hidden">
            <div className="flex items-center justify-center w-70 h-70 mx-auto mt-6 mb-4 rounded-full shadow-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7989073/pexels-photo-7989073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Receba pedidos em tempo real"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2 font-marko">
                Receba pedidos em tempo real
              </h3>
              <p className="text-sm text-gray-300">
                Tenha controle total dos pedidos, notificações instantâneas e
                fácil gestão.
              </p>
            </div>
          </div>

          <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform transform overflow-hidden">
            <div className="flex items-center justify-center w-70 h-70 mx-auto mt-6 mb-4 rounded-full shadow-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7706584/pexels-photo-7706584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Entregue com nossa logística integrada"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl mb-2 font-marko">
                Entregue com nossa logística integrada
              </h3>
              <p className="text-sm text-gray-300">
                Nossa rede de entregadores garante que seus pedidos cheguem
                rápido e com segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-marko">
          O que dizem nossos parceiros
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="comentario-card">
            <span className="quote-mark">“</span>
            <p className="comentario">
              Desde que comecei a usar a plataforma, minhas vendas aumentaram
              40%.
            </p>
            <span className="cliente">
              João,{" "}
              <span className="nomeNegocio">Restaurante Sabor Caseiro</span>
            </span>
          </div>

          <div className="comentario-card">
            <span className="quote-mark">“</span>
            <p className="comentario">
              O sistema é simples, rápido e o suporte é excelente.
            </p>
            <span className="cliente">
              Maria, <span className="nomeNegocio">Mercado Bom Preço</span>
            </span>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-12 px-6">
        <h2 className="text-3xl font-bold font-marko text-center mb-8">Nossos números</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center py-10">
          <div>
            <span className="text-green-500 text-4xl font-bold">500+</span>
            <p className="mt-2">Restaurantes parceiros</p>
          </div>
          <div>
            <span className="text-green-500 text-4xl font-bold">50k+</span>
            <p className="mt-2">Pedidos entregues</p>
          </div>
          <div>
            <span className="text-green-500 text-4xl font-bold">98%</span>
            <p className="mt-2">Satisfação dos clientes</p>
          </div>
          <div>
            <span className="text-green-500 text-4xl font-bold">24/7</span>
            <p className="mt-2">Suporte disponível</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-marko">
          Pronto para crescer com a gente?
        </h2>
        <p className="text-gray-100 mb-8 text-lg">
          Junte-se aos nossos parceiros e leve seu negócio para o próximo nível.
        </p>
        <Link to="/cadastro">
        <button className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          Seja um parceiro agora
        </button>
        </Link>
      </section>
    </>
  );
}

export default Home;

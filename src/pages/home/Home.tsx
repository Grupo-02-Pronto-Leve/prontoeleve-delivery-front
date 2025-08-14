import Navbar from "../../components/navbar/Navbar";
import "../../index.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="fundoHome min-h-screen w-full flex flex-col items-center justify-center text-center bg-cover bg-center px-4 bg-black/60 bg-cover">
        <div className="bg-green-700 bg-opacity-80 rounded-md px-4 py-1 mb-4 font-marko text-white text-xs uppercase tracking-widest">
          Pronto&Leve
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold font-marko text-white max-w-4xl mb-4">
          Delivery ágil para impulsionar o seu negócio
        </h1>

        <p className="font-marko text-sm text-white max-w-xl mb-8">
          Uma plataforma feita para você vender mais, simplificar operações e
          encantar seus clientes.
        </p>

        <button className="font-marko bg-green-700 px-6 py-2 rounded-full text-white text-sm hover:bg-olive-800 transition cursor-pointer">
          CONHEÇA AGORA
        </button>
      </div>

      <section className="bg-[#0c0c0c] text-white py-30 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-marko">
          Por que vender com a gente?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
          <div className="card-flip perspective">
            <div className="card-inner relative w-full min-h-[150px] transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
              <div className="card-front absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <h3 className="font-bold text-xl font-marko text-white text-center text-green">
                  Gestão de pedidos fácil e rápida
                </h3>
              </div>
              <div className="card-back absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180 bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <p className="font-marko text-white text-center text-sm">
                  Controle e organize todos os pedidos em tempo real, sem
                  complicação.
                </p>
              </div>
            </div>
          </div>

          <div className="card-flip perspective">
            <div className="card-inner relative w-full min-h-[150px] transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
              <div className="card-front absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <h3 className="font-bold text-xl font-marko text-white text-center text-green">
                  Pagamentos seguros e rápidos
                </h3>
              </div>
              <div className="card-back absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180 bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <p className="font-marko text-white text-center text-sm">
                  Receba seus pagamentos de forma confiável e ágil, sem atrasos.
                </p>
              </div>
            </div>
          </div>

          <div className="card-flip perspective">
            <div className="card-inner relative w-full min-h-[150px] transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
              <div className="card-front absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <h3 className="font-bold text-xl font-marko text-white text-center text-green">
                  Mais visibilidade para o seu negócio
                </h3>
              </div>
              <div className="card-back absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180 bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <p className="font-marko text-white text-center text-sm">
                  Atraia novos clientes e destaque sua marca na nossa
                  plataforma.
                </p>
              </div>
            </div>
          </div>

          <div className="card-flip perspective">
            <div className="card-inner relative w-full min-h-[150px] transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
              <div className="card-front absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <h3 className="font-bold text-xl font-marko text-white text-center text-green">
                  Relatórios e insights de vendas
                </h3>
              </div>
              <div className="card-back absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180 bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <p className="font-marko text-white text-center text-sm">
                  Analise os dados do seu negócio e tome decisões mais
                  inteligentes.
                </p>
              </div>
            </div>
          </div>

          <div className="card-flip perspective">
            <div className="card-inner relative w-full min-h-[150px] transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
              <div className="card-front absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <h3 className="font-bold text-xl font-marko text-white text-center text-green">
                  Suporte dedicado
                </h3>
              </div>
              <div className="card-back absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180 bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <p className="font-marko text-white text-center text-sm">
                  Nossa equipe está sempre pronta para te ajudar quando
                  precisar.
                </p>
              </div>
            </div>
          </div>

          <div className="card-flip perspective">
            <div className="card-inner relative w-full min-h-[150px] transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
              <div className="card-front absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <h3 className="font-bold text-xl font-marko text-white text-center">
                  Apoio ao seu crescimento
                </h3>
              </div>
              <div className="card-back absolute w-full h-full flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180 bg-[#0f1f16] rounded-3xl border-double border-10 border-green-950">
                <p className="font-marko text-white text-center text-sm">
                  Estamos ao seu lado para te ajudar a expandir seu negócio com
                  sucesso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0c0c0c] text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-marko">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="hover:scale-105 transition-transform overflow-hidden">
            <div className="flex items-center justify-center w-70 h-70 mx-auto mt-6 mb-4 rounded-full shadow-xl overflow-hidden">
              <img
                src="/plataforma.png"
                alt="Cadastre seu negócio"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl text-green-500 mb-2 font-marko">
                Cadastre seu negócio
              </h3>
              <p className="text-sm text-gray-300">
                Crie seu perfil na plataforma e configure seu cardápio
                rapidamente.
              </p>
            </div>
          </div>

          <div className="hover:scale-105 transition-transform overflow-hidden">
            <div className="flex items-center justify-center w-70 h-70 mx-auto mt-6 mb-4 rounded-full shadow-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7989073/pexels-photo-7989073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Receba pedidos em tempo real"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl text-green-500 mb-2 font-marko">
                Receba pedidos em tempo real
              </h3>
              <p className="text-sm text-gray-300">
                Tenha controle total dos pedidos, notificações instantâneas e
                fácil gestão.
              </p>
            </div>
          </div>

          <div className="hover:scale-105 transition-transform overflow-hidden">
            <div className="flex items-center justify-center w-70 h-70 mx-auto mt-6 mb-4 rounded-full shadow-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7706584/pexels-photo-7706584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Entregue com nossa logística integrada"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl text-green-500 mb-2 font-marko">
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

      <section className="bg-[#0c0c0c] text-white py-30 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 py-10 font-marko">
          O que dizem nossos parceiros
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="João"
              className="w-30 h-30 rounded-full border-2 border-green-500 mb-4"
            />
            <div className="flex flex-col items-start w-full">
              <span className="text-6xl text-green-500 opacity-30 select-none -mb-4">
                “
              </span>
              <p className="text-lg md:text-xl text-white italic text-left mt-2">
                Desde que comecei a usar a plataforma, minhas vendas aumentaram
                40%.
              </p>
              <span className="mt-4 block text-green-300 font-semibold text-left">
                João,{" "}
                <span className="font-normal">Restaurante Sabor Caseiro</span>
              </span>
            </div>
          </div>

          <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Maria"
              className="w-30 h-30 rounded-full border-2 border-green-500 mb-4"
            />
            <div className="flex flex-col items-start w-full">
              <span className="text-6xl text-green-500 opacity-30 select-none -mb-4">
                “
              </span>
              <p className="text-lg md:text-xl text-white italic text-left mt-2">
                O sistema é simples, rápido e o suporte é excelente.
              </p>
              <span className="mt-4 block text-green-300 font-semibold text-left">
                Maria, <span className="font-normal">Mercado Bom Preço</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0c0c0c] text-white py-12 px-6">
        <h2 className="text-3xl font-bold font-marko text-center mb-8">
          Nossos números
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center py-10">
          <div>
            <span className="text-green-500 text-4xl font-bold">500+</span>
            <p className="mt-2 ">Restaurantes parceiros</p>
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

      <section className="bg-crescer relative text-white py-20 px-6 text-center">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-marko">
            Pronto para crescer com a gente?
          </h2>
          <p className="text-gray-100 mb-8 text-lg">
            Junte-se aos nossos parceiros e leve seu negócio para o próximo
            nível.
          </p>
          <button className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
            Seja um parceiro agora
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;

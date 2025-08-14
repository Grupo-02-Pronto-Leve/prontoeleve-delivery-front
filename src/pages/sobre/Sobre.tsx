import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import Navbar from "../../components/navbar/Navbar";
import LogoDasStacks from "../../components/sobre/logosdasstacks/LogoDasStacks";

function Sobre() {
    const frontendTechs = [
        { name: "React", img: "https://ik.imagekit.io/iyc9bztrf8/reactmenorLogo.png?updatedAt=1755102234323" },
        { name: "TypeScript", img: "https://ik.imagekit.io/iyc9bztrf8/Typescript_logo_2020.svg.png?updatedAt=1755104841563" },
        { name: "TailwindCSS", img: "https://ik.imagekit.io/iyc9bztrf8/tailwindcssLogo.png?updatedAt=1755102234546" },
        { name: "Axios", img: "https://ik.imagekit.io/iyc9bztrf8/axiosLogo.png?updatedAt=1755102234779" },
        { name: "React Router", img: "https://ik.imagekit.io/iyc9bztrf8/reactRouterLogo.png?updatedAt=1755102234645" },
        { name: "Vite", img: "https://ik.imagekit.io/iyc9bztrf8/viteLogo.png?updatedAt=1755102234607" },
    ];

    const backendTechs = [
        { name: "Node.js", img: "https://ik.imagekit.io/iyc9bztrf8/nodeLogo.png?updatedAt=1755102234550" },
        { name: "Nest.js", img: "https://ik.imagekit.io/iyc9bztrf8/nestLogo.png?updatedAt=1755102234576" },
        { name: "Passport", img: "https://ik.imagekit.io/iyc9bztrf8/passportLogo.png?updatedAt=1755102235954" },
        { name: "Jest", img: "https://ik.imagekit.io/iyc9bztrf8/jestLogo.png?updatedAt=1755102234434" },
        { name: "TypeORM", img: "https://ik.imagekit.io/iyc9bztrf8/typeormLogo.png?updatedAt=1755102234924" },
    ];

    const team = [
        { name: "Adrielli Bertoldo", img: "https://github.com/Adrielli-Bertoldo.png", linkedin: "https://www.linkedin.com/in/adrielli-bertoldo/", github: "https://github.com/Adrielli-Bertoldo" },
        { name: "Diego Cavalcanti", img: "https://ik.imagekit.io/iyc9bztrf8/diego.jpg?updatedAt=1755102273597", linkedin: "https://www.linkedin.com/in/diegoscavalcanti/", github: "https://github.com/diegocavalcanti-dev" },
        { name: "Miguel Ferreira", img: "https://github.com/devvMiguel.png", linkedin: "https://www.linkedin.com/in/ferreir4miguel/", github: "https://github.com/devvMiguel" },
        { name: "Natália Gadelha", img: "https://ik.imagekit.io/iyc9bztrf8/nataliag.jpeg?updatedAt=1755102273677", linkedin: "https://www.linkedin.com/in/natalia-gadelha/", github: "https://github.com/NataliaGadelha" },
        { name: "Natalia Taira", img: "https://ik.imagekit.io/iyc9bztrf8/nataliat.jpeg?updatedAt=1755102273747", linkedin: "https://www.linkedin.com/in/nataliataira/", github: "https://github.com/nataliataira" },
        { name: "Nathalia Carvalho", img: "https://ik.imagekit.io/iyc9bztrf8/nathaliac.png?updatedAt=1755102274054", linkedin: "https://www.linkedin.com/in/naah-carvalho/", github: "https://github.com/naahcarvalho" },
        { name: "Taís Escobar", img: "https://ik.imagekit.io/iyc9bztrf8/tais.jpg?updatedAt=1755102274340", linkedin: "https://www.linkedin.com/in/taismqescobar/", github: "https://github.com/taismichely" },
    ];

    const crudFeatures = [
        {
        title: "Cadastrar e editar categorias",
        description:
            "Adicione novas categorias e gerencie as existentes de forma simples e rápida.",
        icon: "",
        },
        {
        title: "Busca por restrição alimentar",
        description:
            "Facilite a vida do cliente filtrando produtos conforme alergias e preferências.",
        icon: "",
        },
        {
        title: "Gerenciamento de produtos",
        description:
            "Cadastre, edite e remova produtos de forma prática, com imagens e descrições.",
        icon: "",
        },
        {
        title: "Autenticação de Usuário",
        description:
            "Cadastro e Login de Usuário. Autenticação com Token.",
        icon: "",
        },
    ];

    return (
        <>
        <Navbar />
        <div className="min-h-screen w-full bg-black text-white font-marko">
            <section
            className="w-full text-white py-28 text-center bg-cover bg-center relative"
            style={{
                backgroundImage: "url('https://ik.imagekit.io/iyc9bztrf8/vecteezy_healthy-lifestyle-salad-with-chicken-and-veggies_50513834.png?updatedAt=1755115549588')",
            }}
            >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fadeIn">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7ED957] to-green-400 drop-shadow-lg">
                Sua fome, nossa missão!
                </h1>
                <p className="leading-relaxed text-lg sm:text-xl text-gray-200 drop-shadow-md">
                Aqui, você encontra pratos fresquinhos, preparados com ingredientes selecionados e aquele toque especial de sabor caseiro.
                </p>
                <p className="leading-relaxed pt-4 text-lg sm:text-xl text-gray-200 drop-shadow-md">
                Delivery ágil, comida quentinha e o sabor que você merece, direto na sua porta.
                </p>
            </div>
            </section>

            <div className="max-w-full  rounded-xl py-10 backdrop-blur-md shadow-xl">
                <h2 className="text-3xl font-bold text-center text-[#7ED957] mb-10">
                    Funcionalidades do Sistema
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
                    {crudFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#0f1f16]  rounded-xl p-6 text-center hover:scale-105 transition-transform w-full max-w-xs shadow-lg backdrop-blur-md"
                        >
                            <div className="text-4xl mb-4 text-green-400">{feature.icon}</div>
                            <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <section className="w-full py-20 bg-[#0f1f16]">
                <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center text-[#7ED957] mb-6">
                    Tecnologias Frontend
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
                    {frontendTechs.map((tech, index) => (
                    <div
                        key={index}
                        className="bg-black/95 backdrop-blur p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-[140px]"
                    >
                        <img src={tech.img} alt={tech.name} className="h-12 mb-2" />
                        <span className="text-white font-medium text-sm text-center">{tech.name}</span>
                    </div>
                    ))}
                </div>

                <h2 className="text-3xl font-bold text-center text-[#7ED957] mt-10 mb-6">
                    Tecnologias Backend
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                    {backendTechs.map((tech, index) => (
                    <div
                        key={index}
                        className="bg-black/95 backdrop-blur p-4 rounded-lg shadow-md flex flex-col items-center w-full max-w-[140px]"
                    >
                        <img src={tech.img} alt={tech.name} className="h-12 mb-2" />
                        <span className="text-white font-medium text-sm text-center">{tech.name}</span>
                    </div>
                    ))}
                </div>
                </div>
                </section>


            <section className="w-full py-20 bg-[#0f1f16]">
                <h2 className="text-3xl font-bold text-center text-[#7ED957] mb-12">
                    Equipe de Desenvolvedores:
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="relative w-56 h-72 rounded-lg overflow-hidden shadow-lg group"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p>Dev. Fullstack Jr.</p>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-xl bg-blue-600 rounded-full p-3 hover:bg-blue-700 transition-colors"
                                >
                                    <LinkedinLogoIcon size={24} weight="fill" />
                                </a>
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-xl bg-gray-800 rounded-full p-3 hover:bg-gray-900 transition-colors"
                                >
                                    <GithubLogoIcon size={24} weight="fill" />
                                </a>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 py-2 text-center">
                                <p className="text-gray-800 font-semibold">{member.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        </>
    );
}

export default Sobre;

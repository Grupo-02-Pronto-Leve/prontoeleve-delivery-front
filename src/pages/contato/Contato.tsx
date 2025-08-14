import React, { useState } from "react";
import salada from "../../assets/salada.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaEnvelopeOpenText, FaRegCommentDots, FaRegUser } from "react-icons/fa";

const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { nome: "", email: "", assunto: "", mensagem: "" };

    if (!formData.nome.trim()) {
      newErrors.nome = "Digite seu nome";
      valid = false;
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Digite um email válido";
      valid = false;
    }
    if (!formData.assunto.trim()) {
      newErrors.assunto = "Digite o assunto";
      valid = false;
    }
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = "Digite a mensagem";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full">
          
          {/* Imagem */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img 
              src={salada} 
              alt="Contato" 
              className="w-full max-w-xl rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105" 
            />
          </div>

          {/* Formulário */}
          <div className="w-full md:w-1/2">

            <form
              onSubmit={handleSubmit}
              className="bg-[#111111]/80 backdrop-blur-md shadow-lg rounded-xl py-8 px-10 w-full max-w-[500px] text-white"
            >
              <h1 className="text-3xl font-bold font-marko mb-6 text-center text-white">Entre em Contato</h1>

              <div>
                <label className="block font-semibold font-zain text-2xl text-white">Nome:</label>
                <div className="relative mb-4">
                <FaRegUser className="absolute top-3 left-3 font-zain text-xl text-gray-400" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
              </div>
              </div>

              <div>
                <label className="block font-semibold font-zain text-2xl text-white">E-mail:</label>
                <div className="relative mb-4">
                <MdOutlineAlternateEmail className="absolute font-zain text-xl top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite seu email"
                  className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              </div>

              <div>
                <label className="block font-semibold font-zain text-2xl text-white">Assunto:</label>
                <div className="relative mb-4">
                <FaEnvelopeOpenText className="absolute font-zain text-xl top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Digite o título da mensagem"
                  className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                />
                {errors.assunto && <span className="text-red-500 text-sm">{errors.assunto}</span>}
              </div>
              </div>

              <div>
                <label className="block font-semibold font-zain text-2xl text-white">Mensagem:</label>
                <div className="relative mb-4">
                <FaRegCommentDots className="absolute top-3 left-3 font-zain text-xl text-gray-400" />
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem"
                  className="pl-10 pr-4 py-2 w-full rounded bg-[#1a1a1a] border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
                />
                {errors.mensagem && <span className="text-red-500 text-sm">{errors.mensagem}</span>}
              </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-marko text-lg px-4 py-2 rounded hover:bg-green-700"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contato;

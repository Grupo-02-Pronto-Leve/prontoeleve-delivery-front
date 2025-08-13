import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import burgerImage from "../../assets/salada.png";

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
    let newErrors = { nome: "", email: "", assunto: "", mensagem: "" };

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
      {/* Navbar fixa */}
      {/* <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div> */}

      {/* Container principal com margem para afastar do botão verde */}
      <div className="min-h-screen flex items-center justify-center bg-black p-6 mt-20 md:mt-28">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full">
          
          {/* Imagem */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={burgerImage} alt="Contato" className="max-w-sm rounded-lg shadow-lg" />
          </div>

          {/* Formulário */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Entre em Contato</h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-neutral-900 shadow-lg p-6 rounded-lg"
            >
              <div>
                <label className="block font-semibold text-white">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="w-full border border-gray-700 rounded p-2 bg-neutral-800 text-white"
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
              </div>

              <div>
                <label className="block font-semibold text-white">E-mail:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite seu email"
                  className="w-full border border-gray-700 rounded p-2 bg-neutral-800 text-white"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div>
                <label className="block font-semibold text-white">Assunto:</label>
                <input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Digite o título da mensagem"
                  className="w-full border border-gray-700 rounded p-2 bg-neutral-800 text-white"
                />
                {errors.assunto && <span className="text-red-500 text-sm">{errors.assunto}</span>}
              </div>

              <div>
                <label className="block font-semibold text-white">Mensagem:</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem"
                  className="w-full border border-gray-700 rounded p-2 h-28 bg-neutral-800 text-white"
                />
                {errors.mensagem && <span className="text-red-500 text-sm">{errors.mensagem}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
